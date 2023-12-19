import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    const data = await request.json();
    
    console.log(data,"DATA UPDATE")
    const result = await query({query:`DELETE FROM Packages WHERE package_id="packageId-${data.code}"`,values:[]})
    
    console.log(result,"DELETE PACKAGE")
    return NextResponse.json({"Status":"Success","data":""})
}