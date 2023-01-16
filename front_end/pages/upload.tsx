import React from 'react'
import Upload from '../components/Upload'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {motion} from "framer-motion" 


export default function uploadbar() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>

      
      <GoogleOAuthProvider clientId="866804697821-j3ahvi1ud4ukc1k4fluiuf91r8fse2qv.apps.googleusercontent.com">

         <Navbar></Navbar>
      <SideBar></SideBar>
     <Upload></Upload>
      </GoogleOAuthProvider>
     
    </motion.div>
  )
}
