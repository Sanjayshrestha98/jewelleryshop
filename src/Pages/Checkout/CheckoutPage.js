import axios from '../../axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'


function CheckoutPage({ modalIsOpen, closeModal, getRoute, cartData }) {

    const [shippingAddress, setShippingAddress] = useState()

    const checkout = async () => {
        try {
            if (shippingAddress) {
                let result = await axios.put('/cart/checkout/' + cartData?.cart._id, {
                    shipping_address: shippingAddress
                })
                if (result.data.success) {
                    toast.success('Your Order has been Placed Successfully')
                    getRoute()
                    closeModal()
                    // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
                } else toast.error('Failed')
            }else toast.error('Please add shipping address')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    return (
        <Modal
        ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Category Modal"
            overlayClassName="Overlay"
            className="Modal rounded-md p-5 md:w-1/4 max-h-screen overflow-auto"
        >
            <form className="w-full  px-4 py">
                <div className="bg-gray-50 rounded-xl shadow-md p-6">
                    <h2 className="text-gray-700 text-lg mb-4 font-semibold">Cart totals</h2>
                    <div className="pb-4 border-b border-gray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-800">Rs. {cartData?.cart?.total}</p>
                    </div>
                    <div className="pb-4 border-b border-gray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
                        <p className="text-gray-600">Discount</p>
                        <p className="text-gray-800">Rs. {cartData?.cart?.discount}</p>
                    </div>
                    <p className="text-gray-800 mb-4 font-semibold">Shipping</p>
                    <div className="mb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-gray-600">Delivery Costs</p>
                            <p className="text-gray-800">Rs. 00.00</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-gray-600">Mode of Payment</p>
                            <p className="text-gray-800 font-semibold">Cash on Delivery</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-gray-600">Shipping Address</p>
                            <input
                                required
                                className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Enter Shipping Address'
                                type='string' onChange={(e) => {
                                    setShippingAddress(e.target.value)
                                }} />
                        </div>
                    </div>
                    {/* <div className="pb-4 border-b border-gray-200 mb-4"><a className="text-blue-500 hover:text-blue-600 transition duration-200" href="#">Change Shipping Address</a></div> */}
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4 mt-10">
                        <label className="text-gray-700 font-semibold text-lg">Order Total</label>
                        <label className="text-gray-700 font-semibold text-lg">Rs. {cartData?.cart?.grand_total}</label>
                    </div>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault()
                        checkout()
                    }} className="bg-blue-500 mt-4 py-3 px-4 rounded-sm text-white text-center hover:bg-blue-600 transition duration-200 w-full inline-block">Checkout</button>
                    <button onClick={() => {
                        closeModal()
                    }} className="bg-gray-500 mt-4 py-3 px-4 rounded-sm text-white text-center hover:bg-gray-600 transition duration-200 w-full inline-block">Cancel</button>
                </div>
            </form>

        </Modal>
    )
}

export default CheckoutPage