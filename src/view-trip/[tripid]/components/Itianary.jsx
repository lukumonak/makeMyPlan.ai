import React from 'react';

function Itianary({trip}) {
  return (
    <div className='mt-6'>
        <h2 className='font-bold  text-xl mt-10'>Your Day by Day Plans 🤔</h2>
        {trip?.trip_data?.itinerary &&Object.entries(trip.trip_data.itinerary).map(([day,places],idx)=>(
                <div className=' bg-gray-300 p-2 mt-3 pl-6 rounded-md'>
            <div key={idx}  >
                <h2><b>Day{idx+1}</b></h2>
                    {
                     places.map((place,i)=>(
                       <div key={i} >
                        

                         <li>{place.placeName}</li>
                       </div>

                     ))
                    }
                </div>
                 
            </div>

        ))}
      
    </div>
  );
}

export default Itianary;







