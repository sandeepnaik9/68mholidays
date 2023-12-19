"use client"

import Link from "next/link"

export default function FourOhFour() {
  return(
  <div className="d-flex h-100 justify-content-center align-items-center flex-column">
  <h1>404 - Page Not Found</h1>
    
    <Link href="/">
      Go back home
    </Link>
  </div>  
    
  )
}