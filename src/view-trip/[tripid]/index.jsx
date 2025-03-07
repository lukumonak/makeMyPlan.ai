import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '@/service/firebaseConfig'
import { toast } from 'sonner'
import InfoSec from './components/InfoSec'
import { Hotel } from 'lucide-react'
import Hotelinfo from './components/HoteInfo'
import Itianary from './components/Itianary'
import Footer from '@/components/custom/Footer'

function Viewtrip () {
  const { tripid } = useParams()
  const [trip, settrip]=useState([])

  useEffect(()=>{
    tripid&&GetData()
  },[tripid])

  const GetData = async () => {
    const docRef = doc(db, 'AI_trips', tripid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('document from firebase', docSnap.data())
      settrip(docSnap.data())
    } else {
      console.log('error')
      toast('No trip found')
    }
  }
  return(
  <div className='p-10 md:px-20 lg:px-44 xl:px-55'>
  <InfoSec trip={trip}/>
  <Hotelinfo trip={trip} />
  <Itianary trip={trip} />
  <Footer/>

  </div>

  )
}

export default Viewtrip
