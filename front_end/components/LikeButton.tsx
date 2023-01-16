import React, { useEffect, useState } from 'react';
import {  IoIosHeartDislike } from 'react-icons/io';
import { MdFavorite} from 'react-icons/md'
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';

interface IProps {
  likes: any;

  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes,  handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  




  useEffect(() => {
    if (filterLikes?.length > 0  ) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes ]);

  return (
    <div >
      <div className=' flex justify-between  cursor-pointer relative top-3 gap-14  px-[42px]'>
        {alreadyLiked ? (
         
             <div className='  rounded-xl bg-slate-400 p-[11px]  relative bottom-3 hover:bg-black hover:text-white' onClick={handleDislike} >
            < IoIosHeartDislike size={50} className='text-lg md:text-2xl' />
          </div>
        
         
        ) : (
          
             <div className=' rounded-xl bg-slate-400 p-[11px]  relative bottom-3  hover:bg-black hover:text-white' onClick={handleLike} >
            <MdFavorite size={50} className='text-lg md:text-2xl' />
          </div>
         
         
        )}
         <div className=' rounded-xl bg-slate-400 p-4 relative bottom-3'>
                      <p className='text-4xl font-semibold text-center '>{likes?.length || 0}</p>

         </div>
              
      </div>
    </div>
  );
};

export default LikeButton;