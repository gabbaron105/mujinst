import React from 'react'
import { useState , useEffect } from 'react';
import { client } from '../utils/client'
import {FaArrowAltCircleRight} from "react-icons/fa"
import { GoogleLogin , googleLogout  } from '@react-oauth/google';
import Link from 'next/link';
import { createOrGetUser } from '../utils/index';

import useAuthStore from '../store/authStore';
import {GrLogout} from "react-icons/gr"


export default function SideBar() {

    const [userData, setUserData] = useState<any>(null);


    const {userProfile , addUser , removeUser}:any = useAuthStore()


   useEffect(() => {
    client
      .fetch(
        `*[_type == "user"][0...5]{
            userName,
            image,
            UserId,
            _id


      }`
      )
      .then((data:any) => setUserData(data))
      .catch(console.error);
   }, []);


   


  return (

    


    <div className='justify-items-start float-left sticky top-24 hide '>

      <div>
        {userProfile ? (
          <div className=' items-center justify-center  flex flx-row p-4 bg-slate-300 m-3 rounded-xl  hover:bg-slate-400'>
            {userProfile?.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <div className=' mx-2'>
                <img className=' rounded-full cursor-pointer' src={userProfile?.image} alt="zd konta" width={45} height={45}/>
                </div>
              </Link>
              
            )}
              <div className='mx-2'>
                 <p>{userProfile.userName}</p>
              </div>
             
            <button type='button' className=' mx-2 hoverInRed hover:p-2 hover:mx-0 hover:rounded-full ' onClick={()=>{
              googleLogout(); removeUser()

            }}>
              <GrLogout fontSize={27}></GrLogout>
            </button>
          </div>
        ):(
          <div className=' items-center justify-center  flex flex-col p-4 bg-slate-300 m-3 rounded-xl  hover:bg-slate-400' >
            <h3 className=' mb-4 '>Log In</h3>
            <GoogleLogin onSuccess={(response) => createOrGetUser(response , addUser)} onError = {()=> console.log("error")}></GoogleLogin>
          </div>
          
        )}

      </div>



      <div className=' flex flex-col p-4 bg-slate-300 m-3 rounded-xl hide'>
        <h1 className=' p-2 text-xl font-semibold '>Konta które możesz znać</h1>
        
      {userData && userData.map((user :any) => (

        <Link href={`/profile/${user._id}`} key={user.UserId}>
          <div >
         <div className=' py-3 flex justify-between items-center cursor-pointer   hover:bg-slate-400 p-3 rounded-xl '>
            <img className=' w-12 h-12 rounded-md mr-4 ' src={user.image} alt={user.userName} width={45} height={45} />
            <h3 className=' mr-2 '>{user.userName}</h3>
            <FaArrowAltCircleRight  className= " hover:text-3xl text-2xl"></FaArrowAltCircleRight>
        </div>
        </div>
        </Link>

      
        ))}
      </div>  
    </div>
  )
}
