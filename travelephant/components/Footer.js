import React from 'react'

function Footer() {
  return (
    <>
    <div className='bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20'>
        <div className='p-5'>
            <ul>
                <p className='text-indigo-600 font-bold text-3xl pb-6'>
                    ElephanTravel
                </p>
                {/* <div className='flex gap-6 pb-5'>
                    
                
                </div> */}
            </ul>
        </div>
        <div className='p-5'>
            <ul>
                <p className='text-gray-800 font-bold text-2xl pb-4'>Account</p>
                <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>Login</li>
                <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>Register</li>
            </ul>
        </div>
        <div className='p-5'>
                <ul>
                    <p className='text-gray-800 font-bold text-2xl pb-4'>Customer care</p>
                    <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>About us</li>
                    <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>Bus Lines</li>
                    <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>Reserved tickets</li>
                </ul>
        </div>
        <div className='p-5'>
            <ul>
                <p className='text-gray-800 font-bold text-2xl pb-4'>Contact</p>
                <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>Magjistralja Prishtine-Ferizaj Kilometri i 6 Prishtine, Kosove</li>
                <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>dilara.kastrati@life.gjirafa.com</li>
                <li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>valmira.shala@life.gjirafa.com</li><li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>ardit.mullabazi@life.gjirafa.com</li><li className='text-gray-500 text-md pb-2 font-semibold hover:text-indigo-600 cursor-pointer'>herolind.huruglica@life.gjirafa.com</li>
            </ul>
        </div>
    </div>

    <div className='flex flex-col justify-center items-center text-center p-5 bg-gray-50'>
        <h1 className='text-gray-800 font-semibold'>© 2022 All rights reserved | Build with ❤ by {" "}
        <span className='hover:text-indigo-600 font-semibold cursor-pointer'>
            elephantravel
        </span>{" "}
        </h1>
    </div>
    </>
  )
}

export default Footer