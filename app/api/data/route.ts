import { NextResponse } from "next/server";

export const GET = async () => {
  const data = await fetch(process.env.DATA_URL as string, {
    cache: "no-store",
  })
    .then(async (response) => await response.json())
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });

  return NextResponse.json(data);
};
