import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

function AddArticle() {
    let {register,handleSubmit,formState:{errors}} = useForm()
    
    let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);

    let [err, setErr] = useState("");

    let navigate = useNavigate();

    let token=localStorage.getItem('token')

    
    //create axios with token authorization
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })

    const handleOnSubmit = async (article) => {
        article.articleId = Date.now();
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        
        // console.log("Article log",article);
            
        let res=await axiosWithToken.post('http://localhost:40001/author-api/article',article)
        
        // console.log(res);
        
        if(res.data.message==='New article created'){
            toast.success('Article created successfully')
            setTimeout(() => {
              navigate(`/authorProfile/articles-by-author/${currentUser.username}`)
            }, 1500);
        }else{
          setErr(res.data.message)
          toast.error({err})
        }
    };
    
  return (
    <>
    <div className=' my-8 mx-12 pt-3 p-10 text-wrap min-h-screen rounded-xl' style={{boxShadow : "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"}} >
        <div className='grid grid-cols-1'>
            <div className=' border-b-2  text-center'>
              <h2 className='p-2 text-3xl font-bold text-zinc-500'>
                Write an Article
              </h2>
            </div>

            <form className='mt-4' onSubmit={handleSubmit(handleOnSubmit)} >
                <div className="mb-4 ">
                  <label htmlFor="title" className="form-label font-semibold text-xl font-serif">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" name='title' {...register("title",{required:true,})}
                  />
                  {errors.title?.type === 'required' && (
                    <>
                      <p className='text-danger mt-2 col-span-3'>Title is Required*</p>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label font-semibold text-xl font-serif">
                    Select a category
                  </label>
                  <select
                    {...register("category",{required:true})} name='category' id="category" className="form-select"
                    >
                    <option value="" disabled selected >Select an option</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="WebDev">Web Development</option>
                    <option value="database">Database</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="auth">Authentication</option>
                    <option value="cybersecurity">Cyber Security</option>
                  </select>
                  {errors.category && errors.category.type === 'required'  && (
                    <>
                      <p className='text-danger mt-2 col-span-3'>Category is Required*</p>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label font-semibold text-xl font-serif">
                    Content
                  </label>
                  <textarea {...register("content",{required:true,})} className="form-control" id="content"
                    rows="10" name='content'
                    ></textarea>
                    {errors.content?.type === 'required' && (
                      <>
                        <p className='text-danger mt-2 col-span-3'>Content is Required*</p>
                      </>
                    )}
                </div>

                <div className="text-end">
                  <button type="submit" className="px-3 py-1 font-semibold hover:bg-amber-500 hover:text-gray-900 text-gray-50 text-lg bg-amber-600 rounded-xl">
                    Post
                  </button>
                </div>
            </form>            
        </div>
    </div>
    </>
  )
}

export default AddArticle