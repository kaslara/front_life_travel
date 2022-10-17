import { useRouter } from 'next/router'
import {useEffect, useState} from "react";

function Bus({id,name,departure,destination, departureTime,price}){
  const [userId, setUserId]=useState('');
const router = useRouter();
const [auth, setAuth] = useState(false);

useEffect(() => {
  (
      async () => {
          try {
              const response = await fetch('http://20.103.33.25/user', {
                  credentials: 'include',
              });

              const content = await response.json();

              setAuth(true);
              setUserId(content.userId)
          } catch (e) {
              setAuth(false);
          }
      }
  )();
});
async function reserveticket(e){
  e.preventDefault();
  if(auth==false){
    await router.push('/login');
  }
  else{
  let url=`http://10.0.247.202t/book-ticket?UserID=${userId}&Departure=${departure}&DepartureTime=${departureTime}`;
  const endpoint=url;
  const options={
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  
  }
  const response=await fetch(endpoint,options);
  console.log(response);
  }
}
    return (
      
       <a class="block md:m-1 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bus Company: {name}</h5>
         <p className="font-normal text-gray-700 dark:text-gray-400">From: {departure}</p>
         <p className="font-normal text-gray-700 dark:text-gray-400">To: {destination}</p>
         <p className="font-normal text-gray-700 dark:text-gray-400">Departure Time: {departureTime}</p>
         <p className="font-normal text-gray-700 dark:text-gray-400">Price: {price}</p>
         <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={reserveticket}>Rezervo</button>
        

       </a>
    )

}
export default Bus
