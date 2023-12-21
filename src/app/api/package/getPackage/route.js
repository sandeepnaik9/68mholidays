import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request){
    const res = await request.nextUrl.searchParams.get("code");

    const result = await query({query:`SELECT * FROM Packages WHERE package_id="packageId-${res}"`,values:[]})
    // const itinearyResult = await query({query:`SELECT * FROM itinerary WHERE package_id="packageId-${res}"`,values:[]})
    console.log(result)

    return NextResponse.json({"Status":"Success","data":result})
}