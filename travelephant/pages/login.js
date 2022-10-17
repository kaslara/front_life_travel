import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { FaLock, FaUser } from 'react-icons/fa'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from "../components/Layout"

export default function Login() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const auth=false;
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    const response= await fetch('http://20.103.33.25/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          name
      }),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    const data=await response.json()
    console.log(data)

    await router.push('/');
}


  return (
    
    <Layout auth={auth}>
       {/* container */}
    <div className='bg-white block items-center justify-center p-8 md:flex'>
      <div className='bg-cover bg-indigo-600 flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg shadow-lg text-gray-600 w-full md:flex-row'>
        <div className='backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2'>
          <h1 className='font-small text-3xl'>TravElephant</h1>
        </div>

        {/* form */}
        <div className='bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2'>
          <div className='flex flex-col items-center'>
            <h1 className='font-medium text-indigo-600 text-xl'>Welcome</h1>
            <p>Login to your account</p>
          </div>

          {/* inputs */}
          <form className='flex flex-col items-center p-4 space-y-4' onSubmit={submit}>
            <div className='relative'>
              <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaUser /></span>
              <input className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-indigo-600' placeholder='Username' type='text' onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='relative'>
              <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaLock /></span>
              <input className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-indigo-600' placeholder='Name' type='text' onChange={e => setName(e.target.value)}/>
            </div>
            <button className='bg-indigo-600 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-indigo-600' type='submit'>
              <FaUser className='mr-2' />
              Login now
            </button>
          </form>

          {/* links */}
          <div className='flex flex-col items-center'>
            <p className='italic'>
              Join us now.
              <NextLink href="/register">
                <a className='ml-1 text-indigo-600 hover:underline'>Register here</a>
              </NextLink>
            </p>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}