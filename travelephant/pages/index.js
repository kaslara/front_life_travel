import Head from "next/head";
import Bus from '../components/bus'
import Navbar from '../components/Navbar'
import { Formik, Field, Form } from 'formik';
import { useState } from "react";
import { info } from "autoprefixer";

export default function Home({buses}){

    return ( 
        <div className='container'>
        <Navbar />
          <div className=" relative p-36 z-0">
              <Formik
                   initialValues={{
                       username: '',
                       password: '',
                   }}
      
                   onSubmit={() => {
      
                   }}
               >
                   <Form className="border-solid border-2 p-3 text-center">
                    <label>From: </label>                       <Field type="text" id="departure" name="departure" placeholder="Departure" />
                       <label>To: </label>                       <Field type="text" id="destination" name="password" placeholder="Destination" />
                       <button type="submit" className="color-purple-600">Search Bus Lines</button>
                   </Form>
               </Formik>

       <div className="ml-2 mt-4 relative">
        <>    
           {
           buses.map(bus => {
            return(
                <div key={buses.id} className="w-full">
                    <Bus bus={bus} />
                </div>
            )
        })}
       
         </>
         </div>
         </div>
         </div>
         
    )
}

    export async function getStaticProps(){                     
     const response= await fetch('http://localhost:5196/all-bus-info')
        const data=await response.json()
        return{
            props:{
                buses:data,
            },
        }
    }
    // function handleOnSubmitSearch(e) {
    //   e.preventDefault();
    //   const destination = document.querySelector('#destination').value
    //   const departure = document.querySelector('#departure').value
    
    //   const endpoint = `http://localhost:5196/sepcific-bus-info??Departure=${destination}&Destination=${departure}`;
    
    //   updatePage({
    //     current: endpoint
    //   });
    // }

