import { extraData, googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  console.log("body :>> ", body);
  const response = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "order!$A$10:$H",
  });
  const data = extraData(response.data.values);

  const filter = (items: any) => {
    return items.find((item: any) => {
      const filterId = body.id ? item.id === body.id : false;
      return filterId;
    });
  };

  return NextResponse.json(filter(data));
}
