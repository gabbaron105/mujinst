import React , {useState , useEffect}from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { client } from '../../utils/client'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {motion} from "framer-motion"
import { AiOutlineBackward } from 'react-icons/ai'


export default function Search({posts} : {posts:any}) {
  const [userData, setUserData] = useState<any>(null);

 const router = useRouter()

  useEffect(() => {
    client
      .fetch(
        `*[_type == "user"]{
            userName,
            image,
            UserId,
            _id


      }`
      )
      .then((data:any) => setUserData(data))
      .catch(console.error);
   }, []);
  console.log(posts)
const {searchTerm}:any = router.query
  
   const searchedAccounts = userData?.filter((user: any) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));


   

    console.log(searchedAccounts)
   
    
    return(
      <GoogleOAuthProvider clientId="866804697821-j3ahvi1ud4ukc1k4fluiuf91r8fse2qv.apps.googleusercontent.com">

      
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}} exit={{opacity:0}}>
        <Navbar></Navbar>
        <SideBar></SideBar>


        <button type="button" className=' hover:border-gray-400 hover:border-x-2 relative top-[115px] text-2xl font-semibold rounded-2xl left-[190px] p-[30px] bg-slate-300'  onClick={() => router.back()}>
          <AiOutlineBackward size={54}></AiOutlineBackward>
        </button>

        <div className=' mx-[660px] mr-[300px] mt-[40pxpx] p-10 bg-slate-300 rounded-2xl text-center text-3xl font-semibold '>
       
          <p>
            {`To są wyniki wyszukiwń : ${searchTerm}`}
          </p>
        </div>

        <div className=' my-[100px] '>


          {searchedAccounts ?(
            <div>
               <p className=" relative left-[147px] top-7 text-xl font-semibold text-slate-700">Accounts</p>
                <div className=" bg-slate-700 p-[1px] mx-[427px]  ">

                </div>

            </div>
             
          ):(
            <div></div>
          )}

      
        {searchedAccounts?.map((user: any, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=" mx-[500px]  bg-slate-300  flex flex-wrap justify-between  items-center p-4 rounded-xl m-[80px]">
                   <div className=' '>
                    <img alt='user-profile' className=' rounded-xl w-[150px] ' src={user.image}/>
                  </div>
                    <div className=' '>
                      <p className=' text-3xl mx-6'>
                        {user.userName}
                      </p>
                     
                  </div>
                </div>
                 
              </Link>
            ))}

          <div className=' mx-[600px]  mt-[40px] p-3 bg-slate-300 rounded-2xl text-center text-xl font-semibold'>
                
                <p>
                  {`To są już wszyskie wyniki`}
                </p>
              </div>
     

    
           
           <div className=' my-10'>
             <p className=" absolute left-[450px]  text-xl font-semibold text-slate-700 ">Posts</p>
                <div className=" bg-slate-700 p-[1px] mx-[427px]  ">

                </div>
           </div>

    
         
      
           
            {posts.map((post:any ,idx:any)=>(

              <div key={idx} className=" mx-[500px]  bg-slate-300  flex flex-wrap justify-center items-center p-10 rounded-xl my-[100px]">
                    <Link  href={`http://localhost:3000/profile/${post.name._id}`}>
              <div className=' flex flex-row gap-3 font-semibold pb-2 items-center cursor-pointer mr-[260px]'>
            <img className=' w-12 h-12 rounded-2xl' src={post.name?.image} alt="zd profilowe" />
              <p>{post.name?.userName}</p>
            </div>
            </Link>

            <div className=' mt-2 border-t-2  border-slate-200 text-center   cursor-pointer '>

              
            <Link href={`http://localhost:3000/detail/${post._id}`}>   
            <div className=''>
              <p>{post.title}</p>
              <img className='w-[420px] h-auto  shadow-gray-700 shadow-md' src={post.image.asset.url} alt="main zds" />
            </div>
            
            </Link>
            </div>

                        
              </div>
              
          
                
            ))}
             <div className=' mx-[600px]  mt-[40px] p-3 bg-slate-300 rounded-2xl text-center text-xl font-semibold'>
                
                <p>
                  {`To są już wszyskie wyniki`}
                </p>
              </div>



            
     
          
        </div>
        </motion.div>
      </GoogleOAuthProvider>
    )

}



export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);
  
  return {
    props: { posts: res.data },
    
  };
};
