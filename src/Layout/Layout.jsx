import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout