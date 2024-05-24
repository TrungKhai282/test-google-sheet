import { extraData, googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const response = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "product!$A$10:$S",
  });
  const items = extraData(response.data.values);

  const filter = (items: any) => {
    return items.find((item: any) => {
      const filterId = body.id ? parseInt(item.id) === body.id : true;
      const filterSlug = body.slug ? item.slug === body.slug : true;
      return filterId && filterSlug;
    });
  };

  return NextResponse.json({
    data: filter(items),
  });
}
