import React from 'react'
import { useEffect ,useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {   SanityImageAssetDocument} from '@sanity/client'
import { ImFolderUpload} from "react-icons/im"

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'


function Upload() {

    const router = useRouter()


    const [isLoading, ustIsLoading] = useState(false)
    const [asset , setAsset] = useState<SanityImageAssetDocument | undefined>()
    const [WrongFileType , setWrongFileType] = useState(false)
    const [ title , setitle] = useState("")
    const [savingPost , setSavingPost] = useState(false)
    const [description , setDescription] = useState("")

    const { userProfile }: {userProfile:any} = useAuthStore()
 
    const uploadPhopto = async (e: any)=>{
        const selectedFile = e.target.files[0]
        const fileTypes = ['image/jpg ','image/jpeg','image/img','image/webp' ,"image/png"]

        if(fileTypes.includes(selectedFile.type)) {

            client.assets.upload("image" , selectedFile , {
                contentType : selectedFile.type,
                fileName: selectedFile.name,
                
            }).then((data:any)=>{
                setAsset(data)
                setWrongFileType(false)
                // console.log(asset)
            })

        } else {
            ustIsLoading(false)
            setWrongFileType(true)
        }
    }

    const handlePost = async ()=>{
        if(title && asset?._id && userProfile?._id){
            setSavingPost(true)

            const document = {
                _type: "post",
                title: title,
                image: {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: asset._id
                        }
                },

                userId: userProfile?._id,
                postedBy: {
                    _type: "postedBy",
                    _ref: userProfile?._id
                },
                description:description
            }
                

           

            await axios.post("http://localhost:3000/api/post" , document)
            router.push("/")
            console.log(asset)
            
        }
    }

  return (
    <div className=' flex mt-[20%]  ml-[20%] flex-col-moje'>
      {isLoading ? (
        <p className=' text-8xl'>Loading...</p>
      ):
      (
        <div className='' >
            {asset ? (
                <div className=' mar30Asset paf0mar0 p-14 justify-center items-center relative bottom-24 '>
                    <div className=' p-7   border-dotted border-2 rounded-3xl hover:shadow-2xl border-slate-400 shadow-lg shadow-slate-200 '>
                    <img src={asset.url} className="withmax h-96 w-auto max-w-sm" />
                    </div>
                    
                </div>
            ):(
                <div className='mar30 paf0mar0 m-20 mt-[-59%] py-48 border-dotted border-2 rounded-3xl hover:shadow-2xl border-slate-400 shadow-lg shadow-slate-200 justify-center items-center  '>
                     <label className='paf0mar0 p-44 px-80 cursor-pointer'>
                    <div className='paf0mar0 font-semibold  flex flex-col space-y-6 justify-center items-center'>
                        <ImFolderUpload size={40}></ImFolderUpload>
                        <p>Wybierz zdiecie</p><br />
                        <p>musi byc ona w </p><br />
                        <p>Odpowiednim formacie</p>
                

                    </div>
                    <input type="file" name='upload_photo' className='w-0 h-0 ' onChange={(e)=> {uploadPhopto(e)} }/>
                </label>
                </div>
               
            )}
        </div>       
        )}
        <div className=' paf0mar0 flex flex-col  items-center p-4 bg-slate-300 rounded-2xl px-40 relative bottom-72 space-y-7 pb-[50px] '>
            <label className=' p-3 pt-9 capitalize text-3xl'> title</label>
            <input type="text" value={title} onChange={(e)=>{setitle(e.target.value)}} className=" border-black-500  border-2 p-2 rounded-2xl"/> 
            <label className=' p-2 text-lg'>Description</label> 
            <textarea  value={description} maxLength={176} onChange={(e)=>{setDescription(e.target.value)}} className=" border-black-500  border-2  w-60 h-44 rounded-2xl p-4"/>
            <div className=' p-3 mt-10'>       
            <button onClick={handlePost} type="button" className='bg-white border-2 m-2 rounded-2xl p-3 hover:bg-slate-600 hover:text-white hover:border-green-600 '>Zatwierc</button>
            <button onClick={()=>{location.reload();}} type="button" className=' bg-white m-2 border-2 rounded-2xl  p-3  hover:bg-slate-600 hover:text-white hover:border-red-600 '>odrzuc</button>
            </div>
           

        {userProfile ? (
            <div>

            </div>
        ):(
            <div className=' relative bottom-24'>
                <p  className=' text-5xl text-red-500 font-extrabold'>zaloguj się</p>
            </div>
        )}
        {WrongFileType ? (
            <div className=' text-5xl text-red-500 font-extrabold'>Wrong File Type</div>
        ):(
            <div></div>
        )}

        </div>

    </div>
  )
}

export default Upload
