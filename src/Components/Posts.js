import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';


import Post from './Post'

function Posts({user}) {

    const [posts, setposts] = useState([]);

    useEffect(() => {
        const unsubscribe =  onSnapshot(query(collection(db,"posts"), orderBy("timestamps", "desc")), snapshot => {
            setposts(snapshot.docs)
        })

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
                        caption={post.data().captoin}
                        user={user}

                    />
                ))
            }

            
        </div>
    )
}

export default Posts
