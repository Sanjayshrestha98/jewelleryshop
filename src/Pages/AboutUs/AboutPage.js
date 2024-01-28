import React from 'react'

function AboutPage() {
    return (
        <section className="flex items-center bg-white xl:h-screen font-poppins xl:-mt-20 ">
            <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                <div className="flex flex-wrap ">
                    <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                        <div className="relative lg:max-w-md">
                            <img src="/app_logo.png" alt="aboutimage"
                                className="relative z-10 object-cover w-full rounded h-96" />
                            <div
                                className="absolute bottom-0 right-0 z-10 p-8 bg-white border-4 border-blue-500 rounded shadow  lg:-mb-8 lg:-mr-11 sm:p-8   ">
                                <p className="text-lg font-semibold md:w-72 capitalize">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        className="absolute top-0 left-0 w-16 h-16 text-blue-700  opacity-10"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z">
                                        </path>
                                    </svg> your one-stop destination for all your home
                                    improvement and construction needs
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
                        <div className="pl-4 mb-6 border-l-4 border-blue-500 ">
                            <span className="text-sm text-gray-600 uppercase ">Who we are?</span>
                            <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl ">
                                About Us
                            </h1>
                        </div>
                        <p className="mb-6 text-base leading-7 text-gray-500 ">
                            The Build Up Web API application is an e-commerce web application which is
                            design to provide a favorable platform for end users to purchase hardware related tools
                            and get delivered directly to their doorstep. This web application is design to solve
                            problem related to construction tools and supplies for new house or old renovating house
                            and other construction sites.

                        </p>
                        <p className="mb-6 text-base leading-7 text-gray-500 ">
                            This e-commerce web application is your one-stop destination for all your home
                            improvement and construction needs. This application will understand the importance of
                            having access to high-quality tools, materials, and equipment for your projects, and we
                            are her to make shopping experience enjoyable and efficient.

                        </p>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPage