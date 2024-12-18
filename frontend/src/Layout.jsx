import React from 'react'
import NavbarComponent from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <NavbarComponent/>
    <Outlet/>
    </>
  )
}

export default Layout