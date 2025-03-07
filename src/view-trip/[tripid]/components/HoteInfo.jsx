import React from 'react'

function HoteInfo ({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-10'>Hotel Recommendation</h2>

      <div className='grid grid-cols-1 md: grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
        {trip?.trip_data?.hotels?.map((element, index) => (
          <div key={index} className='hover:scale-105 cursor-pointer transition-all'>
            <img src='/placeholder.jpg' className='rounded-xl' />
            <div className='my-2  gap-2'>
              <h2 className='font-medium'> 🏨 {element?.hotelName}</h2>
              <h2 className='font-xs'> 📍 {element?.hotelAddress}</h2>
              <h2 className='font-sm'> 🏷️ {element?.priceRange}</h2>
              <h2 className='font-sm'> ⭐ {element?.rating}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HoteInfo
