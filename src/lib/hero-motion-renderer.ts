/** Transparent keyframe interpolation. Image colors pass through unchanged. */
export type HeroMotionRenderer = { start: () => void; stop: () => void; dispose: () => void };
const POSE_COUNT = 10;
const FLOW_WIDTH = 640;
const FLOW_HEIGHT = 213;
const SEGMENT_MS = 900;
const sequence = [0, 1, 7, 2, 3, 4, 8, 1, 9, 6];

const vertexSource = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = vec2((position.x + 1.0) * 0.5, (1.0 - position.y) * 0.5);
  gl_Position = vec4(position, 0.0, 1.0);
}`;
const fragmentSource = `
precision highp float;
varying vec2 uv;
uniform sampler2D poseA;
uniform sampler2D poseB;
uniform sampler2D movement;
uniform float progress;
uniform float phase;
uniform sampler2D original;
vec4 samplePose(sampler2D image, vec2 at) {
  if (at.x < 0.0 || at.x > 1.0 || at.y < 0.0 || at.y > 1.0) return vec4(0.0);
  return texture2D(image, at);
}
float ellipse(vec2 p, vec2 center, vec2 radius) {
  float distance = length((p - center) / radius);
  return 1.0 - smoothstep(0.86, 1.0, distance);
}
float peopleMask(vec2 p) {
  float leftHead = ellipse(p, vec2(0.220, 0.320), vec2(0.070, 0.180));
  float centerHead = ellipse(p, vec2(0.445, 0.160), vec2(0.055, 0.170));
  float womanHead = ellipse(p, vec2(0.620, 0.280), vec2(0.075, 0.220));
  float rightHead = ellipse(p, vec2(0.777, 0.340), vec2(0.060, 0.160));
  float xBand = smoothstep(0.350, 0.360, p.x) * (1.0 - smoothstep(0.480, 0.490, p.x));
  float tableLimit = 0.555 + (p.x - 0.350) * 0.50;
  float arm = xBand * smoothstep(0.260, 0.280, p.y) * (1.0 - smoothstep(tableLimit - 0.018, tableLimit, p.y));
  float folder = step(0.565, p.x) * step(p.x, 0.650) * step(0.380, p.y);
  womanHead *= 1.0 - folder;
  float mask = max(max(leftHead, centerHead), max(max(womanHead, rightHead), arm));
  float laptop = step(0.460, p.x) * step(0.530, p.y);
  return mask * (1.0 - laptop);
}
vec2 hairOffset(vec2 p) {
  float bun = ellipse(p, vec2(0.207, 0.252), vec2(0.035, 0.085));
  float centerHair = ellipse(p, vec2(0.444, 0.090), vec2(0.045, 0.085));
  centerHair *= 1.0 - smoothstep(0.100, 0.170, p.y);
  float longHair = ellipse(p, vec2(0.622, 0.277), vec2(0.067, 0.215));
  float face = ellipse(p, vec2(0.614, 0.245), vec2(0.030, 0.095));
  longHair *= (1.0 - face) * smoothstep(0.100, 0.430, p.y);
  float rightHair = ellipse(p, vec2(0.775, 0.285), vec2(0.050, 0.090));
  rightHair *= 1.0 - smoothstep(0.300, 0.360, p.y);
  float displacement = bun * sin(phase * 2.0 + 0.8) * 1.2
    + centerHair * sin(phase * 3.0 + 1.4) * 1.0
    + longHair * (sin(phase * 2.0 + p.y * 7.0) * 5.0 + sin(phase * 3.0 + 0.5) * 1.0)
    + rightHair * sin(phase * 2.0 + 2.6) * 0.9;
  return vec2(displacement / 2048.0, longHair * sin(phase * 2.0 + 1.1) * 0.55 / 682.0);
}
void main() {
  float mask = peopleMask(uv);
  vec4 base = samplePose(original, uv);
  // Furniture and all pixels outside these localized people masks are original.
  if (mask <= 0.0) { gl_FragColor = base; return; }
  vec2 movingUV = uv - hairOffset(uv);
  vec4 raw = texture2D(movement, movingUV);
  vec4 flow = (raw * 255.0 - 128.0) * 0.5;
  vec2 forward = flow.xy / vec2(640.0, 213.0);
  vec2 backward = flow.zw / vec2(640.0, 213.0);
  float t = progress * progress * (3.0 - 2.0 * progress);
  vec4 a = samplePose(poseA, movingUV - t * forward);
  vec4 b = samplePose(poseB, movingUV - (1.0 - t) * backward);
  // Textures and output use premultiplied alpha to prevent dark matte fringes.
  // Where surfaces become occluded, select one pose rather than drawing two arms.
  vec4 delta = abs(a - b);
  float difference = max(max(delta.r, delta.g), max(delta.b, delta.a));
  float blend = difference > 0.08 ? step(0.5, t) : t;
  gl_FragColor = mix(base, mix(a, b, blend), mask);
}`;

export async function createHeroMotionRenderer(canvas: HTMLCanvasElement): Promise<HeroMotionRenderer> {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) throw new Error("WebGL unavailable");
  const shaders: WebGLShader[] = [];
  const textures: WebGLTexture[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!program || !buffer) throw new Error("Cannot initialize hero renderer");
  let request = 0;
  let running = false;
  let elapsed = 0;
  let lastTime = 0;
  let disposed = false;
  const cleanup = () => {
    disposed = true;
    running = false;
    cancelAnimationFrame(request);
    textures.forEach((texture) => gl.deleteTexture(texture));
    shaders.forEach((shader) => gl.deleteShader(shader));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };
  try {
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Cannot initialize hero shader");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Hero shader unavailable");
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Hero shader linking failed");
    const [images, motionData] = await Promise.all([
      Promise.all(Array.from({ length: POSE_COUNT }, async (_, index) => {
        const image = new window.Image();
        image.src = `/images/hero-motion-v2/pose-${index}.webp`;
        await image.decode();
        return image;
      })),
      Promise.all(sequence.map(async (_, index) => {
        const response = await fetch(`/images/hero-motion-v2/flow-${index}.bin`);
        if (!response.ok) throw new Error("Hero motion data unavailable");
        const data = new Uint8Array(await response.arrayBuffer());
        if (data.length !== FLOW_WIDTH * FLOW_HEIGHT * 4) throw new Error("Invalid hero motion data");
        return data;
      })),
    ]);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const attribute = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    function newTexture() {
      const texture = gl!.createTexture();
      if (!texture) throw new Error("Hero texture unavailable");
      textures.push(texture);
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      return texture;
    }
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    if (images.some((image) => image.width > maxTextureSize || image.height > maxTextureSize)) throw new Error("Hero textures exceed device limits");
    const poses = images.map((image) => {
      const texture = newTexture();
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      return texture;
    });
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    const flows = motionData.map((flow) => {
      const texture = newTexture();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, FLOW_WIDTH, FLOW_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, flow);
      return texture;
    });
    if (gl.getError() !== gl.NO_ERROR) throw new Error("Hero texture upload failed");
    gl.uniform1i(gl.getUniformLocation(program, "poseA"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "poseB"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "movement"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "original"), 3);
    const progressUniform = gl.getUniformLocation(program, "progress");
    const phaseUniform = gl.getUniformLocation(program, "phase");
    function draw() {
      if (disposed || gl!.isContextLost()) return;
      const width = Math.max(1, Math.min(2048, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2))));
      const height = Math.round(width * 682 / 2048);
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl!.viewport(0, 0, width, height);
      const index = Math.floor(elapsed / SEGMENT_MS) % sequence.length;
      [poses[sequence[index]], poses[sequence[(index + 1) % sequence.length]], flows[index], poses[0]].forEach((texture, unit) => {
        gl!.activeTexture(gl!.TEXTURE0 + unit);
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
      });
      gl!.uniform1f(progressUniform, (elapsed % SEGMENT_MS) / SEGMENT_MS);
      gl!.uniform1f(phaseUniform, elapsed / (sequence.length * SEGMENT_MS) * Math.PI * 2);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    const tick = (time: number) => {
      if (!running || disposed) return;
      if (lastTime) elapsed = (elapsed + Math.min(time - lastTime, 100)) % (sequence.length * SEGMENT_MS);
      lastTime = time;
      draw();
      request = requestAnimationFrame(tick);
    };
    draw();
    return {
      start() { if (running || disposed) return; running = true; lastTime = 0; request = requestAnimationFrame(tick); },
      stop() { running = false; lastTime = 0; cancelAnimationFrame(request); },
      dispose: cleanup,
    };
  } catch (error) { cleanup(); throw error; }
}
