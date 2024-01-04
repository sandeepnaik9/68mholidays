import { NextResponse } from 'next/server'
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { jwtVerify } from 'jose'
import verifyJWT from './services/verifyJW'


// This function can be marked `async` if using `await` inside
export async function middleware(request) {


  if (request) {
    const cookiestore = cookies()
    const token = cookiestore?.get("outrightcode")?.value;
    if(request.nextUrl.pathname=="/package"){
      return  NextResponse.redirect(new URL('/india', request.url))
    }
    if (protectedRoutes.includes(request.nextUrl.pathname)||apiRoutes.includes(request.nextUrl.pathname)) {
      if (token != undefined) {
        const verifyT = await verifyJWT({ token, request })

        if (verifyT?.q_res[0].mobile_number !== "8885450415" && request.nextUrl.pathname.startsWith("/packagecreate")) {
          return NextResponse.json({ "message": "Admin of the website can only access this page" }, { status: 302 })
        }




        // const verifyT = ""



      }

      else {
        return NextResponse.json({ "message": "Admin of the website can only access this page" }, { status: 302 })
      }

    }


    if (request) {

    }
  }

  // return NextResponse.redirect(new URL("/"));

  if (false) {
    // return NextResponse.redirect(new URL('/', request.url))
  }
  // else{
  //   ("Middle Ware is working")
  //   return NextResponse.redirect(new URL('/'))
  // }
}

// See "Matching Paths" below to learn more


const apiRoutes = [
  '/api/package/addRegion',
  '/api/package/addPackage',
  '/api/package/addCountry',
  '/api/package/addItinerary',
  '/api/package/addDestiantion',
  '/api/package/addDayWiseDetial',
]

const protectedRoutes = [
  '/packagecreate'
]


export const config = {
  matcher: ["/", "/MultiStepForm/:path", '/login', '/package', '/admin', '/packages', '/api/auth/getUserDetails']+apiRoutes+protectedRoutes,

}

