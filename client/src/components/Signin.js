    import React, { useEffect } from 'react'
    import './Signin.css'
    import {useForm} from 'react-hook-form'
    import toast from 'react-hot-toast';
    import {useDispatch , useSelector  } from 'react-redux'
    import {useNavigate,Link} from 'react-router-dom';
    
    
    import {userAuthorLoginThunk} from '../redux/slices/userAuthorSlice';


    function Signin() {

    let {register,handleSubmit,formState:{errors}} = useForm()

    let {loginUserStatus,errOccured,errMsg,currentUser}= useSelector(state  =>  state.userAuthorLoginReducer)
    let dispatch = useDispatch()

    
    let navigate = useNavigate()
    

    //form submit
    function HandleLoginForm( userCredentialsObj)
    {
        // console.log(userCredentialsObj);
        let disres = dispatch(userAuthorLoginThunk(userCredentialsObj))
        console.log(disres);
    }

    useEffect(()=>{
        if(loginUserStatus===true)
        {
            toast.success("Login successful !")
            setTimeout(() => {
                if(currentUser.userType === 'user')
                    navigate('/userProfile')
                if(currentUser.userType === 'author')
                    navigate('/authorProfile')
            }, 1500);
        }
        else if(errOccured)
        {
            toast.error(errMsg)
        }

    },[loginUserStatus])
    

    return (

        <div>
            <main>
            <div className="total bg-dark-subtle text-center">
                <form className="left" onSubmit={handleSubmit(HandleLoginForm) }>
                    <h3>Sign in</h3>
                    <div className="credentials space-y-3">
                        <div className='md:grid grid-cols-2 gap-x-0 flex flex-col items-center '>
                            {/* author */}
                            <div className='form-check ps-5 flex items-center justify-center '>
                                <input type='radio' id='Author' name='userType' value='author' className='me-2 form-check-input focus:border-solid focus:border-gray-900 accent-orange-600' {...register('userType',{
                                    required:true,
                                })} />
                                <label htmlFor='Author'  name='userType' className='form-check-label  hover:text-blue-700' >Author</label>
                            </div>
                            {/* user */}
                            <div className='form-check pe-5 flex items-center justify-center '>
                                <input type='radio' id='User' name='userType' value='user' className='me-2 form-check-input focus:border-solid focus:border-gray-900 accent-orange-600'  {...register('userType',{
                                    required:true,
                                })} />
                                <label htmlFor='User'  name='userType' className='form-check-label hover:text-blue-700' >User</label>
                            </div>                     
                            
                            {errors.userType?.type === 'required' && (
                                <>
                                    <p className='text-danger col-span-2'>userType is Required*</p>
                                </>
                            )}
                        </div>
                        <input type="text" name="" className='username focus:border-solid focus:border-gray-500 ' id="" placeholder="Username" {...register("username",{required:true})} />
                        {errors.username?.type==='required' && (
                        <p className='text-danger'>Username is Required*</p>
                        ) }
                        <input className="password focus:border-solid focus:border-gray-500 " type="password" name="password" placeholder="Password" {...register("password",{required:true})} / >
                        {errors.password?.type==='required' && (
                        <p className='text-danger'>Password is Required*</p>
                        ) }
                        <button className="login mt-4 mb-3 active:bg-amber-600 bg-orange-600 hover:bg-orange-500">
                            Log In
                        </button>
                    </div>

                    <p className='lead mb-0 fw-medium text-center'>New User! &nbsp;
                    <Link to='/signup' className='fs-4 ps-1 pe-3 hover:text-blue-700 hover:underline hover:underline-offset-2 '  >
                            Register
                    </Link>
                    Here
                    </p>
                </form>

            </div>
        </main>
        </div>
    )
    }

    export default Signin