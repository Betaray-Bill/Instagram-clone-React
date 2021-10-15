import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"


function Post({ username, caption, id, userImg, img }) {
    return (
        <div className="bg-white my-7 border rounded-md">
            
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} alt="" className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold text-xl">{username}</p>
                <DotsHorizontalIcon className="h-5 transform rounded-full hover:bg-gray-300"/>
            </div>
            
            {/* Image */}
            <img src={img} alt="" className="w-full object-contain rounded-md px-1" />

            {/* Button */}
            <div className="flex justify-between items-center space-x-4 pt-4 px-4">
                <div className="flex justify-center items-center space-x-4">
                    <HeartIcon className="btn transform hover:scale-125 transition-all duration-150 ease-in-out"/>
                    <ChatIcon className="btn transform hover:scale-125 transition-all duration-150 ease-in-out" />
                    <PaperAirplaneIcon  className="btn transform rotate-45 -pt-2 hover:scale-125 transition-all duration-150 ease-in-out"/>
                </div>
                <BookmarkIcon className="btn transform hover:scale-125 transition-all duration-150 ease-in-out"/>
            </div>

            {/* Caption */}
            <div className="p-5 truncate">
                <span className="font-bold mr-1">{username} </span>
                {caption}
            </div>

            {/* Comments */}

            {/* Form - Input Box */}
            <form className="flex justify-between items-center p-4">
                <EmojiHappyIcon className="btn transform hover:scale-125"/>
                <input type="text" className="border-none flex-1 focus:ring-0 outline-none" placeholder="Add a Comment..."/>
                <button className="font-semibold bg-gray-200 px-4 py-2 rounded-sm hover:bg-blue-200 hover:text-white transition-all duration-150 ease-in-out ">Post</button>
            </form>

        </div>
    )
}

export default Post
