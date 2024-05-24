import { extraData, googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";
export async function GET() {
  const response = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "propose!$A$10:$C",
  });
  const items = extraData(response.data.values);

  return NextResponse.json({
    items,
  });
}
