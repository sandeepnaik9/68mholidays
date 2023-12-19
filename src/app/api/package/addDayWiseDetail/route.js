import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
import {v4 as uuidv4} from 'uuid'
export async function POST(request) {
    const response = NextResponse; 
    const {countryName} = await request.json()
    // const exisitRegion = await query({query:`SELECT *
    // FROM Regions
    // WHERE region_name LIKE '%${regionName}%'`,values:[]})

    // if(exisitRegion.length){
    //     return response.json({"status":"Fail","data":"Region already there"})
    // }
    console.log(countryName,"RegionNmae SERVER")
    await query({query:`INSERT Into Countries (country_id,country_name) Values (?,?)`,values:[`countryId-${uuidv4().toString()}`,countryName]})
    return response.json({"stauts":"Success","data":"Added Country Successfully"})
}
