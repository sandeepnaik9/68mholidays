import { query } from "../../../../lib/db";
import { NextResponse } from "next/server"
import {v4 as uuidv4} from 'uuid'
export async function POST(request) {
    const response = NextResponse; 
    // const exisitRegion = await query({query:`SELECT *
    // FROM Regions
    // WHERE region_name LIKE '%${regionName}%'`,values:[]})

    // if(exisitRegion.length){
    //     return response.json({"status":"Fail","data":"Region already there"})
    // }
    // console.log(location,"Location")
    
    const code = uuidv4().toString()
    await query({query:`INSERT Into Packages (package_id) Values (?)`,values:[`packageId-${code}`]})
    return response.json({"stauts":"Success","data":"Added Country Successfully","code":code})
}
