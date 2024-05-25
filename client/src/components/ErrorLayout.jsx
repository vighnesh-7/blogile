import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiMessageError } from "react-icons/bi";
import {useNavigate , useRouteError} from 'react-router-dom'
import errorVideo from '../assets/error404.mp4'


function ErrorLayout() {
    let navigate  = useNavigate();
    let routingError = useRouteError()


    return (
        <div className='relative' >
            <div className='h-screen  '>
                <video loop autoPlay className=' h-screen w-full'  >
                    <source src={errorVideo} type='video/mp4' />
                    {/* else */}
                    Your browser doesnt support the video tag
                </video>
            </div>
            <div className=' fixed top-0 left-1/4'>
                <div className='  w-auto flex items-center justify-center '>
                    <h1 className='text-danger flex text-center mt-5 text-5xl fw-medium '>&nbsp;<BiMessageError className='h-12 -mb-12 mt-0 w-12 text-red-600 align-bottom inline-block ' />{routingError.status} - {routingError.data} </h1>
                </div>
                <div className='w-full absolute m-auto flex justify-center '>
                    <button onClick={()=>navigate('/')} className='flex hover:text-blue-700 mt-4 font-semibold text-lg justify-center items-center  bg-red-300   p-1 px-3 rounded-2xl '>
                        Get back to Home page &nbsp; <RiArrowGoBackFill className='w-6 h-6 text-red-700' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorLayout