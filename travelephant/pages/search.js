import Head from "next/head";
import Bus from '../components/bus'
import Navbar from '../components/Navbar'
import { Formik, Field, Form } from 'formik';
import { info } from "autoprefixer";
import { Link } from "react-scroll";
import Image from 'next/image'
import Layout from "../components/Layout"
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'


export default function Search({buses}) {

    const [auth, setAuth] = useState(false);
    const [userId,setUserId]=useState('');
    const [busId,setBusId]=useState('');
    const router = useRouter();

    useEffect(() => {
      (
          async () => {
              try {
                  const response = await fetch('http://localhost:5196/user', {
                      credentials: 'include',
                  });
  
                  const content = await response.json();
  
                  setAuth(true);
                  setUserId(content.UserID)
                  console.log(userId);
              } catch (e) {
                  setAuth(false);
              }
          }
      )();
  });

    return (
        <Layout auth={auth}>
        <div className='flex flex-col items-center p-4 space-y-4'>
          <div className="relative" >
             <div>
              <Formik
                   initialValues={{
                       username: '',
                       password: '',
                   }}
      
                   onSubmit={() => {
      
                   }}
               >
                
                   <Form className="flex flex-col rounded-lg border p-3 border-gray-200 shadow-md  text-center space-y-4 justify-around items-start p-0'" onSubmit={handleOnSubmitSearch}>
                    <img src="/travel.jpg" className="justify-center"></img>                      

                        <label>From: </label>                       
                        <Field type="text" id="departure" name="departure" placeholder="Departure" />
                        <label>To: </label>                       
                        <Field type="text" id="destination" name="destination" placeholder="Destination" />
                        <label>From time: </label> 
                        <Field type="number" id="destinationTime" name="destinationTime" />
                        <label>To time: </label> 
                        <Field type="number" id="departureTime" name="departureTime" />
                        
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Search</button>
                   </Form>
               </Formik>
               </div>
       <div className="ml-2 mt-4 relative w-full " id="bus-lines">  
           {
                buses.map(bus => {
                    return (
                        <div key={bus.id}>
                            <Bus  
                                id={bus.busId}
                                name={bus.name}
                                departure={bus.departure}
                                destination={bus.destination}
                                departureTime={bus.departureTime}
                                price={bus.price}
                            />
                        </div>
                    )
                })
            }
            
         </div>
         </div>
         </div>
         </Layout>
         
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
             const fromtime = document.querySelector('#destinationTime').value
             const totime = document.querySelector('#departureTime').value
             let endpoint = ''; 
             if(destination && departure) 
               endpoint = `http://localhost:5196/sepcific-bus-info?Departure=${departure}&Destination=${destination}&fromTime=${fromtime}&toTime=${totime}`;
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
                           <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Bus Company: ${busline.name}</h5>
                           <p class="font-normal text-gray-700 dark:text-gray-400">From: ${busline.departure}, Time: ${busline.departureTime}</p>
                           <p class="font-normal text-gray-700 dark:text-gray-400">To: ${busline.destination}, ${busline.arrivalTime}</p>
                           <p class="font-normal text-gray-700 dark:text-gray-400">Price: ${busline.price}</p>
                           <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Rezervo</button>
                           </a>`
                       document.querySelector("#bus-lines").appendChild(node)
                   });
               }
               else {
                   document.querySelector("#bus-lines").innerHTML = "There are no bus lines!";
               }
           }
       


     