import { ImageResponse } from "next/og";

export const contentType = "image/png";

export const alt = "Country Club";

export const size = {
  width: 1200,
  height: 630,
};

const loadGoogleFont = async (font: string, text: string, italic = false) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}${italic ? ":ital,wght@1,400" : ""}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);

    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
};

const Image = async () => {
  const text = "COUNTRY CLUB AT DRU HILL";

  const Libre_Baskerville = await loadGoogleFont(
    "Libre+Baskerville",
    text,
    true,
  );

  return new ImageResponse(
    <div style={{ textAlign: "center", alignItems: "center", fontSize: 128 }}>
      COUNTRY CLUB AT DRU HILL
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Libre_Baskerville",
          data: Libre_Baskerville,
          style: "italic",
        },
      ],
    },
  );
};

export default Image;
