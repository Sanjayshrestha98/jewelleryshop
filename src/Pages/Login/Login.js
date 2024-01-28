import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';

function Login() {

  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, setUserDetails } = useContext(AuthContext)


  // Function to handle form submission
  const handleFormSubmit = async (values, actions) => {

    try {
      // Make an Axios POST request
      const response = await axios.post('user/login', values);

      if (response.data.success) {
        localStorage.setItem('_hw_userDetails', JSON.stringify(response.data.data))
        localStorage.setItem('_hw_token', response.data.data.token)
        setUserDetails(response.data.data);
        toast.success('Login Successfull')

        setTimeout(() => {
          setIsAuthenticated(true)
          if (response.data.data.role.includes('admin') || response.data.data.role.includes('super-admin')) {
            navigate('/dashboard')
          } else navigate('/')
        }, 400)
      }

    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error submitting form:', error);
      toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : "Failed To Login")
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })


  return (
    <div className="grid min-h-screen  w-full place-items-center px-6 py-12 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='max-w-sm w-full '>
        <a href='/' className='font-semibold text-gray-600 flex items-center gap-3'>
          <FaArrowLeft /> Back
        </a>
        <div className="mx-auto w-full ">
          <img
            className="mx-auto h-20 w-auto"
            src="/app_logo.png"
            alt="login img"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full ">

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, actions) => {
              handleFormSubmit(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <div>
                  <label
                    id="email"
                    className="block w-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <Field
                    required
                    name="email"
                    value={props.values.email}
                    aria-labelledby="email"
                    type="email"
                    className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-6  w-full">
                  <label
                    htmlFor="pass"
                    className="block w-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center justify-center">
                    <Field
                      required
                      name="password"
                      value={props.values.password}
                      id="pass"
                      type={`${"password"}`}
                      className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    // onClick={() => login()}
                    role="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Signed Up Yet?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login