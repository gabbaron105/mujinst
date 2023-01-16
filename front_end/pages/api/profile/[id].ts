import type { NextApiRequest, NextApiResponse } from 'next';




const singleUserQuery = (userId: string | string[]) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
  
    return query;
}
    
const userCreatedPostsQuery = (userId: string | string[]) => {
    const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
        _id,
        title,
        image{
          asset->{
            url
          }
        },
        "name" : postedBy->{
          userName,
          image
          
        },
        UserId,
        description
    }`;
  
    return query;
  };


//   const userLikedPostsQuery = (userId: string | string[]) => {
//     const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
//         _id,
//         title,
//         image{
//           asset->{
//             url
//           }
//           userId,
//         postedBy->{
//           _id,
//           userName,
//           image
//       },
//          likes,
//          description
//       }`;
  
//     return query;
//   };

import { client } from '../../../utils/client';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET"){
        const {id} = req.query

        const query = singleUserQuery(id)
        const userPost = userCreatedPostsQuery(id)
        // const userLikedPost = userLikedPostsQuery(id)

        
        const user = await client.fetch(query)
        const userPost_a = await client.fetch(userPost)
        // const userLikedPost_a= await client.fetch(userLikedPost)
        res.status(200).json({user: user[0], userPost_a,})
    }



  
}