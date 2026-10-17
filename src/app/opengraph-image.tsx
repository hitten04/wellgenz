import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Wellgenz — A clearer way to hire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const logoData = readFileSync(join(process.cwd(), "public", "wellgenz-logo-transparent.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f6f2",
          fontFamily: "sans-serif",
          padding: "48px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Wellgenz"
          width="540"
          height="274"
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: "#201c29",
            marginTop: 28,
            letterSpacing: -1,
          }}
        >
          A clearer way to hire.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#5c566a",
            marginTop: 10,
          }}
        >
          AI-powered recruitment. Human-led decisions.
        </div>
      </div>
    ),
    size
  );
}
