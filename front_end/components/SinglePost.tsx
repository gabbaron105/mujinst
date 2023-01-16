import React from 'react'
import {useEffect , useState} from "react"
import { client } from '../utils/client'
import {IoIosArrowDown , IoIosArrowUp} from "react-icons/io"
import { render } from 'react-dom';
import Link from 'next/link';


export default function SinglePost() {
     
  const [postData, setPost] = useState<any>(null);

  const [open , setopen] = useState(false)



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



 
  //  console.log(postData)

   

   
  return (
    <div className='flex flex-col justify-center items-center mb-6'> 
       
     
      {postData && postData.map((post:any) => (


        <div key={post._id} className='fulScrin flex flex-col justify-center items-center w-[46%]  mt-16 rounded-xl shadow-2xl shadow-gray-300 bg-slate-300 '>
        <div className=' p-8 pb-2'>

        <Link href={`/profile/${post.name._id}`}>
              <div className=' flex flex-row gap-3 font-semibold pb-2 items-center cursor-pointer '>
            <img className=' w-12 h-12 rounded-2xl' src={post.name?.image} alt="zd profilowe" />
              <p>{post.name?.userName}</p>
          </div>
        </Link>
    

          
          <div className=' mt-2 border-t-2  border-slate-200 text-center  cursor-pointer '>
          <Link href={`detail/${post._id}`}>   
          <div>
             <p className=' font-semibold text-xl my-2'>{post.title}</p>
            <img className='w-[420px] h-auto  shadow-gray-700 shadow-md' src={post.image.asset.url} alt="main zds" />
          </div>
           
          </Link>
            {open ? (
              <div className='ml-2 pt-2 max-w-[400px] items-center justify-center '>
                <p className='  p-3'>{post?.description}</p>
              <button onClick={() => setopen(!open)}>
              <IoIosArrowUp size={35}></IoIosArrowUp>
            </button>
            </div>
            ):(
              <div className=' pt-2'>
                <button onClick={() => setopen(!open)}>
                <IoIosArrowDown size={35}></IoIosArrowDown>
              </button>
              </div>
              
            )}
         

            
          
            
          </div>
           
        </div>


        
      </div>

      ))}
    

    </div>
   
  )
}
