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
    return items.filter((item: any) => {
      const filterCategoryId = body.category_id
        ? parseInt(item.category_id) === body.category_id
        : true;
      const filterCategorySlug = body.category_slug
        ? item.category_slug === body.category_slug
        : true;
      const filterProposeSlug = body.propose_slug
        ? item.propose_slug === body.propose_slug
        : true;
      const filterSlug = body.slug ? parseInt(item.slug) === body.slug : true;

      return (
        filterCategoryId &&
        filterSlug &&
        filterCategorySlug &&
        filterProposeSlug
      );
    });
  };

  return NextResponse.json({
    items: filter(items),
  });
}
