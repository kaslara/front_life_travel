import Layout from "../components/Layout"
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Account() {
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
                const response = await fetch('http://localhost:5196/user', {
                    credentials: 'include',
                });

                const content = await response.json();
                setUsername(content.username);
                setName(content.name);
                setUserId(content.userId);
                setAddress(content.address);
                setSurname(content.surname);
                setUserId(content.userID);
                
                
                setAuth(true);
            } catch (e) {
                setAuth(false);
            }
        }
    )();
});
 function getStaticProps(){       
  let endpoint=`http://localhost:5196/all-bus-info`;              
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
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Rezervo</button>
              </a>`
          document.querySelector("#bus-lines").appendChild(node)
      });
  }
  else {
      document.querySelector("#bus-lines").innerHTML = "There are no bus lines!";
  }
}
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
}

