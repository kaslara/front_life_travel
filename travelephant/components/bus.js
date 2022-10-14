function Bus({bus}){
    return (
       <a class="block md:m-1 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bus Company: {bus.name}</h5>
         <p className="font-normal text-gray-700 dark:text-gray-400">From: {bus.departure}</p>
         <p className="font-normal text-gray-700 dark:text-gray-400">To: {bus.destination}</p>
         <p className="font-normal text-gray-700 dark:text-gray-400">Departure Time: {bus.departureTime}</p>
         <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={reserveticket}>Rezervo</button>
        

       </a>
    )
}
export default Bus
function reserveticket(e){
  

}
