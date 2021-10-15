function MiniProfile() {
    return (
        <div className="flex justify-between items-center mt-14 ml-10">
            <img 
                src="https://i.pinimg.com/750x/44/e2/e8/44e2e8015048d531deb4e96333ba3ecc.jpg" 
                alt="" 
                className="rounded-full border p-[2px] w-16 h-16 object-cover"
            />

            <div className="flex-1 mx-4">
                <h2 className="font-bold">Itachi</h2>
                <p className="text-sm text-gray-400">Welcome</p>
            </div>

            <button className="text-blue-400 text-sm font-semibold">Sign Out</button>

        </div>
    )
}

export default MiniProfile
