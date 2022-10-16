import Head from 'next/head'
import Image from 'next/image'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { FaLock, FaUser } from 'react-icons/fa'
import NextLink from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname]=useState('');
  const [address, setAddress]=useState('');

  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch('http://localhost:5196/add-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            username,
            name,
            surname,
            address
        })
    });

    await router.push('/login');
}


  return (
    <Layout auth={false} >
    
      <div className='relative m-20'>
    
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
            <p>Create your account</p>
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
            <div className='relative'>
              <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaLock /></span>
              <input className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-indigo-600' placeholder='Surname' type='text' onChange={e => setSurname(e.target.value)}/>
            </div>
            <div className='relative'>
              <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaLock /></span>
              <input className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-indigo-600' placeholder='Address' type='text' onChange={e => setAddress(e.target.value)}/>
            </div>
            <button className='bg-indigo-600 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-indigo-600' type='submit'>
              <FaUser className='mr-2' />
              Register now
            </button>
          </form>

          {/* links */}
          <div className='flex flex-col items-center'>
            <p className='italic'>
              Already have an account?
              <NextLink href="/login">
                <a className='ml-1 text-indigo-600 hover:underline'>Login here</a>
              </NextLink>
            </p>
          </div>
        </div>
      </div>
    </div>

      </div>
      
</Layout>
  )
}