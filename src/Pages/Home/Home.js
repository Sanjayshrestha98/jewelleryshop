import toast from 'react-hot-toast'
import axios from '../../axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {


    const [productList, setProductList] = useState()

   
    const callouts = [
        {
            name: 'Desk and Office',
            description: 'Work from home accessories',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
            href: '#',
        },
        {
            name: 'Self-Improvement',
            description: 'Journals and note-taking',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
            href: '#',
        },
        {
            name: 'Travel',
            description: 'Daily commute essentials',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '#',
        },
    ]

    const getAllProducts = async () => {
        try {
            let result = await axios.get('/product', {
                params: {
                    search: "",
                    page: 1,
                    size: 8,
                    price: -1,
                }
            })

            if (result.data.success) {
                setProductList(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed to fetch products')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className="bg-white">

            <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
                <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                    <svg
                        className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        preserveAspectRatio="none slice"
                    >
                        <path d="M50 0H100L50 100H0L50 0Z" />
                    </svg>
                    <img
                        className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                        src="/homepagepic.jpg"
                        alt="home page pic"
                    />
                </div>
                <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                    <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                            Tools, Equipment, and Expertise
                        </p>
                        <h2 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Quality Tools and Supplies for Every Project
                        </h2>
                        <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                            Embark on your next project with confidence. At Build Up, we provide the tools and expertise to turn your visions into reality. Explore Our Extensive Hardware Collection
                        </p>
                        <div className="flex items-center">
                            <a
                                href="/product"
                                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none"
                            >
                                Explore
                            </a>
                            {/* <a
                                href="/"
                                aria-label=""
                                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                                Learn more
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>


            {/* Product */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recommended Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productList?.map((product, index) => (
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

            {/* Category */}
            {/* <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Explore Collections</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {callouts.map((callout, index) => (
                                <div key={index} className="group relative">
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}
