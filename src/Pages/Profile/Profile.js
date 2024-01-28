import axios from '../../axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import EditProfile from './EditProfile'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/authContext'

function Profile() {
    const { userDetails, setUserDetails } = useContext(AuthContext)

    const [profileDetails, setProfileDetails] = useState([])
    const [editProfile, setEditProfile] = useState()
    const [orderDetails, setOrderDetails] = useState([])

    const openEditProfile = () => {
        setEditProfile(true)
    }

    const closeEditProfile = () => {
        setEditProfile(false)
    }

    const uploadRef = useRef()

    const getProfileDetails = async () => {
        try {
            let result = await axios.get('/user/my-profile/')
            if (result.data.success) {
                setProfileDetails(result.data.data)

            }
        } catch (ERR) {
            console.log(ERR)
        }
    }
    const getMyOrders = async () => {
        try {
            let result = await axios.get('/cart/my-order/')
            if (result.data.success) {
                setOrderDetails(result.data.data)

            }
        } catch (ERR) {
            console.log(ERR)
        }
    }

    const uploadProfilePicture = async (img) => {
        try {
            if (img) {
                const formData = new FormData()

                formData.append('image', img)
                let result = await axios.put('/user/upload-pp', formData)
                if (result.data.success) {
                    toast.success('Image Uploaded')
                    const localData = JSON.parse(localStorage.getItem('_hw_userDetails'))
                    localData.image = result.data?.data?.image
                    localStorage.setItem('_hw_userDetails', JSON.stringify(localData))
                    getProfileDetails()
                    userDetails.image = result.data?.data?.image
                    // setUserDetails(newdata)
                    setUserDetails(userDetails)
                }
            }
        } catch (ERR) {
            console.log(ERR)
        }
    }

    useEffect(() => {
        getProfileDetails()
        getMyOrders()
    }, [])

    console.log(orderDetails)

    return (
        <div className="h-full bg-gray-50 p-8 max-w-7xl mx-auto">

            {
                editProfile &&
                <EditProfile modalIsOpen={editProfile} closeModal={closeEditProfile} getRoute={getProfileDetails} profileDetails={profileDetails} />
            }
            <div className="bg-white rounded-lg shadow-xl pb-8">

                <div className="flex flex-col items-center ">
                    {
                        profileDetails?.image ?

                            <img src={`${process.env.REACT_APP_IMG_URI}${profileDetails?.image}`} className="w-40 border-4 mt-5 border-white rounded-full" />
                            :
                            <img src="/defaultUserImage.png" className="w-40 border-4 mt-5 border-white rounded-full" />

                    }
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl">{profileDetails?.firstname} {profileDetails?.lastname}</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">

                        <input ref={uploadRef} type='file' className='hidden' onChange={(e) => {
                            uploadProfilePicture(e.target.files[0])
                        }} />

                        <button onClick={() => {
                            uploadRef.current.click()
                        }} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                            <span>Image</span>
                        </button>
                        <button onClick={() => {
                            openEditProfile()
                        }} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                            </svg>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div className="w-full flex flex-col">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex border-y py-2 gap-3">
                                <span className="font-bold w-24">First Name:</span>
                                <span className="text-gray-700">{profileDetails?.firstname}</span>
                            </li>
                            <li className="flex border-y py-2 gap-3">
                                <span className="font-bold w-24">Last Name:</span>
                                <span className="text-gray-700">{profileDetails?.lastname}</span>
                            </li>
                            <li className="flex border-y py-2 gap-3">
                                <span className="font-bold w-24">Email:</span>
                                <span className="text-gray-700">{profileDetails?.email}</span>
                            </li>
                            <li className="flex border-y py-2 gap-3">
                                <span className="font-bold w-24">Contact:</span>
                                <span className="text-gray-700">{profileDetails?.contact}</span>
                            </li>
                            <li className="flex border-y py-2 gap-3">
                                <span className="font-bold w-24">Address:</span>
                                <span className="text-gray-700">{profileDetails?.address}</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div className="w-full flex flex-col">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">My Orders</h4>
                        <ul className="mt-2 text-gray-700">
                            {
                                orderDetails?.map((value, index) => (
                                    <li className="flex py-6" key={index}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={`${process.env.REACT_APP_IMG_URI}${value?.item?.images[0]}`} alt="Wishlist product." className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={`product/` + value?.product_sku}>{value?.item?.product_name}</a>
                                                    </h3>
                                                    <p className="ml-4">Rs. {value?.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Quantity: {value?.quantity}</p>
                                            </div>
                                            <div className="flex flex-1 items-center mt-2 justify-end text-sm">
                                                <p onClick={() => {
                                                    // addToWishlist(value?.product._id)
                                                }} type="button" className="font-medium text-red-600 hover:text-red-500">Status : {value?.status}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default Profile