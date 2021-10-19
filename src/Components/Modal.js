import { useRecoilState } from "recoil"
import { modalstate } from "../atoms/modalAtom"
import {Dialog, Transition } from  "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline"
import {db, storage} from "../firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore"
import { ref, getDownloadURL, uploadString } from "@firebase/storage"

function Modal({user}) {

    const [open, setopen] = useRecoilState(modalstate)
    const [selectedfile, setselectedfile] = useState(null)
    const [loading, setloading] = useState(false)

    const filePicker = useRef(null)
    const captionRef = useRef(null)

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setselectedfile(readerEvent.target.result)
        }
        console.log(selectedfile)
    }

    const uploadPost = async() => {
        if (loading) return;

        setloading(true)
        const docRef = await addDoc(collection(db, "posts"), {
            username:user.displayName,
            captoin:captionRef.current.value,
            profileImg:user.photoURL,
            timestamps: serverTimestamp()
        })
        console.log("New document added : ",docRef.id)

        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imageRef, selectedfile, "data_url").then(async snapshot => {
            const downloadedUrl = await getDownloadURL(imageRef)

            await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadedUrl
            })
        })


        setopen(false);
        setselectedfile(null);
        setloading(false);
    }   

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-50 inset-0 overflow-y-hidden"
                onClose={setopen}    
            >
                <div className="flex items-center justify-center min-h-[800px] 
                    sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-200"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition"
                        />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203asd
                    </span>

                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-200  translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pb-5 pt-5 text-left 
                        overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>   
                                <div
                                    onClick={() => filePicker.current.click()}
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer "
                                >
                                    <CameraIcon 
                                        className="h-6 w-6 text-red-600 hover:text-black transition duration-200"
                                        aria-hidden="true"
                                    />
                                </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h2"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                             Upload a Photo
                                        </Dialog.Title>

                                        <div>
                                            <input 
                                                type="file" 
                                                hidden
                                                ref={filePicker}
                                                onChange={addImageToPost}    
                                            />
                                        </div>

                                        <div className="mt-2">
                                                <input 
                                                    type="text" 
                                                    ref={captionRef}
                                                    className="border-none focus:ring-0 w-full text-center"
                                                    placeholder="Enter a caption..."
                                                />
                                        </div>
                                    </div>            
                               

                                <div className="mt-5 sm:mt-5">
                                    <button
                                        type="button"
                                        disabled={!selectedfile}
                                        className="inline-flex justify-center w-full rouned-lg overflow-hidden border border-transparent shadow-sm px-4 py-2 
                                                bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-offset-2
                                                focus:ring-red-600 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                                onClick={uploadPost}
                                    >
                                       {loading ? "Uploading...." : "Upload Post"}                                      
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
