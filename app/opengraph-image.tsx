import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/types/site";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpengraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fafaf8",
          color: "#111111",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#707070", letterSpacing: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#a98ede" }}/>
          FULL STACK DEVELOPER
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -4 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 40, lineHeight: 1.25, color: "#707070", maxWidth: 900 }}>
            Weby, rezervační systémy a mobilní appky v Next.js, React Native a Supabase.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>bobcermak.cz</div>
      </div>
    ),
    size,
  );
export default OpengraphImage;