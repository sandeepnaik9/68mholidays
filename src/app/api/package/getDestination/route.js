
import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";


export async function POST(req) {}

export async function GET(request){
    const res = await request.nextUrl.searchParams.get("country");

    const result = await query({query:`SELECT destination_name AS name FROM Destinations WHERE countryName="${res}"`,values:[]})
    console.log(result)

    return NextResponse.json({"Status":"Success","data":result})
}

export const dynamic = "force-static";