import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
export async function GET(request) {
    const response = NextResponse;
     
    const regions=  await query({ query:"SELECT * From Countries", values: [] });
    return response.json({"stauts":"Success","data":regions})
}
