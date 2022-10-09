function Bus({bus}){
    return (
       <a class=" block m-2 p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bus Company: {bus.name}</h5>
         <p class="font-normal text-gray-700 dark:text-gray-400">From: {bus.departure}</p>
         <p class="font-normal text-gray-700 dark:text-gray-400">To: {bus.destination}</p>
       </a>
    )
}
export default Bus
