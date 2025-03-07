import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function Header () {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => GetuserProfile(tokenResponse)
  })

  const GetuserProfile = token_info => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=$
  {token_info?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${token_info?.access_token}`,
            Accept: 'Application/json',
          }
        }
      )
      .then(resp => {
        console.log(resp)
        localStorage.setItem('user', JSON.stringify(resp.data))
        setisUser(resp.data)
      })
  }

  const [isuser, setisUser] = useState()

  const isuserexist = localStorage.getItem('user')
  // const name=JSON.parse(isuserexist).name
  //
  const usser = () => {
    // console.log(name)
    if (isuserexist == null) {
      setisUser(false)
    } else {
      setisUser(true)
    }
  }
  useEffect(() => {
    usser()
  }, [isuser])
  return (
    <div className='p-3 shadow-sm flex justify-between item-center'>
      <img src='/ig.svg' />
      <div>
        {!isuser ? (
          <Button onClick={() => login()}>sign in</Button>
        ) : (
          <>
            <b>{JSON.parse(isuserexist).name}</b>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
