import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

import Post from './Post'

function Posts() {

    const DUMMY_DATA = [
        {
            id:123,
            username:"Minato",
            userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlPQL7v5qeqpS_uIUiTGTS7wsoYlNlK6hXEb__JRMO4-DH_d8bOm1kTYFSqwlm67gNuIE&usqp=CAU",
            img:"https://wallpaperaccess.com/full/337535.jpg",
            caption:"Sema Adi "

        },
        {
            id:134,
            username:"Kakashi Hatake",
            userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWo_hNYXIUCcnbyaTX8Tab0136jRkkEIjEosm7ybrtoWK0uOaSnTQbMwipD3xKpuxHNkU&usqp=CAU",
            img:"https://c4.wallpaperflare.com/wallpaper/323/362/539/naruto-akatsuki-hatake-kakashi-wallpaper-preview.jpg",
            caption:"Good Morning..."

        },
        {
            id:145,
            username:"Tobirama Senju",
            userImg:"data:image/jpeg;base64,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",
            img:"https://preview.redd.it/01j8n4nvfli71.jpg?width=1080&format=pjpg&auto=webp&s=23ee6ce7aa7e7f5a3dda65b2def0c9faedbab29c",
            caption:"Senju Bro's"

        }
    ]


    const [posts, setposts] = useState([]);

    useEffect(() => {
        const unsubscribe =  onSnapshot(query(collection(db,"posts"), orderBy("timestamps", "desc")), snapshot => {
            setposts(snapshot.docs)
        })


        console.log("edhu dha",unsubscribe.length)
        return unsubscribe;
    },[]);

    return (
        <div>
            {
                posts.map((post) => (
                    <Post 
                        id={post.id}
                        key={post.id}
                        username={post.data().username}
                        img={post.data().image}
                        userImg={post.data().profileImg}
                        caption={post.data().caption}
                    />
                ))
            }

            
        </div>
    )
}

export default Posts
