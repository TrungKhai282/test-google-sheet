import { googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const response = await googleSheet.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "post!A1:C1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[body.title, body.sub_description, body.main_description]],
    },
  });
  return NextResponse.json({
    data: response.data,
  });
}
