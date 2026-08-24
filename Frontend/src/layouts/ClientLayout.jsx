import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <div>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
            <Outlet />
        </div>
    </div>
  )
}

export default ClientLayout