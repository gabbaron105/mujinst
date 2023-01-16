import React  from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import { client } from '../utils/client';
import Link from 'next/link';
import {motion} from "framer-motion"
import { BiAdjust } from 'react-icons/bi';

export default function Searchfild() {

    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const [postData, setPost] = useState<any>(null);
  
  
  
     useEffect(() => {
      client
        .fetch(
          `*[_type == "post"]{
          _id,
          title,
          image{
            asset->{
              url
            }
          },
          "name" : postedBy->{
            userName,
            image,
            _id
            
          },
          UserId,
          description
        }`
        )
        .then((data:any) => setPost(data))
        .catch(console.error);
        
        
     }, []);
  


    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        
        if(searchValue) {
          router.push(`/search/${searchValue}`);
        }
      };
    return (
    <GoogleOAuthProvider clientId="866804697821-j3ahvi1ud4ukc1k4fluiuf91r8fse2qv.apps.googleusercontent.com">

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>

      <Navbar></Navbar>
      <SideBar></SideBar>


        <div className=' sticky top-9'>
        <form
          onSubmit={handleSearch}
          className=' absolute right-[500px] top-[90px]'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary  p-5 text-xl font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-500 w-[500px] hover:border-gray-300  rounded-full '
            placeholder='Search accounts and Post'
          />
          <button
            onClick={handleSearch}
            className=' relative right-[65px] bottom-[9px] bg-gray-700 p-7 rounded-full hover:bg-gray-400 border-gray-200'
          >
            
          </button>
        </form>


        

        </div>
        <div className=' flex flex-wrap  mt-52 gap-10 mx-[400px]'>
              {postData && postData.map((post:any , idx:number) => (
            <div key={idx} className = " bg-slate-300 mt-[50px] p-8 rounded-2xl justify-center items-center">
                <Link href={`/profile/${post.name._id}`}>
              <div className=' flex flex-row gap-3 font-semibold pb-4 items-center cursor-pointer '>
            <img className=' w-12 h-12 rounded-xl' src={post.name?.image} alt="zd profilowe" />
              <p>{post.name?.userName}</p>
                </div>
                </Link>
                <Link href={`detail/${post._id}`}>   
          <div >
            
            <img className='w-[300px] h-auto cursor-pointer shadow-gray-700 shadow-md' src={post.image.asset.url} alt="main zds" />
          </div>
           
          </Link>
            </div>
        ))}
        </div>
      

    </motion.div>
    </GoogleOAuthProvider>
    

  )
}
