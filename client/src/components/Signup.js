    import React, { useState } from 'react'
    import './Signin.css'
    import {useForm} from 'react-hook-form'
    import {Link} from 'react-router-dom'
    import toast from 'react-hot-toast';
    import {useNavigate} from 'react-router-dom'
    import axios from 'axios'

    
    function Signup() {

    let {register,handleSubmit,formState:{errors}} = useForm()
    let [err,setErr] = useState('')
    let navigate = useNavigate()

    //form submit
    async function HandleRegisterForm( userCredentialsObj)
    {
        //make http post req
        let res ;
        if(userCredentialsObj.userType==='user')
            res = await axios.post('http://localhost:40001/user-api/user',userCredentialsObj)
        else{
            res = await axios.post('http://localhost:40001/author-api/user',userCredentialsObj)
        } 
        
        console.log(res);
        // console.log(res);
        
        if(res.data.message==="User created" || res.data.message === "Author created")
        {
            toast.success("You have been registered successfully")
            // navigate to login page 
            setTimeout(() => navigate('/signin'), 1500);
        }
        else
        {
            toast.error(res.data.message)
            console.log(err);
            setErr(res.data.message)
        } 
    }

    
    return (
        <div className=''>
            <main>
            <div className="total mt-3 bg-dark-subtle text-center">                
                <form className="left" disabled={true} onSubmit={handleSubmit(HandleRegisterForm) }>
                    <h3>Sign Up</h3>
                    <div className="credentials space-y-3">
                        <div className='md:grid grid-cols-2 gap-x-1 flex flex-col items-center '>
                            {/* author */}
                            <div className='form-check ps-5 flex items-center justify-center '>
                                <input type='radio' id='Author' name='userType' value='author' className='me-2 form-check-input' {...register('userType',{
                                    required:true,
                                })} />
                                <label htmlFor='Author'  name='userType' className='form-check-label hover:text-blue-700 accent-teal-700' >Author</label>
                            </div>
                            {/* user */}
                            <div className='form-check flex items-center justify-center '>
                                <input type='radio' id='User' name='userType' value='user' className='me-2 form-check-input accent-teal-700' {...register('userType',{
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
                        <input type="text" name="" className='username focus:border-solid focus:border-gray-500' id="" placeholder="Username" {...register("username",{required:true})} />
                        {errors.username?.type==='required' && (
                        <p className='text-danger'>Username is Required*</p>
                        ) }
                        <input className="password focus:border-solid focus:border-gray-500 " type="password" name="password" placeholder="Password" {...register("password",{required:true})} / >
                        {errors.password?.type==='required' && (
                        <p className='text-danger'>Password is Required*</p>
                        ) }
                        <input className="email focus:border-solid focus:border-gray-500 " type="text" name="email" placeholder="Email" {...register("email",{required:true})} / >
                        {errors.email?.type==='required' && (
                        <p className='text-danger'>Email is Required*</p>
                        ) }
                        <button className="login mt-4 active:bg-green-600 bg-emerald-700 hover:bg-emerald-600">
                            Register
                        </button>
                    </div>

                    <p className='lead mb-0 mt-3 fw-medium text-center'>Already signed up &nbsp;
                    <Link to='/signin' className='fs-4 ps-1 pe-3 hover:text-blue-700 hover:underline hover:underline-offset-2 '  >
                            Login
                    </Link>
                    Here
                    </p>
                </form>

            </div>
        </main>
        </div>
    )
    }

    export default Signup