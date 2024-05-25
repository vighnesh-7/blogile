import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import {Outlet} from "react-router-dom"

function RootLayout() {  
  
  return (
    <div>
        <NavBar/>
        <div style={{minHeight:'120vh'}}>
            {/* placeholder componenet */}
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout