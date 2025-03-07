import { GetPlaceDetails } from '@/service/GlobelApi'
import React, { useEffect, useState } from 'react'


const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSec ({ trip }) {

  const [photoUrl, setphotoUrl]=useState();
  const data = {
    textQuery: trip?.userSelection?.location?.label || "Guwahati, Assam"
  }
  console.log("Sending textQuery:", data.textQuery);
  const GetPlacePhoto = async () => {
    console.log("Requesting place details for:", data.textQuery);
    
    try {
      const result = await GetPlaceDetails(data);
      if (result) {
        console.log("API Response:", result.data.places[0].photos[3].name);
        const photo_url=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name)
        setphotoUrl(photo_url)
        console.log(photo_url)
      } else {
        console.warn("No data received from API.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };
  
  useEffect(() => {
    GetPlacePhoto() && trip
  }, [trip])

  return (
    <div>
      {/* this is infosec{trip.id} */}
      <img
        className='h-[350px] w-full  border-2 border-black object-cover rounded-xl'
        src={photoUrl} alt="🖼️⛓️‍💥 fail to load"
      />
      <div className='my-5 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl'>
          {trip?.userSelection?.location?.label}
        </h2>
        <div className='flex gap-5'>
          <h2 className='p-2 px-4 bg-gray-200  rounded-full'>
            {' '}
            📅 No of Days: <b>{trip?.userSelection?.noOfdays}</b>
          </h2>
          <h2 className='p-2 px-4 bg-gray-200 rounded-full'>
            {' '}
            💸 Budget: <b>{trip?.userSelection?.budget}</b>
          </h2>
          <h2 className='p-2 px-4 bg-gray-200 rounded-full'>
            {' '}
            🥂 No of People: <b>{trip?.userSelection?.travel_People_no}</b>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InfoSec
