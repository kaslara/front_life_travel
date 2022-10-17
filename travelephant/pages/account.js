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
                const response = await fetch('http://20.103.33.25/user', {
                    credentials: 'include',
                });

                const content = await response.json();
                setUsername(content.username);
                setName(content.name);
                setUserId(content.userId);
                setAddress(content.address);
                setSurname(content.surname);
                setUserId(content.userID);
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

    endpoint = `http://20.103.33.25/get-tickets?Username=${username}`;
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
                <p class="font-normal text-gray-700 dark:text-gray-400">Name: ${ticket.name}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Surname: ${ticket.surname}</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">Status: ${ticket.active}</p>
                </a>`
            var but = document.createElement('button'); 
            but.innerHTML = `
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Cancel ticket</button>`
                but.onclick = function(){
                  cancelticket()
                }
            document.querySelector("#bus-lines").appendChild(node)
            document.querySelector("#bus-lines").appendChild(but)

            async function cancelticket(){

              const content = await fetch('http://20.103.33.25/user', {
                            credentials: 'include',
                            });
                            const response = await content.json();
                            
              
                let endpoint = `http://20.103.33.25/cancel-ticket?TickedId=${ticket.id}`;
                fetch(endpoint, {
                  method: 'PUT'
                });
                
              }
        });
    }
    else {
        document.querySelector("#bus-lines").innerHTML = "There are no reserved Tickets!";
    }
}

export async function getStaticProps(){                     
  const response = await fetch('http://20.103.33.25/get-all-tickets')
     const data = await response.json()
     return {
         props: {
             tick: data,
         },
     }
}
