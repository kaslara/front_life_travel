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
                   <Form className="border-solid border-2 p-3 text-center" onSubmit={handleOnSubmitSearch}>
                        <label>From: </label>                       
                        <Field type="text" id="departure" name="departure" placeholder="Departure" />
                        <label>To: </label>                       
                        <Field type="text" id="destination" name="destination" placeholder="Destination" />
                        {/* <label>From time: </label> 
                        <Field type="time" id="destinationTime" name="destinationTime" />
                        <label>To time: </label> 
                        <Field type="time" id="departureTime" name="departureTime" /> */}
                        
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Search Bus Lines</button>
                   </Form>
               </Formik>

       <div className="ml-2 mt-4 relative w-full" id="bus-lines">  
           {
                buses.map(bus => {
                    return (
                        <div key={bus.id}>
                            <Bus bus={bus} />
                        </div>
                    )
                })
            }
            
         </div>
         </div>
         </div>
         
    )
}

    export async function getStaticProps(){                     
     const response = await fetch('http://localhost:5196/all-bus-info')
        const data = await response.json()
        return {
            props: {
                buses: data,
            },
        }
    }
    function handleOnSubmitSearch(e) {
      e.preventDefault();
      const destination = document.querySelector('#destination').value
      const departure = document.querySelector('#departure').value
      let endpoint = ''; 
      if(destination && departure) 
        endpoint = `http://localhost:5196/sepcific-bus-info?Departure=${departure}&Destination=${destination}`;
      else
        endpoint = 'http://localhost:5196/all-bus-info';
      fetch(endpoint)
      .then(res => res.json())
      .then((data) => {
        renderBusLines(data);
      })
    }

    function renderBusLines(data){
        if(data && data.length > 0) {
            document.querySelector("#bus-lines").innerHTML = "";
            data.forEach(busline => {
                var node = document.createElement('div');
                node.innerHTML = `
                    <a class=" block m-2 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bus Company: ${busline.name}</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">From: ${busline.departure}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">To: ${busline.destination}</p>
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Rezervo</button>
                    </a>`
                document.querySelector("#bus-lines").appendChild(node)
            });
        }
        else {
            document.querySelector("#bus-lines").innerHTML = "There are no bus lines!";
        }
    }

