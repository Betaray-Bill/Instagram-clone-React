import { addDoc, setDoc, doc, collection, deleteDoc, onSnapshot, orderBy, query, serverTimestamp } from "@firebase/firestore"
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import Moment from "react-moment"

function Post({ user, username, caption, id, userImg, img }) {
    const [comment, setcomment] = useState("")
    const [comments, setcomments] = useState([])
    const [likes, setlikes] = useState([])
    const [Has_liked, setHas_liked] = useState()

    
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts",id, "comments"), orderBy("timestamps", "desc")), snapshot => {
            setcomments(snapshot.docs)
        })
        return unsubscribe
    }, [db, id]);


    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "likes"), orderBy("timestamps", "desc")), snapshot => {
            setlikes(snapshot.docs)
        })
        return unsubscribe
    }, [db, id]);

    const like_post = async() => {
        if(Has_liked){
            await deleteDoc(doc(db, "posts", id,"likes",  user.uid))
            setHas_liked(false)
        }else{
            await setDoc(doc(db,"posts",id,"likes", user.uid), {
                username: user.displayName
            })
            setHas_liked(true)
        }
    }   


    useEffect(() => {
        setHas_liked(likes.findIndex(like => (
            like.id === user.uid !== -1
            )))

            console.log("Likes : ", likes.length)
    }, [likes])

    // console.log(user)
    const sendComment = async(e) => {
        e.preventDefault()

        const commenTosend = comment
        setcomment('')

        await addDoc(collection(db, "posts",id, "comments"),{
            comment: commenTosend,
            username: user.displayName,
            userImg : user.photoURL,
            timestamps:serverTimestamp()
        })
    }


    return (
        <div className="bg-white my-7 border rounded-lg h-auto">
            
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} alt="" className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold text-xl">{username}</p>
                <DotsHorizontalIcon className="h-5 transform rounded-full hover:bg-gray-300"/>
            </div>
            
            {/* Image */}
            <img src={img} alt="" className="w-full object-contain rounded-lg px-1 h-auto" />

            {/* Button */}
            <div className="flex justify-between items-center space-x-4 pt-4 px-4">
                <div className="flex justify-center items-center space-x-4">
                    {
                         !Has_liked ? 
                         <HeartIconFilled onClick={like_post} className="btn text-red-500 transform hover:scale-125 transition-all duration-150 ease-in-out"/> 
                         :
                         <HeartIcon onClick={like_post} className="btn transform hover:scale-125 transition-all duration-150 ease-in-out"/>
                    }
                    <ChatIcon className="btn transform hover:scale-125 transition-all duration-150 ease-in-out" />
                    <PaperAirplaneIcon  className="btn transform rotate-45 -pt-2 hover:scale-125 transition-all duration-150 ease-in-out"/>
                </div>
                <BookmarkIcon className="btn transform hover:scale-125 transition-all duration-150 ease-in-out"/>
            </div>

            {/* Caption */}
            <div className="p-5 truncate">
            {
                likes.length > 0 && (
                    <p className="font-bold">{likes.length} likes</p>
                )
            }
                <span className="font-bold mr-1">{username} </span>
                {caption}
            </div>

            {/* Comments */}
            {
                comments.length > 0 && (
                    <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        {
                            comments.map(comment => (
                                <div key={comment.id} className="flex items-center space-x-2 mb-3">
                                    <img
                                     src={comment.data().userImg} alt="" 
                                     className="h-7 rounded-full"
                                    />
                                    <p className="text-sm flex-1">
                                        <span className="font-bold">
                                        {comment.data().username}
                                        </span>{ " "}
                                        {comment.data().comment}
                                    </p>
                                    <Moment interval={1000} fromNow className="pr-5 text-xs">
                                        {comment.data().timestamp?.toDate()}
                                    </Moment>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {/* Form - Input Box */}
            <form className="flex justify-between items-center p-4">
                <EmojiHappyIcon className="btn transform hover:scale-125"/>
                <input 
                    type="text" 
                    className="border-none flex-1 focus:ring-0 outline-none" 
                    placeholder="Add a Comment..."
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                />
                <button 
                    className="font-semibold bg-gray-200 px-4 py-2 rounded-sm 
                    hover:bg-blue-200 hover:text-white transition-all duration-150 ease-in-out "
                    type="submit"
                    disabled={!comment.trim()}
                    onClick={sendComment}
                >
                    Post
                </button>
            </form>

        </div>
    )
}

export default Post
