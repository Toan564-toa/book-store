import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const ClientLayout = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
        <Navbar />
        <div className='container mx-auto'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default ClientLayout