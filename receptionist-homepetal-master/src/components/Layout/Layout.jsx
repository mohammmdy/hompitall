import React from 'react'
import Navbar from './../Navbar/Navbar';

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      
     <Navbar/>
     <div className='row g-0'>
            <Outlet/>
    </div>
    </>
  )
}
