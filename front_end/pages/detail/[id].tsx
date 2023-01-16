import React, { useState  , useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {AiFillBackward} from "react-icons/ai"
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import { motion } from "framer-motion"





export default function Details({postDetails}:any) {
 const [post , setPost] = useState(postDetails)

 const router = useRouter()

 const {userProfile}:any = useAuthStore()


 const handleLike = async (like: boolean) => {
  if (userProfile) {
    const res = await axios.put(`http://localhost:3000/api/like`, {
      userId: userProfile._id,
      postId: post._id,
      like
    });
    setPost({ ...post, likes: res.data.likes });
  }
};



if(!post) return null

  
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>

   
    <div className=' w-[1200px] h-[1000px] bg-blend-color  flex justify-center items-center  ml-[20%] ' >
        <p className=' cursor-pointer '  onClick={()=> router.back()}>
            <AiFillBackward className='p-3 pl-2 text-slate-700 hover:bg-slate-700 hover:text-white rounded-full text-[70px] m-1'></AiFillBackward>
          </p>
      <div className=' flex  bg-slate-300 p-10 pt-2 rounded-2xl flex-col  items-center'>
        <h3 className=' text-3xl p-2'>{post.title}</h3>
        <img src={post.image.asset.url} className="max-w-[650px] max-h-[700px] float-none" alt="main zdiecie" />
      </div>
      <div className=' m-4 bg-slate-300 p-8 relative bottom-28 rounded-2xl'>
        <div className=' bg-slate-400 p-2 rounded-lg  justify-center items-center flex gap-4'>
           <p className=' float-right text-xl '> {post.name.userName}</p>
        <img src={post.name.image} alt="prof"  className=' w-16  rounded-md'/>
        </div>
        <div className=' bg-slate-400 mt-5 p-3 rounded-md  '>
           <h2 className=' text-2xl font-semibold '>
        Description 
        </h2>
        <p className=' w-52 p-3 '>{post.description}</p>
        </div>

        
       
      </div>

      <div className=' relative top-40 right-[311px] rounded-2xl p-3 bg-slate-300  px-4 '>
                {userProfile && <LikeButton
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />}
              </div>
              
    </div>
    </motion.div>
  )
}



export const getServerSideProps =async ({params : {id}} :{params:{id:string}}) => { 
    const { data } = await axios.get(`http://localhost:3000/api/post/${id}`)
  
    return{
      props : {postDetails: data}
    }
  
    
  }