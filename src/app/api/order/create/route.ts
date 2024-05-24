import { googleSheet } from "@/common/helper/googleApis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await googleSheet.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "order!A10:H10",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            Math.floor(Math.random() * Date.now()).toString(16),
            body.client_name,
            body.client_phone,
            body.client_address,
            body.cart,
            body.total_price_product,
            body.shipping_price,
            body.total_all,
          ],
        ],
      },
    });
    return NextResponse.json({
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
