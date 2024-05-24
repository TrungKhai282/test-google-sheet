import { extraData, googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const response = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "category!$A$10:$J",
  });
  const items = extraData(response.data.values);

  const filter = (items: any) => {
    return items.filter((item: any) => {
      const filterLevel = body.level
        ? parseInt(item.level) === body.level
        : true;
      const filterParent = body.parent_id
        ? parseInt(item.parent_id) === body.parent_id
        : true;
      const filterFeature = body.feature ? item.feature === body.feature : true;
      return filterLevel && filterParent && filterFeature;
    });
  };

  return NextResponse.json({
    items: filter(items),
  });
}
