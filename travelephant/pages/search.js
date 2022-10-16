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
                  setUserId(content.userId)
                  console.log(userId);
              } catch (e) {
                  setAuth(false);
              }
          }
      )();
  });

    return (
        <Layout auth={auth}>
        <div className='container'>
          <div className=" relative p-36 z-0">
             <div>
              <Formik
                   initialValues={{
                       username: '',
                       password: '',
                   }}
      
                   onSubmit={() => {
      
                   }}
               >
                
                   <Form className="block border-solid border-2 p-3 text-center" onSubmit={handleOnSubmitSearch}>
                    <img src="/travel.jpg" className="justify-center"></img>                      

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
               </div>
       <div className="ml-2 mt-4 relative w-full" id="bus-lines">  
           {
                buses.map(bus => {
                    return (
                        <div key={bus.id}>
                            <Bus  
                            id={bus.id}
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
                       <h1>Hello</h1>
                            <Bus 
                                id=${busline.id}
                                name=${busline.name}
                                departure=${busline.departure}
                                destination=${busline.destination}
                                departureTime=${busline.departureTime}
                                price=${busline.price}
                                />
                                <h1>Bye</h1>`
                       document.querySelector("#bus-lines").appendChild(node)
                   });
               }
               else {
                   document.querySelector("#bus-lines").innerHTML = "There are no bus lines!";
               }
           }
       
       


     