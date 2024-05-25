import React, { useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { resetState } from '../redux/slices/userAuthorSlice'
import logo from '../assets/logo.png'


function NavBar() {

    let {loginUserStatus,currentUser}= useSelector(state  =>  state.userAuthorLoginReducer)


    let navigate = useNavigate();
    
    let dispatch = useDispatch()

    function signOut () {
        // remove token from local storage
        localStorage.removeItem('token')
        // call the reset state 
        dispatch(resetState())
    }

    //navigating to currentUser Profile
    function handleProfile(){
        if(currentUser.userType === 'author')
        {
            navigate(`/authorProfile/articles-by-author/${currentUser.username}`)
        }
        if(currentUser.userType === 'user') {
            navigate(`/userProfile`)
        }
    }

    return (
    <div>
        {
            loginUserStatus===false? 
            <>
            <ul className="nav grid grid-cols-3  bg-cyan-900 p-3 font-semibold fs-5  ">
                <div className=' col-span-2 flex justify-start'>
                    {/* blogile logo */}
                    <li>
                        <NavLink to=''>
                            <img src={logo} alt="logo" className='w-11 h-11 rounded-full ml-auto' />
                        </NavLink>
                    </li>
                </div>
                <div className=' justify-self-end flex col-span-1'>
                        {/* link to home */}
                        <li className="nav-item" >
                            <NavLink 
                            className="nav-link hover:text-sky-400  text-sky-500 
                            focus:text-red-500 focus:flex focus:flex-col focus:align-middle focus:row-auto focus:text-2xl focus:underline focus:underline-offset-4 focus:font-bold         
                            " to=''    >
                                Home
                            </NavLink>
                        </li>
                        {/* link to signup */}
                        <li className="nav-item"> 
                            <NavLink className="nav-link hover:text-sky-400   text-sky-500
                                focus:text-red-500 focus:flex focus:flex-col focus:align-middle focus:row-auto focus:text-2xl focus:underline focus:underline-offset-4 focus:font-bold  
                                " to='signup' >
                                SignUp
                            </NavLink>
                        </li>
                        {/* link to signin */}
                        <li className="nav-item">
                            <NavLink className="nav-link hover:text-sky-400   text-sky-500
                                focus:text-red-500 focus:flex focus:flex-col focus:align-middle focus:row-auto focus:text-2xl focus:underline focus:underline-offset-4 focus:font-bold  
                                " to='signin' >
                                SignIn
                            </NavLink>
                        </li>
                </div>
            </ul>
            </>
                :
                <>
                    <ul className='nav  flex items-center justify-end  bg-cyan-900 p-3 fw-medium fs-5'>
                        {/* <div className=' col-span-2 flex justify-start'>
                            <li>
                                <img src={logo} alt="logo" className=' w-11 h-11 rounded-full ml-auto' />
                            </li>
                        </div> */}
                            <div onClick={handleProfile}   className=' relative cursor-pointer  me-5 font-mono font-semibold'>
                                <div onClick={handleProfile}  className=' absolute bottom-7 -right-9 text-amber-500 cursor-pointer'>
                                    ({currentUser.userType})
                                </div>
                                <span onClick={handleProfile}  className='text-3xl font-bold text-emerald-400 cursor-pointer' >  {currentUser.username} </span>
                            </div>
                            {/* link to signout */}
                            <li className="nav-item  ">
                                <NavLink className="nav-link hover:text-sky-400 focus:text-sky-400  text-sky-500" to='signin'  onClick={signOut} >
                                    SignOut
                                </NavLink>
                            </li>
                    </ul>
                </>
        }
        </div>
    );
}

export default NavBar