import { query } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    const data = await request.json();
    
    console.log(data,"DATA UPDATE")
    const result = await query({query:`UPDATE Packages SET package_name=(?), BannerImage=(?), destinations=(?), TourIncludes=(?), N_Days=(?), destinations=(?), pricingTable=(?), itinerarydetails=(?) WHERE package_id="packageId-${data.code}"`,values:[data.packageName,data.bannerImage,data.destinations,data.tourIncludes,data.nDays,data.destinations,data.pricingTable, data.itinerary]})
    
    
    return NextResponse.json({"Status":"Success","data":""})
}