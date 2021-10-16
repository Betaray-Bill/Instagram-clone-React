import { getAuth, signOut } from "firebase/auth";

function MiniProfile({ user }) {

    const auth = getAuth()
    const sign_Out = () => {
        signOut(auth)
    }


    return (
        <div className="flex justify-between items-center mt-14 ml-10">
            <img 
                src={user.photoURL ? user.photoURL : `https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png`} 
                alt="" 
                className="rounded-full border p-[2px] w-16 h-16 object-cover"
            />

            <div className="flex-1 mx-4">
                <h2 className="font-bold">{user.displayName}</h2>
                <p className="text-sm text-gray-400">Welcome</p>
            </div>

            <button className="text-blue-400 text-sm font-semibold hover:bg-blue-400  hover:text-white  px-4 py-2 rounded-md transition-all duration-150 ease-out" onClick={sign_Out}>Sign Out</button>

        </div>
    )
}

export default MiniProfile
