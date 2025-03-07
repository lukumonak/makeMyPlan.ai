import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/input'
import { AI_prompt, Selectbudgetlist } from '../../constants/options'
import { SelectTravelLinst } from '../../constants/options'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { FcGoogle } from 'react-icons/fc'
import { doc, setDoc } from 'firebase/firestore'
import { chatSession } from '@/service/Ai'
import { useGoogleLogin } from '@react-oauth/google'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
// import {mana} from '../../../public/mana.jpg'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import axios from 'axios'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Footer from '../custom/Footer'

function Plannerpage () {
  
  const [step, setStep] = useState(1)
  const [place, setplace] = useState()
  const [loading, setloading] = useState(false)
  const [alldata, setalldata] = useState([])
  
  const [openDaiulog, setopenDiaulog] = useState(false)
  const navigate = useNavigate()

  const ChatMessage = ({ message }) => {
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
      setDisplayedText(message)
    }, [])

    return (
      <div className='text-grey-500  flex flex-cols gap-6  font-sm border-red'>
        <div className='mt-10 border-3 border-red h-40 rounded-2xl shadow-xl p-5'>
          {displayedText}
        </div>
        <img className='h-90 w-50 inline-block' src='/mana.png' alt='mana' />
      </div>
    )
  }

  const handleinputchange = (name, value) => {
    setalldata({
      ...alldata,
      [name]: value
    })
   if(step<4){
    setStep(step+1);

   }
  }
  useEffect(() => {
    console.log('alldata',alldata)
  }, [alldata])

  const onGeneratedata = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      setopenDiaulog(true)
      //VVVVVVVVVVVV
      return
    }

    if (
      (alldata?.noOfdays > 5 && !alldata?.location) ||
      !alldata?.noOfdays ||
      !alldata?.budget ||
      !alldata?.travel_People_no
    ) {
      toast('fill all details correctly')
      return
    }

    setloading(true)
    console.log('st', alldata)
    const FINAL_AI_PROMPT = AI_prompt.replace(
      '{location}',
      alldata?.location?.label
    )
      .replace('{totalDays} ', alldata?.noOfdays)
      .replace('{traveler} ', alldata?.travel_People_no)
      .replace('{budget}', alldata?.budget)
      .replace('{total_days}', alldata.noOfdays)
    console.log(FINAL_AI_PROMPT)

    const result = await chatSession.sendMessage(FINAL_AI_PROMPT)

    const txt = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text

    // const obj = JSON.parse('txt',txt)
    console.log('data came', txt)
    SaveTrip(txt)

    setloading(false)
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => GetuserProfile(tokenResponse)
  })

  const GetuserProfile = token_info => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${token_info?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${token_info?.access_token}`,
            Accept: 'Application/json'
          }
        }
      )
      .then(resp => {
        console.log(resp)
        localStorage.setItem('user', JSON.stringify(resp.data))
        window.location.reload()
        setopenDiaulog(false)
        onGeneratedata()
      })
  }

  const SaveTrip = async Trip_data => {
    setloading(true)
    const docID = Date.now().toString()
    const user1 = JSON.parse(localStorage.getItem('user'))
    await setDoc(doc(db, 'AI_trips', docID), {
      id: docID,
      userSelection: alldata,
      trip_data: JSON.parse(Trip_data),
      userEmail: user1.email
    })
    console.log('datatype of ', typeof Trip_data)
    setloading(false)
    navigate('/view-trip/' + docID)
  }

  return (
    <>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 inline-block'>
        {step === 1 && (
          <ChatMessage
            message={
              <>
                Hello! I’m Ana, <br /> your AI Tour Guide 🌍✨. I’m here to help
                you plan the perfect trip—whether you're looking for adventure,
                relaxation, or hidden gems! 🚀 Select your favorite place below!
                🌍✨
              </>
            }
            onComplete={() => console.log('Message completed')}
          />
        )}
        {step === 1 && (
          <div className='mt-10'>
            <h2 className='font-bold text-xl  mb-3'>
              Which amazing destination would you like to explore? 🌍✨
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: v => {
                  setplace(v)
                  handleinputchange('location', v)
                }
              }}
            />
          </div>
        )}

        {step === 2 && (
          <ChatMessage
            message={
              <>
                Cool! <b>{alldata.location?.label}</b> sounds like an amazing
                choice! 🌟 How many days are you planning to stay? 🗓️✨
              </>
            }
          />
        )}

        {step === 2 && (
          <div className='mt-12'>
            <h2 className='font-bold text-xl '>
              Please select no of days you plane for ?
            </h2>
            <Input
              placeholder={'Ex: 3  (in between 1-5)'}
              type='number'
              onChange={e => {
                handleinputchange('noOfdays', e.target.value)
              }}
            />
          </div>
        )}

{step === 3 && <ChatMessage message={
  <>
Nice! 🌟 Spending <b>{alldata.noOfdays}</b> days in <b>{alldata.location?.label}</b> sounds like a fantastic plan! 🏝️✨    Cool! 🎉 Now, let's set your budget.
</>
} />}

        {step === 3 && (
          <div className='mt-12'>
            <h2 className='font-bold text-xl '>
           Please Choose Budget for the trip?
            </h2>
            <div className='grid grid-cols-3 gap-5 mt-10'>
              {Selectbudgetlist.map((element, index) => (
                <div
                  className={`p-4 border rounded-lg hover:shadow-lg
            rounded-lg hover:shadow-lg 
            ${alldata?.budget == element.title && 'shadow-lg border-black'}
            
            `}
                  onClick={() => handleinputchange('budget', element.title)}
                  key={index}
                >
                  <h2 className='text-3xl'>{element.icon}</h2>
                  <h2 className='font-bold text-lg'>{element.title}</h2>
                  <h2 className='font-sm text-grey-500'>{element.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

{step === 4 && <ChatMessage message="Awesome! 🌟 How many travel buddies will be joining you on this adventure? 👥✨" />}
{step === 4 && (
          <div className='mt-12'>
            <h2 className='font-bold text-xl '>
              Select travel group catagory
            </h2>
            <div className='grid grid-cols-3 gap-5 mt-10'>
              {SelectTravelLinst.map((element, index) => (
                <div
                  className={`p-4 border rounded-lg hover:shadow-lg
        ${
          alldata?.travel_People_no == element.people &&
          'shadow-lg border-black'
        }
        `}
                  onClick={() => {
                    handleinputchange('travel_People_no', element.people)
                  }}
                  key={index}
                >
                  <h2 className='text-3xl'>{element.icon}</h2>
                  <h2 className='font-bold text-lg'>{element.title}</h2>
                  <h2 className='font-sm text-grey-500'>{element.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

       
          <div className='my-10 justify-end flex'>
            <Button disabled={loading} onClick={onGeneratedata}>
              {loading ? (
                <AiOutlineLoading3Quarters className='h-8 w-8 animate-spin' />
              ) : (
                'Generate Trip'
              )}
            </Button>
          </div>
      

        <Dialog open={openDaiulog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src='/logo1.svg' />
                <h2 className='font-bold text-lg mt-7'>Sign in With Google </h2>
                <p>Sign in to the App With Google Authentication securly</p>

                <Button
                  className='mt-6 p-5 flex gap-4 items-center w-full'
                  onClick={() => login()}
                >
                  {' '}
                  <FcGoogle className='size-6' />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  )
}

export default Plannerpage
