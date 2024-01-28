import React from 'react'
import { FaBoxes, FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa'

function Dashboard() {
  return (
    <div className='mx-auto max-w-7xl px-4'>

      <h1 className='text-4xl font-semibold'>Admin Dashboard</h1>

      <div className='grid md:grid-cols-2 gap-4 mt-10'>

        <div className='shadow p-3 py-10 bg-blue-100 flex flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><FaUser /> Total Users</label>
          <label className='text-4xl mt-3 text-gray-500'>20</label>
        </div>
        <div className='shadow p-3 py-10 flex bg-yellow-200 flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><FaShoppingBag /> Total Products</label>
          <label className='text-4xl mt-3 text-gray-500'>20</label>
        </div>
        <div className='shadow p-3 py-10 flex bg-green-200 flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><FaBoxes /> Total Category</label>
          <label className='text-4xl mt-3 text-gray-500'>20</label>
        </div>
        <div className='shadow p-3 py-10 bg-orange-200 flex flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><FaShoppingCart /> Total Orders</label>
          <label className='text-4xl mt-3 text-gray-500'>20</label>
        </div>
      </div>
    </div>
  )
}

export default Dashboard