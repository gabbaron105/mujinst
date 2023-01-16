import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import SinglePost from '../components/SinglePost';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {motion} from "framer-motion"



export default function Home( ) {
    
    return( 
      <GoogleOAuthProvider clientId="866804697821-j3ahvi1ud4ukc1k4fluiuf91r8fse2qv.apps.googleusercontent.com">

       <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>
        <Navbar />
        <SideBar></SideBar>
        <SinglePost></SinglePost>
      </motion.div>
      </GoogleOAuthProvider>
   
    
         
  )
}

