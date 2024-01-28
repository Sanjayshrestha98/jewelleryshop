import React from 'react'

function About() {
    return (
        <section className=" items-center grid p-10 xl:h-screen xl:-mt-20 ">
            <img src="/aboutpagebg.webp" alt="aboutimage"
                className="absolute h-screen  object-cover w-full rounded -z-10 left-0 top-0" />

            <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 text-white  z-50">
                {/* <div className="pl-4 mb-6 border-l-4 border-blue-500 ">
                </div> */}
                <h1 className="mt-2 py-4 text-3xl border-b font-semibold md:text-5xl ">
                    About Us
                </h1>
                <p className="mb-6 text-lg leading-7  mt-7">

                    JoJoLaPa is one of the largest jewelry company in Nepal with multiple branches and brands in the prime shopping areas of Kirtipur Kathmandu. From our humble roots from a tiny storefront in the jewelry district of has taken ambitious strides to elevate the product and service offerings both in Nepal as well as globally. Luxurious, unique, and accessible has been the defining features of the JoJoLaPa product.

                </p>
                <p className="mb-6 text-lg leading-7  ">
                    Unapologetically extravagant at times and nuanced and subtle at others, we consistently push our style horizons. From working with paper thin 24 carat gold for exquisite hand-made traditional Nepali jewelry to working with state-of-the-art machinery and tools for contemporary diamond jewelry, our karighars [craftsmen] are marrying the craft of their ancestors with the latest in jewelry technology.



                </p>
            </div>
        </section>
    )
}

export default About