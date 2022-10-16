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

