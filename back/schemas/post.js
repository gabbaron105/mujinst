export default {
    name : 'post',
    title : 'Post',
    type : 'document',
    fields: [
        {
            name: 'title',
            title : 'Title',
            type: 'string'
        },
        {
            name: 'image',
            title : 'Image',
            type: 'image',
            options: {
                hotspot : true,
            }
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy',
        },
        {
            name: "description",
            title:"Description",
            type:"text"
        },
        {
            name: 'likes',
            title: 'Likes',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [{ type: 'user' }],
              },
            ],
        }

    ]

}