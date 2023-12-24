import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request){
    
    // const itinearyResult = await query({query:`SELECT * FROM itinerary WHERE package_id="packageId-${res}"`,values:[]})


    return NextResponse.json({"Status":"Success","data":result})
}