import React ,{useEffect,useState} from "react"
import axios from "axios"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import SideBar from "../../components/SideBar"
import { motion } from "framer-motion"
import { GoogleOAuthProvider } from '@react-oauth/google';


interface IProps{
    data:{
        user:any,
        userPost_a:any,
        userLikedPost_a:any
    }
}



const Profile = ({data}:IProps)=>{
    console.log(data)

    const {user , userPost_a } = data

    return(
      <GoogleOAuthProvider clientId="866804697821-j3ahvi1ud4ukc1k4fluiuf91r8fse2qv.apps.googleusercontent.com">

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>
          <Navbar></Navbar>
           <SideBar></SideBar>
           <div className=" ">
  

                <div className="relative mx-[27%]  top-16 px-0 bg-slate-300 rounded-2xl ">
                    <p className=" float-right relative right-[8%] text-white text-6xl top-14">{user.userName}</p>
                    <img src={user.image} className="rounded-full p-4 w-48" alt=" zd profilowe" />
                </div>


                <p className=" relative top-[140px] left-36 text-xl font-semibold text-slate-700">Posts</p>
                <div className=" bg-slate-700 p-[1px] mx-[427px] relative top-36 ">

                </div>

                <div className=" mx-[25%] mt-[10%]  p-8 ">
                     {userPost_a && userPost_a.map((post:any, idx:any)=>(

                    <Link key={idx} href={`/detail/${post._id}`} >
                      <div className=" cursor-pointer flex flex-col  p-14 pt-7   m-14 bg-slate-300  rounded-xl justify-center items-center  " >
                        <p className=" text-slate-700 text-2xl mb-4">{post?.title}</p>
                        <img className=" w-[450px] h-auto" src={post?.image.asset.url} alt="zd post" />
                            
                    </div>
                    </Link>
                  
                ))}
                </div>
             
           </div>
        


   
        </motion.div>
        </GoogleOAuthProvider>
    )
}



export const getServerSideProps = async ({
    params: { id },
  }: {
    params: { id: string };
  }) => {
    const res = await axios.get(`http://localhost:3000/api/profile/${id}`);
  
    return {
      props: { data: res.data },
    };
  };


export default Profile