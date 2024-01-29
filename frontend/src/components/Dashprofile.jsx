import { Alert, Button, TextInput } from 'flowbite-react';
import React,{useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/userSlice';

const Dashprofile = () => {
    const {currentUser} = useSelector(state => state.user);
    const [imagefile, setImagefile] = useState(null);
    const [imagefileURL, setImagefileURL] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [imaggeFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const filepickerRef = useRef();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImagefile(file);
            setImagefileURL(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if(imagefile) uploadImage();
    }, [imagefile]);
    
    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploading(true);
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imagefile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imagefile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageUploadError("Couldn't upload image (File must be less than 2MB)");
                setImageUploadProgress(null);
                setImagefile(null);
                setImagefileURL(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImagefileURL(downloadURL);
                    setFormData({...formData, profilePicUrl: downloadURL});
                    setImageFileUploading(false);
                })
            }

        )
    }

    const handleChane = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        setImageUploadError(null);
        if(Object.keys(formData).length === 0) {
            setUpdateUserError('No changes were made');
            return;
        }

        if(imaggeFileUploading) {
            setImageUploadError('Please wait for image to upload');
            return;
        }

        try {
            dispatch(updateStart());
            const userid = currentUser._id;
            const endpoint = `/api/user/update/${userid}`;
            const res = await fetch(endpoint,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if(!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }
            else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filepickerRef} hidden />
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full' onClick={() => filepickerRef.current.click()}>
                {imageUploadProgress && (
                    <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`}
                    strokeWidth={5} styles={{
                        root:{
                            width: '100%',
                            height: '100%',
                            position:'absolute',
                            top:'0',
                            left:'0',
                        },
                        path: {
                            stroke: `rgba(62,152,199, ${imageUploadProgress/100})`
                        }

                    }}/>
                )}
                <img src={ imagefileURL || currentUser.profilePicUrl} alt="user pic" className={`rounded-full text-center w-full h-full border-8 border-[lightgray] object-cover ${
                    imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'
                }`}/>
            </div>
            {imageUploadError && (
                <Alert color='failure'>
                    {imageUploadError}
                </Alert>
            )}
            <TextInput onChange={handleChane} type='text' id='username' placeholder='username'  defaultValue={currentUser.username}/>
            <TextInput onChange={handleChane} type='email' id='email' placeholder='email'  defaultValue={currentUser.email}/>
            <TextInput onChange={handleChane} type='password' id='password' placeholder='password'/>
            <Button type='submit' gradientDuoTone='greenToBlue' outline>Update</Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer hover:text-red-600'>Delete Account</span>
            <span className='cursor-pointer hover:text-red-600'>Log out</span>
        </div>
        {
            updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )
        }
        {
            updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )
        }
    </div>
  )
}

export default Dashprofile