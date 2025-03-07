import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Plannerpage from './components/pages/Plannerpage'
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripid]/index.jsx'
import Footer from './components/custom/Footer'

const router=createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },

  {
    path:'/planner',
    element: <Plannerpage/>
  },

  {
    path:'/view-trip/:tripid',
    element:<Viewtrip />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLINT_ID}>

     <Toaster />
    <Header/>
   <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
