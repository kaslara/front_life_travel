import Layout from "../components/Layout"
import {useEffect, useState} from "react";
import Image from "next/image";
import { Formik, Field, Form } from 'formik';

export default function Account(tickets) {
  const [auth, setAuth] = useState(false);
  const[username,setUsername]=useState('');
  const[name,setName]=useState('');
  const[surname,setSurname]=useState('');
  const[userId,setUserId]=useState('');
  const[address,setAddress]=useState(''); 


  
  useEffect(() => {
    (
        async () => {
            try {
                const response = await fetch('http://10.0.247.202/user', {
                    credentials: 'include',
                });

                const content = await response.json();
                console.log("ID");
                setUsername(content.username);
                setName(content.name);
                setUserId(content.userId);
                setAddress(content.address);
                setSurname(content.surname);
                setUserId(content.userID);
                console.log(userId);
                console.log({userId});
                handleOnSubmitSearch();
                
                setAuth(true);
            } catch (e) {
                setAuth(false);
            }
        }
    )();
});
 
  return (
<Layout auth={auth}>
  <div>
  <div className="m-2 relative flex items-center justify-center border-2 border-black-100 p-2">
    <Image
          src="/me.png"
          alt="Picture of the user"
          width={250}
          height={250}

    />
    <div className="m-10 ">
      <h1 className="text-xl font-medium text-indigo-400">Name: {name}</h1>
      <h2 className="text-xl font-medium text-indigo-400">Surname: {surname}</h2>
      <p className="text-md text-indigo-900">Address: {address}</p>
      <p className="text-md text-indigo-900">Username: {username}</p>
     </div> 

  </div>
  <div className="m-2">
    <h1 className="text-3xl font-medium text-indigo-300 justify-center flex">Tickets you reserved</h1>
    <div id="bus-lines">
      {
          
      }

    </div>
    
  </div>
  </div>
  
</Layout>
  )
  function handleOnSubmitSearch(e) {
    let endpoint = ''; 
    if (!username){
      return;
    }
    endpoint = `http://10.0.247.202/get-tickets?Username=${username}`;
    fetch(endpoint)
    .then(res => res.json())
    .then((data) => {
      renderTickets(data);
    })
  }

}


function renderTickets(data){
    if(data && data.length > 0) {
        document.querySelector("#bus-lines").innerHTML = "";
        data.forEach(ticket => {
            var node = document.createElement('div');
            node.innerHTML = `
                <a class=" block m-2 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-normal text-gray-700 dark:text-gray-400">From: ${ticket.departure}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">To: ${ticket.destination}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Price: ${ticket.name}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Price: ${ticket.surname}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Price: ${ticket.active}</p>
                </a>`
            document.querySelector("#bus-lines").appendChild(node)
        });
    }
    else {
        document.querySelector("#bus-lines").innerHTML = "There are no reserved Tickets!";
    }
}

export async function getStaticProps(){                     
  const response = await fetch('http://10.0.247.202/get-all-tickets')
     const data = await response.json()
     return {
         props: {
             tick: data,
         },
     }
    }