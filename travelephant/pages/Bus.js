import Bus from '../components/bus'
import Navbar from '../components/Navbar'
export default function UserList({buses}){
    return (
        
  
        <>
        <div className='container'>
        <Navbar />
       
    
           {
           buses.map(bus => {
            return(
                <div key={buses.id}>
                    <Bus bus={bus} />
                </div>
            )
        })}
        </div>
         </>
         
    )
}

    export async function getStaticProps(){                     
    const response= await fetch('http://localhost:5196/sepcific-bus-info?Departure=Prishtine&Destination=Prizren')
    const data=await response.json()
    return{
        props:{
            buses:data,
        },
    }
}

