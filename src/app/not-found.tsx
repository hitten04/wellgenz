"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let animId: number;
    let cleanupFn: (() => void) | undefined;

    const initScene = () => {
      if (!isMounted || !containerRef.current) return;
      const T = (window as any).THREE;
      if (!T) return;

      const container = containerRef.current;
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const cam = new T.PerspectiveCamera(38, 1, 0.1, 100);
      scene.add(new T.AmbientLight(0xffffff, 0.66));
      const dl = new T.DirectionalLight(0xffffff, 0.36);
      dl.position.set(-4, 8, 10);
      scene.add(dl);
      scene.add(new T.HemisphereLight(0xffffff, 0xd8c8ff, 0.08));

      /* helpers */
      const M = (c: number) => new T.MeshLambertMaterial({ color: c });
      function radial(r: number, g: number, b: number, a: number) {
        const s = 256;
        const c = document.createElement("canvas");
        c.width = c.height = s;
        const x = c.getContext("2d");
        if (x) {
          const gr = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
          gr.addColorStop(0, `rgba(${r},${g},${b},${a})`);
          gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          x.fillStyle = gr;
          x.fillRect(0, 0, s, s);
        }
        return new T.CanvasTexture(c);
      }
      function ball(r: number, mat: any, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1, par?: any) {
        const m = new T.Mesh(new T.SphereGeometry(r, 24, 16), mat);
        m.position.set(x, y, z);
        m.scale.set(sx, sy, sz);
        (par || scene).add(m);
        return m;
      }
      function limb(a: [number, number, number], b: [number, number, number], r: number, mat: any, par: any) {
        const A = new T.Vector3(...a);
        const B = new T.Vector3(...b);
        const d = B.clone().sub(A);
        const m = new T.Mesh(new T.CylinderGeometry(r, r, d.length(), 14), mat);
        m.position.copy(A).add(B).multiplyScalar(0.5);
        m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
        par.add(m);
        ball(r, mat, A.x, A.y, A.z, 1, 1, 1, par);
        ball(r, mat, B.x, B.y, B.z, 1, 1, 1, par);
      }

      /* 3D digits with the original gradient (violet → pink → peach) */
      const stops = [
        [0, 0x5636f2],
        [0.35, 0xa066f6],
        [0.65, 0xf58fb4],
        [1, 0xffbd8e],
      ].map(([p, col]) => [p, new T.Color(col as number)]);

      function grad(u: number) {
        u = Math.min(1, Math.max(0, u));
        for (let i = 1; i < 4; i++) {
          if (u <= (stops[i][0] as number)) {
            const a = stops[i - 1];
            const b = stops[i];
            return (a[1] as any).clone().lerp(b[1] as any, (u - (a[0] as number)) / ((b[0] as number) - (a[0] as number)));
          }
        }
        return (stops[3][1] as any).clone();
      }

      const dmat = new T.MeshLambertMaterial({ vertexColors: true });
      function digit(shape: any, lo: number, hi: number) {
        const g = new T.ExtrudeGeometry(shape, {
          depth: 0.8,
          bevelEnabled: true,
          bevelThickness: 0.2,
          bevelSize: 0.16,
          bevelSegments: 6,
          curveSegments: 64,
        });
        g.computeBoundingBox();
        const b = g.boundingBox!;
        const p = g.attributes.position;
        const c: number[] = [];
        for (let i = 0; i < p.count; i++) {
          const d = ((p.getX(i) - b.min.x) / (b.max.x - b.min.x) + 1 - (p.getY(i) - b.min.y) / (b.max.y - b.min.y)) / 2;
          const k = grad(lo + (hi - lo) * d);
          c.push(k.r, k.g, k.b);
        }
        g.setAttribute("color", new T.Float32BufferAttribute(c, 3));
        g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.4);
        return new T.Mesh(g, dmat);
      }

      function four() {
        const s = new T.Shape();
        [
          [1.95, 4],
          [2.75, 4],
          [2.75, 1.75],
          [3.3, 1.75],
          [3.3, 1],
          [2.75, 1],
          [2.75, 0],
          [1.95, 0],
          [1.95, 1],
          [0, 1],
          [0, 1.75],
        ].forEach((p, i) => (i ? s.lineTo(p[0], p[1]) : s.moveTo(p[0], p[1])));
        const h = new T.Path();
        h.moveTo(0.87, 1.75);
        h.lineTo(1.95, 1.75);
        h.lineTo(1.95, 3);
        s.holes.push(h);
        return s;
      }

      function zero() {
        const s = new T.Shape();
        s.absellipse(0, 0, 2, 2.15, 0, Math.PI * 2, false);
        const h = new T.Path();
        h.absellipse(0, 0, 1.15, 1.35, 0, Math.PI * 2, true);
        s.holes.push(h);
        return s;
      }

      const digits = [
        { m: digit(four(), 0, 0.8), x: -3.95, y: 2, ph: 0, dl: 0.1 },
        { m: digit(zero(), 0.05, 1), x: 0, y: 2.15, ph: 1.7, dl: 0.3 },
        { m: digit(four(), 0.25, 1), x: 3.95, y: 2, ph: 3.2, dl: 0.5 },
      ];
      digits.forEach((d) => {
        d.m.position.set(d.x, d.y, 0);
        scene.add(d.m);
      });

      /* landscape */
      ball(10, M(0xe0d4fb), 0, -2.1, 0, 2.2, 0.22, 0.5);
      ball(4, M(0xbca8f7), -7, -0.9, -0.5, 1.8, 0.35, 0.8);
      ball(4, M(0xc9b8fa), 7, -0.9, -0.5, 1.8, 0.35, 0.8);
      ball(1, M(0xc2adf8), -0.6, 0.6, -1.2, 2.6, 0.9, 0.5);
      ball(1, M(0xf5a9c6), 1.1, 0.6, -1.5, 2.2, 0.8, 0.5);
      const sun = new T.Mesh(new T.SphereGeometry(0.62, 48, 32), new T.MeshBasicMaterial({ color: 0xffb48c }));
      sun.position.set(0, 2.3, -2);
      scene.add(sun);
      const glow = new T.Sprite(
        new T.SpriteMaterial({ map: radial(255, 205, 165, 0.9), transparent: true, depthWrite: false })
      );
      glow.position.set(0, 2.3, -1.9);
      glow.scale.set(4.6, 4.6, 1);
      scene.add(glow);
      const shadow = new T.Mesh(
        new T.PlaneGeometry(2.4, 1.3),
        new T.MeshBasicMaterial({ map: radial(90, 60, 160, 0.4), transparent: true, depthWrite: false })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0.1, 0.07, 1.3);
      scene.add(shadow);

      /* the person */
      const P = new T.Group(),
        TR = new T.Group(),
        HD = new T.Group();
      P.add(TR, HD);
      const hood = M(0xe9e2ff),
        pant = M(0x241c4a),
        skin = M(0xf0b89c),
        hair = M(0x1d1745),
        shoe = M(0xffffff);
      ball(0.5, hood, 0, 0.78, -0.08, 0.85, 1, 0.72, TR);
      ball(0.3, hood, 0, 1.12, -0.28, 1.2, 0.7, 0.8, TR);
      HD.position.set(0, 1.38, 0.02);
      HD.rotation.x = -0.2;
      ball(0.25, skin, 0, 0, 0.04, 1, 1, 1, HD);
      ball(0.27, hair, 0, 0.05, -0.05, 1, 0.95, 1, HD);
      ball(0.04, skin, 0, -0.02, 0.28, 1, 1, 1, HD);
      [-1, 1].forEach((s) => {
        limb([s * 0.17, 0.3, 0], [s * 0.2, 0.78, 0.62], 0.16, pant, P);
        limb([s * 0.2, 0.78, 0.62], [s * 0.2, 0.16, 0.92], 0.13, pant, P);
        ball(0.14, shoe, s * 0.2, 0.1, 1, 1, 0.7, 1.5, P);
        limb([s * 0.42, 1.02, 0], [s * 0.5, 0.72, 0.32], 0.1, hood, P);
        limb([s * 0.5, 0.72, 0.32], [s * 0.12, 1, 0.66], 0.09, hood, P);
        ball(0.085, skin, s * 0.12, 1.01, 0.7, 1, 1, 1, P);
      });
      P.position.set(0.1, 0.02, 1.3);
      P.rotation.y = -Math.PI / 2 - 0.45;
      scene.add(P);

      /* clouds */
      const clouds = [
        [-1.2, 5.6, -2.5, 1.1],
        [-6.6, 3.9, -2.5, 0.8],
        [6.6, 3.6, -2.5, 0.9],
      ].map((c) => {
        const g = new T.Group(),
          m = new T.MeshLambertMaterial({ color: 0xeadcff, emissive: 0x1a1030 });
        [
          [0, 0, 0.9],
          [0.8, -0.1, 0.7],
          [-0.8, -0.15, 0.65],
          [0.3, 0.35, 0.6],
        ].forEach((s) => ball(s[2], m, s[0], s[1], 0, 1, 0.75, 0.8, g));
        g.position.set(c[0], c[1], c[2]);
        g.scale.setScalar(c[3]);
        (g as any).bx = c[0];
        scene.add(g);
        return g;
      });

      /* birds */
      function bird() {
        const g = new T.Group(),
          mat = new T.MeshBasicMaterial({ color: 0x4b2fd6, side: T.DoubleSide });
        const mk = (s: number) => {
          const geo = new T.BufferGeometry();
          geo.setAttribute(
            "position",
            new T.Float32BufferAttribute([0, 0, 0, s * 0.5, 0.14, 0, s * 0.18, -0.05, 0], 3)
          );
          const pv = new T.Group();
          pv.add(new T.Mesh(geo, mat));
          g.add(pv);
          return pv;
        };
        (g as any).L = mk(-1);
        (g as any).R = mk(1);
        g.scale.setScalar(0.8);
        scene.add(g);
        return g;
      }
      const birds = [
        [3.4, 5.5, 0],
        [2.5, 4.9, 1.4],
        [4.4, 6, 2.6],
      ].map((p) => {
        const b: any = bird();
        b.bx = p[0];
        b.by = p[1];
        b.ph = p[2];
        return b;
      });

      /* leaves */
      function plant(x: number, d: number) {
        const g = new T.Group();
        g.position.set(x, 0.15, 0.4);
        (g as any).L = [];
        [0xa88df5, 0x8e6cf0, 0xc4b0fb, 0x9a7bf2, 0xb79ffa].forEach((c, i) => {
          const l: any = new T.Group(),
            m = new T.Mesh(new T.SphereGeometry(0.5, 16, 12), M(c));
          m.scale.set(0.26, 1, 0.08);
          m.position.y = 0.5;
          l.add(m);
          l.base = (i - 2) * 0.3 * d;
          l.rotation.y = (i - 2) * 0.4;
          l.rotation.z = l.base;
          l.scale.setScalar(0.9 + (i % 3) * 0.35);
          g.add(l);
          (g as any).L.push(l);
        });
        scene.add(g);
        return g;
      }
      const plants = [plant(-5.9, -1), plant(5.9, 1)];

      /* sparkles */
      const N = 70,
        pp = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pp[i * 3] = (Math.random() - 0.5) * 14;
        pp[i * 3 + 1] = Math.random() * 6;
        pp[i * 3 + 2] = Math.random() * 4 - 1;
      }
      const pg = new T.BufferGeometry();
      pg.setAttribute("position", new T.BufferAttribute(pp, 3));
      scene.add(
        new T.Points(
          pg,
          new T.PointsMaterial({ color: 0xffc4d8, size: 0.09, transparent: true, opacity: 0.8, depthWrite: false })
        )
      );

      /* framing - responsive for mobile & desktop */
      let look = 1.6,
        baseY = 2.2;
      function resize() {
        const w = window.innerWidth,
          h = window.innerHeight;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        const f = Math.tan((cam.fov * Math.PI) / 360);

        const isMobile = w < 768 || cam.aspect < 0.8;
        if (!isMobile) {
          // Desktop: exact original logic unchanged
          const dist = Math.max(15, 13.5 / cam.aspect / (2 * f));
          const H = 2 * dist * f;
          look = 0.16 * H;
          baseY = look + 0.6;
          cam.position.set(0, baseY, dist);
        } else {
          // Mobile only: artwork positioned in upper-middle so text never overlaps hill/character
          const targetWidth = 11.2;
          const dist = targetWidth / cam.aspect / (2 * f);
          const H = 2 * dist * f;
          look = 1.8 - 0.06 * H;
          baseY = look + 0.6;
          cam.position.set(0, baseY, dist);
        }
        cam.updateProjectionMatrix();
      }
      window.addEventListener("resize", resize);
      resize();

      let mx = 0,
        my = 0;
      const updatePointer = (clientX: number, clientY: number) => {
        mx = (clientX / window.innerWidth) * 2 - 1;
        my = (clientY / window.innerHeight) * 2 - 1;
      };

      const onPointerMove = (e: PointerEvent) => {
        updatePointer(e.clientX, e.clientY);
      };

      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });

      /* animation */
      const clock = new T.Clock();
      const ease = (te: number, d: number) => {
        const k = Math.min(1, Math.max(0, (te - d) / 1.5));
        return 1 - Math.pow(1 - k, 3);
      };

      function frame() {
        const te = rm ? 99 : clock.getElapsedTime(),
          t = rm ? 0 : te;
        digits.forEach((d) => {
          const e = ease(te, d.dl);
          d.m.position.y = d.y - (1 - e) * 2.4 + Math.sin(t * 0.9 + d.ph) * 0.08;
          d.m.scale.setScalar(0.7 + 0.3 * e);
          d.m.rotation.y = Math.sin(t * 0.6 + d.ph) * 0.14 + mx * 0.12;
          d.m.rotation.x = my * 0.04;
        });
        const pe = Math.max(0.001, ease(te, 0.9));
        P.scale.setScalar(pe);
        shadow.scale.setScalar(pe);
        TR.scale.y = 1 + Math.sin(t * 1.6) * 0.015;
        HD.rotation.y = Math.sin(t * 0.5) * 0.25;
        HD.rotation.x = -0.2 + Math.sin(t * 0.7) * 0.04;
        const s = 1 + Math.sin(t * 1.1) * 0.03;
        sun.scale.setScalar(s);
        glow.scale.set(4.6 * s, 4.6 * s, 1);
        clouds.forEach((c: any, i) => {
          c.position.x = c.bx + Math.sin(t * 0.12 + i * 2) * 0.7;
          c.position.y += Math.sin(t * 0.4 + i) * 0.0008;
        });
        birds.forEach((b: any) => {
          const f = Math.sin(t * 7 + b.ph * 2) * 0.45 + 0.1;
          b.R.rotation.z = f;
          b.L.rotation.z = -f;
          b.position.set(b.bx + Math.sin(t * 0.3 + b.ph) * 0.9, b.by + Math.sin(t * 0.55 + b.ph) * 0.3, 0);
          b.rotation.z = Math.cos(t * 0.3 + b.ph) * 0.08;
        });
        plants.forEach((g: any) =>
          g.L.forEach((l: any, i: number) => {
            l.rotation.z = l.base + Math.sin(t * 1.2 + i) * 0.06;
          })
        );
        for (let i = 0; i < N; i++) {
          pp[i * 3 + 1] += 0.004 + (i % 5) * 0.0007;
          pp[i * 3] += Math.sin(t + i) * 0.002;
          if (pp[i * 3 + 1] > 6.5) pp[i * 3 + 1] = 0;
        }
        pg.attributes.position.needsUpdate = true;
        cam.position.x += (mx * 1.2 - cam.position.x) * 0.04;
        cam.position.y += (baseY - my * 0.4 - cam.position.y) * 0.04;
        cam.lookAt(0, look, 0);
        renderer.render(scene, cam);
        animId = requestAnimationFrame(frame);
      }
      frame();

      cleanupFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("touchmove", onTouchMove);
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    };

    if ((window as any).THREE) {
      initScene();
    } else {
      const existingScript = document.querySelector('script[src*="three.js"]') as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (isMounted) initScene();
        });
        if ((window as any).THREE) {
          initScene();
        }
      } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        script.onload = () => {
          if (isMounted) initScene();
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <main id="main" className="not-found-page">
      <div ref={containerRef} className="not-found-canvas-container" aria-hidden="true" />
      <div className="not-found-copy">
        <h1>Page Not Found</h1>
        <p>
          Looks like this page took a different path.
          <br />
          Let’s get you back on track.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="not-found-btn not-found-btn-primary">
            <Home size={15} aria-hidden="true" /> Back to home <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
