import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query;

    const PostQuery = searchPostsQuery(searchTerm);

    const posts = await client.fetch(PostQuery);

    console.log(searchTerm)
    res.status(200).json(posts);
  }
}


const searchPostsQuery = (searchTerm: string | string[]) => {
    const query = `*[_type == "post" && title match '${searchTerm}*' || description match '${searchTerm}*'] {
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
        description,
        likes
    }`;
    return query;
  };