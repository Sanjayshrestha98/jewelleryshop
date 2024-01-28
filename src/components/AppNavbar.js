import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { MdArrowBackIos, MdOutlineMenu, MdOutlineShoppingBag } from 'react-icons/md'
import { GoBell, GoHeart, GoSearch } from 'react-icons/go'
import { FaBars, FaThumbsUp } from 'react-icons/fa'
import SideNav from './SideNav';
import { FaHamburger } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import toast from 'react-hot-toast';



const AppNavbar = () => {
    const authUser = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [toggleNav, setToggleNav] = useState(true);
    const [notificationModal, setNotificationModal] = useState(false);
    const [sideNav, setSideNav] = useState(false);
    const [categoryData, setCategoryData] = useState([])

    let isAuthenticated = authUser?.isAuthenticated;

    const getAllCategory = async () => {
        try {
            let result = await axios.get('/category', {
                params: {
                    search: "",
                    page: 1,
                    size: 50
                }
            })

            if (result.data.success) {
                setCategoryData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const navigation = [
        { name: 'Home', href: '/' },
        {
            name: 'Category', href: '/category',
            children: categoryData ? categoryData : []
        },
        { name: 'Product', href: '/product' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // for smoothly scrolling
        });
    };

    const notificationHandler = () => {
        setNotificationModal(!notificationModal);
    };

    const handleNav = () => {
        setToggleNav(!toggleNav);
    };

    const [navbackground, setNavBackground] = useState(false);

    const changenavbackground = () => {
        if (window.scrollY >= 30) {
            setNavBackground(true);
        } else {
            setNavBackground(false);
        }
    };

    window.addEventListener("scroll", changenavbackground);

    const handelNotification = () => {
        if (notificationModal) setNotificationModal(false);
    };

    const logout = () => {
        localStorage.removeItem("_hw_token");
        localStorage.removeItem("_hw_userDetails");

        setTimeout(() => {
            window.location.href = "/login"
        }, 400)
    };


    // console.log("authUSer", authUser);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <div
            className={`transition ease-in z-30 sticky top-0 duration-300 hover:bg-white ${navbackground && "bg-white"
                } ${location.pathname === '/login' && 'hidden'} ${location.pathname === '/signup' && 'hidden'} ${location.pathname.includes('dashboard') && 'hidden'}`}
            onClick={handelNotification}
        >
            <header className={` inset-x-0 top-0 z-50 ${navbackground ? "bg-white" : "bg-transparent"}`}>
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="/app_logo.png"
                                alt="applogo"
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <FaBars className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12 ">
                        {navigation.map((item, index) => (
                            <div role='button' key={index} onClick={() => {
                                if (!item.children) {
                                    navigate(item.href)
                                }
                            }} href={item.href} className={`relative text-sm group hover:border-b-blue-700 px-3 hover:border-b-2 border-b-2 border-transparent py-2 font-normal ${location.pathname === item.href &&
                                "border-b-2 border-b-blue-700 "
                                }`}>
                                {item.name}
                                {
                                    item.children &&
                                    <div className='hidden group-hover:block absolute pt-5 w-[150px] left-0'>
                                        <ul>
                                            {
                                                item.children.map((value, index) => (
                                                    <li key={index} onClick={() => {
                                                        navigate('/product', { state: { category: value._id } });
                                                    }} role='button' className='p-2 border hover:bg-gray-50 bg-white'>{value.name}</li>
                                                ))}
                                        </ul>

                                    </div>

                                }
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div className="flex items-center">
                            {isAuthenticated ? (
                                <div className="flex items-center">
                                    <div className="flex items-center mr-8 gap-4">
                                        {/* <button
                                            onClick={notificationHandler}
                                            className="relative transform cursor-pointer hover:scale-110"
                                        >
                                            <GoBell size={23} strokeWidth={0.5} />

                                            <div className="animate-ping w-2 h-2 rounded-full bg-red-400 border border-white absolute left-3 top-0" />
                                        </button> */}

                                        <div className=" transform cursor-pointer hover:scale-110">
                                            <Link to={"/wishlist"}>
                                                {/* <img src="/heartoutline.png" /> */}
                                                <GoHeart size={23} strokeWidth={0.5} />
                                            </Link>
                                        </div>

                                        {/* <div className=" transform cursor-pointer hover:scale-110">
                                            <Link to={"/like"}>
                                                <FaThumbsUp size={20} className="" />
                                            </Link>
                                        </div> */}

                                        <div className=" transform cursor-pointer hover:scale-110">
                                            <Link to={"/cartpage"}>
                                                {/* <img src="/Cart.png" /> */}
                                                <MdOutlineShoppingBag size={23} />

                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <span className="group relative inline-block">
                                            <button
                                                type="button"
                                                className="flex items-center mr-3 text-sm md:mr-0 h-full cursor-pointer"
                                                id="user-menu-button"
                                                data-dropdown-toggle="dropdown"
                                            >
                                                <div className=" overflow-hidden rounded-full">
                                                    {authUser.userDetails?.image ? (
                                                        <img
                                                            className="w-7 rounded-full object-cover object-center sm:w-8 md:w-8 h-7"
                                                            src={`${process.env.REACT_APP_IMG_URI}${authUser.userDetails?.image}`}
                                                            alt="user photo"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="w-7 rounded-full object-cover object-center sm:w-8 md:w-7 h-7 border"
                                                            src="/defaultUserImage.png"
                                                            alt="user photo"
                                                        />
                                                    )}
                                                </div>

                                            </button>

                                            <ul className="absolute right-0 hidden pt-1 w-40 p-2 border rounded bg-white text-gray-700 group-hover:block">
                                                <Link to={"/profile"}>
                                                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                        <div className="flex items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon icon-tabler icon-tabler-user"
                                                                width={20}
                                                                height={20}
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={2}
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <circle cx={12} cy={7} r={4} />
                                                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                            </svg>
                                                            <span className="ml-2">My Profile</span>
                                                        </div>
                                                    </li>
                                                </Link>
                                                <li
                                                    onClick={() => logout()}
                                                    className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span className="ml-2">Log Out</span>
                                                </li>
                                            </ul>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2 mr-4  ">
                                    <div className="cursor-pointer ">
                                        <Link to={"/login"}>
                                            <button className="px-3 py-2 text-sm hover:bg-blue-200 duration-150 hover:scale-105 rounded-full">
                                                Login
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="  cursor-pointer ">
                                        <Link to={"/signup"}>
                                            <button className="px-4 py-2 border text-sm hover:bg-blue-200 duration-150 hover:scale-105 rounded-full">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </div>


                                </div>
                            )}

                            <MdOutlineMenu
                                onClick={() => {
                                    setSideNav(true);
                                }}
                                className="block lg:hidden cursor-pointer"
                                size={25}
                            />
                        </div>
                    </div>
                </nav>
                {
                    mobileMenuOpen &&
                    <div className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-50" />
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="/app_logo.png"
                                        alt="applogo"
                                    />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <MdClose className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>


                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                    <div className="py-2 flex items-center">
                                        {isAuthenticated ? (
                                            <div className="flex items-center">
                                                <div className="flex items-center mr-8 gap-4">
                                                    <div
                                                        onClick={notificationHandler}
                                                        className="relative transform cursor-pointer hover:scale-110"
                                                    >
                                                        <img src="/notification.png" />
                                                        <div className="animate-ping w-2 h-2 rounded-full bg-red-400 border border-white absolute left-3 top-0" />
                                                    </div>

                                                    <div className=" transform cursor-pointer hover:scale-110">
                                                        <Link to={"/wishlist"}>
                                                            <img src="/heartoutline.png" />

                                                        </Link>
                                                    </div>

                                                    <div className=" transform cursor-pointer hover:scale-110">
                                                        <Link to={"/like"}>
                                                            <FaThumbsUp size={20} className="" />
                                                        </Link>
                                                    </div>

                                                    <div className=" transform cursor-pointer hover:scale-110">
                                                        <Link to={"/cartpage"}>
                                                            <img src="/Cart.png" />
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="flex">
                                                    <span className="group relative inline-block">
                                                        <button
                                                            type="button"
                                                            className="flex items-center mr-3 text-sm md:mr-0 h-full cursor-pointer"
                                                            id="user-menu-button"
                                                            data-dropdown-toggle="dropdown"
                                                        >
                                                            <div className=" overflow-hidden rounded-full">
                                                                {authUser?.userDetails?.image ? (
                                                                    <img
                                                                        className="w-7 rounded-full object-cover object-center sm:w-8 md:w-8 h-7"
                                                                        src={`${process.env.REACT_APP_BASE_URI}${authUser?.userDetails?.image}`}
                                                                        alt="user photo"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        className="w-7 rounded-full object-cover object-center sm:w-8 md:w-7 h-7 border"
                                                                        src="/defaultUserImage.png"
                                                                        alt="user photo"
                                                                    />
                                                                )}
                                                            </div>

                                                        </button>

                                                        <ul className="absolute right-0 hidden pt-1 w-40 p-2 border rounded bg-white text-gray-700 group-hover:block">
                                                            <Link to={"/profile"}>
                                                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="icon icon-tabler icon-tabler-user"
                                                                            width={20}
                                                                            height={20}
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth={2}
                                                                            stroke="currentColor"
                                                                            fill="none"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                                            <circle cx={12} cy={7} r={4} />
                                                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                                        </svg>
                                                                        <span className="ml-2">My Profile</span>
                                                                    </div>
                                                                </li>
                                                            </Link>
                                                            <li
                                                                onClick={() => logout()}
                                                                className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                                    />
                                                                </svg>
                                                                <span className="ml-2">Log Out</span>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-6 w-full">
                                                <a
                                                    href={"/signup"}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Sign Up
                                                </a>
                                                <Link
                                                    to={"/login"}
                                                    onClick={() => {
                                                        setMobileMenuOpen(false)
                                                    }}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Log in
                                                </Link>
                                            </div>
                                        )}

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                }
            </header>

        </div>
    );
}

export default AppNavbar;
