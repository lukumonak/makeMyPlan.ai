import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'

function Header () {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse)
  })

  const [isuser, setisUser] = useState()

  const isuserexist=localStorage.getItem('user')
  // const name=JSON.parse(isuserexist).name
// 
  const usser = () => {
    // console.log(name)
    if(isuserexist==null ){
      setisUser(false)
   }
   else{
    setisUser(true)
   }
  }
useEffect(()=>{
usser()
},[isuser])
  return (
    <div className='p-3 shadow-sm flex justify-between item-center'>
      <img src='/ig.svg' />
      <div>
        {!isuser? <Button onClick={() => login()}>sign in</Button>:<><b>{JSON.parse(isuserexist).name}</b></>}
      </div>
    </div>
  )
}

export default Header
