import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
import {v4 as uuidv4} from 'uuid'
export async function POST(request) {
    const response = NextResponse; 
    const {regionName} = await request.json()
    // const exisitRegion = await query({query:`SELECT *
    // FROM Regions
    // WHERE region_name LIKE '%${regionName}%'`,values:[]})

    // if(exisitRegion.length){
    //     return response.json({"status":"Fail","data":"Region already there"})
    // }
    console.log(regionName,"RegionNmae SERVER")
    await query({query:`INSERT Into Regions (region_id,region_name) Values (?,?)`,values:[`regionId-${uuidv4().toString()}`,regionName]})
    return response.json({"stauts":"Success","data":"Added region Successfully"})
}
