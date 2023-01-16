import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {ImProfile} from "react-icons/im"
import {BiSearchAlt} from "react-icons/bi"
import {FiUploadCloud} from 'react-icons/fi'
import Link from 'next/link'

import useAuthStore from '../store/authStore'



interface ElementProps {
  target: string;
  title: string;
  children: JSX.Element
};

const Element = (props: ElementProps): JSX.Element => {
  return (
    <Link className='  inline-flex  rounded-lg px-2 pt-2' href={props.target}>
      <div className=' inline-flex dwoPxDown pt-3'>
        {props.children}
        <p className=' py-2  hide lx:hidden cursor-pointer '>{props.title}</p>
      </div>
    </Link>
  );
}


function Navbar() {

  const { userProfile }: {userProfile:any} = useAuthStore()
  


  return (
    <div className="w-full flex  justify-center items-cente border-gray-500 shadow-lg shadow-gray-300 bg-slate-300 sticky top-0 menuDown pb-3 ">
        <div className='inline-flex text-lg  mt-0 gap-14 gapZero' >


        <Element target='/' title='Main'>
          <AiOutlineHome className='mt-1' size={29} />
        </Element>

       

      {userProfile ? (
          <Link className='  inline-flex  rounded-lg px-2 pt-2' href={`/profile/${userProfile._id}`}>
          <div className=' inline-flex dwoPxDown pt-3'>
            <ImProfile size={25} className="mt-2"></ImProfile>
            <p className=' py-2  hide lx:hidden cursor-pointer '>profile</p>
          </div>
        </Link>

      ):(
        <div></div>
      )} 

    
      

        <Element target='/Searchfild' title='szykaj'>
          <BiSearchAlt className='mt-1' size={29} />
        </Element>

        <Element target='/upload' title='dodaj'>
          <FiUploadCloud className='mt-1' size={29} />
        </Element>
       


        
        </div>
    </div>
  )
}

export default Navbar
