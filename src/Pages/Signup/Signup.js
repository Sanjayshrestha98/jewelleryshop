import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import FieldError from '../../components/FieldError';
import toast from 'react-hot-toast';

function Signup() {

    const navigate = useNavigate()
    const validationSchema = yup.object({
        firstname: yup.string()
            .required('This Field is required'),
        lastname: yup.string()
            .required('This Field is required'),
        email: yup.string()
            .required('This Field is required'),
        contact: yup.string()
            .required("Phone number is required")
            .matches(/^[9]\d{9}$/, "Invalid phone number"),
        address: yup.string()
            .required('This Field is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(5, 'Your password is too short.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        confirmpassword: yup
            .string()
            .required('Confirm Your Password')
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    // Function to handle form submission
    const handleFormSubmit = async (values, actions) => {
        try {

            const data = values

            delete data.confirmpassword

            // Make an Axios POST request
            const response = await axios.post('/user/register', values);

            if (response.data.success) {
                toast.success('Registration Successfull')

                setTimeout(() => {
                    navigate('/')
                })
            }

            // Handle the response as needed (e.g., redirect, show a success message)
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error submitting form:', error);
            toast.error(error.response.data.msg)
        }
    };


    return (
        <div className="grid min-h-screen bg-center bg-cover  w-full items-center px-6 py-12 lg:px-8" style={{
            backgroundImage: `url('/aboutpagebg.webp')`,
            backgroundRepeat: "no-repeat"
        }}>
            <div className='max-w-2xl w-full'>
                <a href='/' className='font-semibold text-gray-600 flex items-center gap-3'>
                    <FaArrowLeft /> Home
                </a>

                <div className="sm:mx-auto">
                    {/* <img
                        className="mx-auto h-20 w-auto"
                        src="/app_logo.png"
                        alt="buildup"
                    /> */}
                    <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
                        Register
                    </h2>
                </div>

                <div className="mt-10 ">

                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstname: "",
                            lastname: "",
                            email: "",
                            contact: "",
                            address: "",
                            password: "",
                            confirmpassword: "",
                            // role:'super-admin',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            handleFormSubmit(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form className='gap-3 grid grid-cols-2'>
                                <div className=''>
                                    <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-white">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="firstname"
                                            name="firstname"
                                            autoComplete="firstname"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.firstname && props.errors.firstname} />

                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-white">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="lastname"
                                            name="lastname"
                                            autoComplete="lastname"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.lastname && props.errors.lastname} />

                                </div>

                                <div className=''>
                                    <label htmlFor="address" className="block  text-sm font-medium leading-6 text-white">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="address"
                                            name="address"
                                            autoComplete="address"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.address && props.errors.address} />

                                </div>
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium leading-6 text-white">
                                        Contact
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="contact"
                                            name="contact"
                                            autoComplete="contact"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.contact && props.errors.contact} />

                                </div>


                                <div className='col-span-full text-center opacity-15 text-white'>
                                    ------------
                                </div>

                                <div className='col-span-full -mt-3'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.email && props.errors.email} />

                                </div>

                                <div className=" w-full">
                                    <label
                                        htmlFor="pass"
                                        className="block w-full text-sm font-medium leading-6 text-white"
                                    >
                                        Password
                                    </label>
                                    <div className="relative flex items-center justify-center">
                                        <Field
                                            required
                                            name="password"
                                            value={props.values.password}
                                            id="password"
                                            type={`${"password"}`}
                                            className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.password && props.errors.password} />

                                </div>
                                <div className=" w-full">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="block w-full text-sm font-medium leading-6 text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative flex items-center justify-center">
                                        <Field
                                            required
                                            name="confirmpassword"
                                            value={props.values.confirmpassword}
                                            id="confirmpassword"
                                            type={`${"password"}`}
                                            className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <FieldError message={props.touched.confirmpassword && props.errors.confirmpassword} />

                                </div>


                                <div className='col-span-full mt-4'>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Register
                                    </button>
                                </div>


                            </Form>
                        )}
                    </Formik>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already Signed Up?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-gray-600 hover:text-gray-500">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Signup