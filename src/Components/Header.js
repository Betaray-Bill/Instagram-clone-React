import React from 'react'
import { SearchIcon,PlusCircleIcon,UserGroupIcon,HeartIcon,PaperAirplaneIcon,MenuIcon,HomeIcon } from '@heroicons/react/outline'

function Header() {
    return (
        <div>
            <div className="shadow-sm border-b bg-white sticky top-0 z-50">
                <div className="flex justify-between items-center max-w-6xl h-24 mx-5 xl:mx-auto">

                    {/* Left */}
                    <div className="relative hidden lg:inline-grid  w-24 cursor-pointer">
                        <img src="https://links.papareact.com/ocw" alt=""/>
                    </div>

                    <div className="relative inline-grid lg:hidden  w-10 flex-shrink-0 cursor-pointer">
                        <img src="https://links.papareact.com/jjm" alt="" />
                    </div>

                    {/* Middle */}
                    <div className="max-w-xs">
                        <div className="relative flex items-center mt-1 p-3 rounded-md">
                            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-500"/>
                            </div>
                            <input 
                                type="text" name="" placeholder="Search" 
                                id=""
                                className="bg-gray-100 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"    
                            />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex justify-end items-center space-x-4">
                        <HomeIcon className="hidden h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out "/>
                        <MenuIcon className="h-6 w-10 md:hidden cursor-pointer"/>
                        <div className="relative hidden h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out">
                            <PaperAirplaneIcon className="realtive hidden h-8 md:inline-flex rotate-45 cursor-pointer hover:scale-125 transition-all duration-100 ease-out"/>
                            <div className="absolute -top-2 -right-1 animate-bounce bg-red-500 rounded-full flex justify-center items-center p-2 text-white w-5 h-5">
                                4
                            </div>
                        </div>
                        <PlusCircleIcon className="hidden h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out "/>
                        <UserGroupIcon className="hidden h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out "/>
                        <HeartIcon className="hidden h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out "/>

                        <img 
                            src="https://lh3.googleusercontent.com/ogw/ADea4I5c1ORZj4OY-xMtoYuQouuHkzFj5VwtnUTQVNsTzQ=s32-c-mo" 
                            alt="Profile" 
                            className="rounded-full h-10 cursor-pointer"            
                        />
                    </div>

                </div>

            </div>
            <div className="absolute h-10 shadow-sm border-t pt-1 bg-white w-full bottom-0 md:hidden">
                <div className="relative flex justify-between items-start mx-2">
                    <HomeIcon className="h-8 w-10 cursor-pointer"/>
                    <div className="relative h-8 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-100 ease-out">
                        <PaperAirplaneIcon className="relative h-8 md:inline-flex rotate-45 cursor-pointer hover:scale-125 transition-all duration-100 ease-out"/>
                        <div className="absolute -top-2 -right-1 animate-bounce bg-red-500 rounded-full flex justify-center items-center p-2 text-white w-5 h-5">
                            4
                        </div>
                    </div>
                    <PlusCircleIcon className="h-8 w-10 cursor-pointer"/>  
                    <UserGroupIcon className="h-8 w-10 cursor-pointer"/>
                    <HeartIcon className="h-8 w-10 cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default Header
