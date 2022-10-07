function Bus({bus}){
    return (
        <>
        <div className="relative">
            <p>Bus Company: {bus.name}</p>
            <p>From: {bus.departure}</p>
            <p>To: {bus.destination}</p>
         </div>
         </>
    )
}
export default Bus
