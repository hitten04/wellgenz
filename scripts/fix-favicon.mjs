import fs from "node:fs";
import zlib from "node:zlib";

function makeCrcTable() {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function convertPngRgbToRgba(pngBuf) {
  let offset = 8;
  let ihdr = null;
  const idatParts = [];
  
  while (offset < pngBuf.length) {
    const len = pngBuf.readUInt32BE(offset);
    const type = pngBuf.slice(offset + 4, offset + 8).toString("ascii");
    const data = pngBuf.slice(offset + 8, offset + 8 + len);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
      };
    } else if (type === "IDAT") {
      idatParts.push(data);
    }
    offset += 8 + len + 4;
  }

  if (!ihdr) throw new Error("Missing IHDR chunk in PNG");
  if (ihdr.colorType === 6) {
    // Already RGBA
    return pngBuf;
  }
  if (ihdr.colorType !== 2) {
    console.log(`Unsupported PNG colorType ${ihdr.colorType}, leaving frame as-is.`);
    return pngBuf;
  }

  const { width, height } = ihdr;
  const inflated = zlib.inflateSync(Buffer.concat(idatParts));
  const stride = 1 + width * 3;
  const rawRgb = Buffer.alloc(width * height * 3);
  let prevRow = Buffer.alloc(width * 3);

  for (let y = 0; y < height; y++) {
    const filter = inflated[y * stride];
    const currentRow = Buffer.alloc(width * 3);
    for (let x = 0; x < width * 3; x++) {
      const byte = inflated[y * stride + 1 + x];
      const a = x >= 3 ? currentRow[x - 3] : 0;
      const b = prevRow[x];
      const c = x >= 3 ? prevRow[x - 3] : 0;
      let val = 0;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + a) & 0xff;
      else if (filter === 2) val = (byte + b) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) val = (byte + paethPredictor(a, b, c)) & 0xff;
      currentRow[x] = val;
      rawRgb[y * width * 3 + x] = val;
    }
    prevRow = currentRow;
  }

  const rgbaStride = 1 + width * 4;
  const uncompressed = Buffer.alloc(height * rgbaStride);
  for (let y = 0; y < height; y++) {
    uncompressed[y * rgbaStride] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const rgbIdx = (y * width + x) * 3;
      const rgbaIdx = y * rgbaStride + 1 + x * 4;
      uncompressed[rgbaIdx] = rawRgb[rgbIdx];
      uncompressed[rgbaIdx + 1] = rawRgb[rgbIdx + 1];
      uncompressed[rgbaIdx + 2] = rawRgb[rgbIdx + 2];
      uncompressed[rgbaIdx + 3] = 255; // 100% alpha
    }
  }

  const newIdatData = zlib.deflateSync(uncompressed);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  function makeChunk(typeStr, data) {
    const typeBuf = Buffer.from(typeStr, "ascii");
    const len = data.length;
    const chunk = Buffer.alloc(4 + 4 + len + 4);
    chunk.writeUInt32BE(len, 0);
    typeBuf.copy(chunk, 4);
    data.copy(chunk, 8);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    chunk.writeUInt32BE(crc, 8 + len);
    return chunk;
  }

  const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    pngSig,
    makeChunk("IHDR", ihdrData),
    makeChunk("IDAT", newIdatData),
    makeChunk("IEND", Buffer.alloc(0)),
  ]);
}

export function fixIco(icoPath) {
  const buf = fs.readFileSync(icoPath);
  const count = buf.readUInt16LE(4);
  console.log(`Processing ${icoPath}: ${count} icons found.`);

  const images = [];
  for (let i = 0; i < count; i++) {
    const entryOffset = 6 + i * 16;
    const w = buf[entryOffset];
    const h = buf[entryOffset + 1];
    const colors = buf[entryOffset + 2];
    const reserved = buf[entryOffset + 3];
    const planes = buf.readUInt16LE(entryOffset + 4);
    const bpp = buf.readUInt16LE(entryOffset + 6);
    const size = buf.readUInt32LE(entryOffset + 8);
    const dataOffset = buf.readUInt32LE(entryOffset + 12);

    let rawData = buf.slice(dataOffset, dataOffset + size);
    const isPng = rawData.slice(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

    if (isPng) {
      console.log(`Icon #${i} (${w || 256}x${h || 256}): PNG format, converting to RGBA if needed...`);
      rawData = convertPngRgbToRgba(rawData);
    } else {
      console.log(`Icon #${i} (${w || 256}x${h || 256}): BMP format, keeping original.`);
    }

    images.push({
      w,
      h,
      colors,
      reserved,
      planes: isPng ? 1 : planes,
      bpp: isPng ? 32 : bpp,
      data: rawData,
    });
  }

  // Reassemble ICO
  const headerSize = 6 + images.length * 16;
  let currentOffset = headerSize;
  const entriesBuf = Buffer.alloc(images.length * 16);

  images.forEach((img, idx) => {
    const o = idx * 16;
    entriesBuf[o] = img.w;
    entriesBuf[o + 1] = img.h;
    entriesBuf[o + 2] = img.colors;
    entriesBuf[o + 3] = img.reserved;
    entriesBuf.writeUInt16LE(img.planes, o + 4);
    entriesBuf.writeUInt16LE(img.bpp, o + 6);
    entriesBuf.writeUInt32LE(img.data.length, o + 8);
    entriesBuf.writeUInt32LE(currentOffset, o + 12);
    currentOffset += img.data.length;
  });

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const finalBuf = Buffer.concat([
    header,
    entriesBuf,
    ...images.map(img => img.data),
  ]);

  fs.writeFileSync(icoPath, finalBuf);
  console.log(`Successfully rewrote ${icoPath} (${finalBuf.length} bytes) with 32-bit RGBA PNG frames!`);
}

fixIco("src/app/favicon.ico");
