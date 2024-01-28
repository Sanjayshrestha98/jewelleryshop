import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaFilter } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function AllProducts() {
    const [showFilter, setShowFilter] = useState()
    const [priceFilter, setPriceFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    const navigate = useNavigate()
    const location = useLocation();
    const { category } = location.state || {};

    const [categoryData, setCategoryData] = useState([])
    const [productData, setProductData] = useState([])

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

    const getAllProducts = async () => {
        try {
            let result = await axios.get('/product', {
                params: {
                    search: "",
                    page: 1,
                    size: 50,
                    price: priceFilter,
                    category: category,
                    date: dateFilter
                }
            })

            if (result.data.success) {
                setProductData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    useEffect(() => {
        getAllProducts()
    }, [category, priceFilter, dateFilter])

    const clearFilter = () => {
        navigate('/product', { state: { category: "" } });

    }

    return (
        <div className="bg-white">
            <div>
                {
                    showFilter &&
                    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                        <div className="fixed inset-0 z-50 flex" style={{
                            zIndex: "99999"
                        }}>
                            <div className="relative p-5 ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button onClick={() => {
                                        setShowFilter(false)
                                    }} type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* <!-- Filters --> */}
                                <div className="lg:hidden block">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                        <li>
                                            <a href="#" className="" role="menuitem" tabindex="-1" id="menu-item-0">Most Popular</a>
                                        </li>
                                        <li>
                                            <a href="#" className="" role="menuitem" tabindex="-1" id="menu-item-1">Best Rating</a>
                                        </li>
                                        <li>
                                            <a href="#" className="" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>
                                        </li>
                                        <li>
                                            <a href="#" className="" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>
                                        </li>
                                        <li>
                                            <a href="#" className="" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a>
                                        </li>
                                    </ul>

                                    <div className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                                <span className="font-medium text-gray-900">Category</span>
                                                <span className="ml-6 flex items-center">
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </h3>
                                        <div className="pt-6" id="filter-section-1">
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <input id="filter-category-0" name="category[]" value="new-arrivals" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-0" className="ml-3 text-sm text-gray-600">New Arrivals</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-category-1" name="category[]" value="sale" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-1" className="ml-3 text-sm text-gray-600">Sale</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-category-2" name="category[]" value="travel" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-2" className="ml-3 text-sm text-gray-600">Travel</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-category-3" name="category[]" value="organization" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-3" className="ml-3 text-sm text-gray-600">Organization</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-category-4" name="category[]" value="accessories" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label for="filter-category-4" className="ml-3 text-sm text-gray-600">Accessories</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            {/* <!-- Expand/collapse section button --> */}
                                            <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false">
                                                <span className="font-medium text-gray-900">Price</span>

                                            </button>
                                        </h3>
                                        {/* <!-- Filter section, show/hide based on section state. --> */}
                                        <div className="pt-6" id="filter-section-2">
                                            <input type='range' step={1} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
                        <button className='lg:hidden block' onClick={() => {
                            setShowFilter(true)
                        }}><FaFilter /></button>

                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* <!-- Filters --> */}
                            <div className="hidden lg:block">
                                <h3 className="p-2 mb-2 font-semibold">Filters</h3>
                                <ul role="list" className="space-y-1 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {/* <li className=''>
                                        <button onClick={() => {
                                            setPriceFilter(1)
                                        }} className="">Most Popular</button>
                                    </li> */}
                                    <li role='button' onClick={() => {
                                        setDateFilter(1)
                                    }} className={`${dateFilter === 1 ? "bg-gray-50" : ""} p-2`}>
                                        Oldest
                                    </li>
                                    <li onClick={() => {
                                        setDateFilter(-1)
                                    }} role='button' className={`${dateFilter === -1 ? "bg-gray-50" : ""} p-2`} >
                                        Newest
                                    </li>
                                    <li role='button' onClick={() => {
                                        setPriceFilter(1)
                                    }} className={`${priceFilter === 1 ? "bg-gray-50" : ""} p-2`}>
                                        Price: Low to High
                                    </li>
                                    <li role='button' onClick={() => {
                                        setPriceFilter(-1)
                                    }} className={`${priceFilter === -1 ? "bg-gray-50" : ""} p-2`}>
                                        Price: High to Low
                                    </li>
                                </ul>

                                <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Category</span>
                                            {
                                                category &&
                                                <button onClick={() => {
                                                    clearFilter()
                                                }} className='flex gap-2'>
                                                    <span>Clear</span>
                                                    <span className=" flex items-center rotate-45">
                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            }
                                        </button>
                                    </h3>
                                    <div className="pt-6" id="filter-section-1">
                                        <div className="space-y-4">

                                            {
                                                categoryData.map((value, index) => (
                                                    <div className="flex items-center">
                                                        <input onChange={(e) => {
                                                            // console.log('e.target.value', e.target.value)
                                                            // setSelectedCateogry(e.target.value)
                                                            navigate('/product', { state: { category: value._id } });
                                                        }} id={value._id} checked={category === value._id} name={value.name} value={value._id} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for={value._id} className="ml-3 text-sm text-gray-600">{value.name}</label>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Price</span>

                                        </button>
                                    </h3>
                                    <div className="pt-6" id="filter-section-2">
                                        <input type='range' step={1} />
                                    </div>
                                </div> */}
                            </div>
                            <div className="lg:col-span-3 border-l">
                                <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                        {productData.map((product, index) => (
                                            <Link to={`/product/${product.product_sku}`} key={index} className="group relative" role='button'>
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                    <img
                                                        src={`${process.env.REACT_APP_IMG_URI}${product.images[0]}`}
                                                        alt={product.imageAlt}
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700 capitalize">
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {product.product_name}
                                                        </h3>
                                                        {/* <p className="mt-1 text-sm text-gray-500 capitalize">{product.variant[0].variant_type[0].color}</p> */}
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">Rs. {product.price}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div >
    )
}

export default AllProducts