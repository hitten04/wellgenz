import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "Wellgenz — A clearer way to hire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#f7f6f2", color: "#201c29", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>wellgenz<span style={{ color: "#7953b4" }}>.</span></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -5 }}>People, not paperwork.</div><div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -5, color: "#7953b4" }}>A clearer way to hire.</div></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 23 }}><span>AI-powered recruitment. Human-led decisions.</span><span>wellgenz.com ↗</span></div></div>, size);
}
