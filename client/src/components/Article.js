import {  useLocation, useNavigate  } from "react-router-dom";
import {   useState } from "react";
import { axiosWithToken } from '../components/axiosWithToken'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'


import { FaRegEdit } from "react-icons/fa"; 
import { MdDeleteOutline } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlineRestoreFromTrash } from "react-icons/md";


function Article() {
  let { currentUser } = useSelector( state => state.userAuthorLoginReducer);
  
  // our current article to view individually
  const { state} = useLocation();
  
  let navigate = useNavigate();

  let { register, handleSubmit,formState:{errors} } = useForm();

  let [editStatus, setEditStatus] = useState(false);

  //add comment object to the article by the user
  async function writeComment(commentObj){
      if(commentObj.comment.trim().length===0)
      {
        toast.error("Comments can't be empty")
        return
      }
      
      commentObj.username = currentUser.username

      let res = await axiosWithToken.post(`http://localhost:40001/user-api/comment/${state.articleId}`,commentObj)

      if(res.data.message === 'Comment posted' )
      {
        toast.success("Comment posted successfully...")
        setTimeout(() => {
          navigate(`/userProfile/article/${res.data.article.articleId}`,{state:res.data.article})
        }, 2000);
      }
  }
  

  // enable edit option to the author
  function enableEditStatus (){
    setEditStatus(true)
  }


  // disable edit status adn save the article by the author
  async function saveModifiedArticle (editedArticle){

    let modifiedArticle = {...state , ...editedArticle}
    
    //change date of modification
    modifiedArticle.dateOfModification = new Date()
    
    //remove mongodb object id 
    delete modifiedArticle._id

    // console.log(modifiedArticle);

    let res = await axiosWithToken.put("http://localhost:40001/author-api/article",modifiedArticle)

    console.log("Response from backend",res);

    if(res.data.message === 'Article modified' )
    {
      toast.success("Article is modified successsfully")
      setTimeout(() => {
        setEditStatus(false)
        navigate(`/authorProfile/article/${res.data.article.articleId}`,{state : res.data.article})
      }, 2000);
    }
  }

  let [currentArticle, setCurrentArticle] = useState(state);

  async function deleteArticle(){
    let delArticle = {...currentArticle}
    delete delArticle._id;

    const res = await axiosWithToken.put(`http://localhost:40001/author-api/article/${currentArticle.articleId}`,delArticle)

    console.log("Deletd object ",delArticle);

    console.log("response received",res);
    if(res.data.message === 'article deleted'){
      toast.success("Article has be deleted successfully")
      console.log("deleted article");
      setCurrentArticle({...currentArticle,status : res.data.payload})
      navigate(`/authorProfile/article/${currentArticle.articleId}`,{state : currentArticle})
    }
  }
  
  async function restoreArticle(){
    let resArticle = {...currentArticle}
    delete resArticle._id;

    const resp = await axiosWithToken.put(`http://localhost:40001/author-api/article/${currentArticle.articleId}`,resArticle)

    console.log("Restore object ",resArticle);
    console.log("response received",resp);
    
    if(resp.data.message === 'article restored'){
      toast.success("Article has be restored successfully")
      console.log("restored article");
      setCurrentArticle({...currentArticle,status : resp.data.payload})
      navigate(`/authorProfile/article/${currentArticle.articleId}`,{state : currentArticle})
    }

  }
  
  
  const formatDate = (dateString) => {
      const date = new Date(dateString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
      const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
      
      let hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours %= 12;
      hours = hours===0?'00':hours;
      return `${day}/${month}/${year}  ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div>
      {
        editStatus === false ? (
          <div className="my-8 mb-12 p-10 pt-3 mx-12 min-h-screen rounded-xl " style={{boxShadow : 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'}}>
              <div className={`flex items-center justify-between`}  >
                <h3 className=" text-6xl mb-2 font-semibold">{state.title}
                {
                  currentUser.userType === 'user' && (
                      <span className=' text-base text-gray-500 inline-block align-bottom font-mono -mb-[17px] -ml-6 '>-{state.username}</span>
                  )
                }
                </h3>
                  {
                    currentUser.userType==='author' && (
                      <>
                        <div className="grid grid-cols-2 justify-items-center  ">
                          <span onClick={enableEditStatus} className="hover:text-amber-500 text-amber-600  grid-cols-1 font-semibold" style={{cursor:'pointer'}}>
                            Edit&nbsp; <FaRegEdit className=" inline-block w-5 h-5" />&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          {
                            // true --> viewable and can be deletable
                            currentArticle.status===true?(

                              <span onClick={deleteArticle} className="hover:text-red-600 text-red-700 grid-cols-1 font-semibold" style={{cursor:'pointer'}}>
                                Delete&nbsp; <MdDeleteOutline className=" inline-block w-6 h-6" />
                              </span>

                            ):(

                                <span onClick={restoreArticle} className="hover:text-blue-600 text-blue-800 grid-cols-1 font-semibold" style={{cursor:'pointer'}}>
                                  Restore&nbsp; <MdOutlineRestoreFromTrash className=" inline-block w-6 h-6" />
                                </span>
                            )
                          }
                        </div>
                      </>
                    )
                  }
              </div>
                <p className=" text-gray-500 flex items-center justify-start text-base mt-2">
                  <span className="flex items-center"><FcCalendar className="w-6 h-6" />Created on : {formatDate(state.dateOfCreation)} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="flex items-center"><FcClock className="w-5 h-5" />Modified on : {formatDate(state.dateOfModification)} </span>
                </p>
                <hr className="mt-2" />
                {/* it preserves white spaces */}
                <div>
                    <p className="mt-4 select-none leading-7 text-lg text-balance whitespace-pre break-words"  >
                        {state.content}
                    </p>
                </div>
                <hr className="mt-4" />
              {/* user comments */}
              <div className="">
                  {/* read existing comments */}
                  <div>
                    {
                      state.comments.length === 0 ?(
                        <p className="flex items-center justify-start text-3xl  mt-4">No Comments yet &nbsp;<MdOutlineCommentsDisabled className="w-12 h-12 text-gray-500 align-text-bottom" /></p>
                      ):( 
                        state.comments.map((commentObj,ind) => (
                            <div className="alert p-3 bg-gray-200 mt-3 border border-gray-600 border-spacing-6   " key={ind}  role="alert">
                              <p className="flex items-center justify-start mb-2 text-xl align-text-bottom"><HiOutlineUserCircle className="h-8 w-8" />&nbsp;&nbsp;{commentObj.username}</p>
                              <p className="flex items-center justify-start text-xl align-text-bottom "><MdOutlineInsertComment className="h-8 w-8" />&nbsp;&nbsp;{commentObj.comment}</p>
                            </div>
                          )
                        )
                      )
                    }
                  </div>

                {/* write comments  by user */}
                {
                  currentUser.userType==='user' && (
                    <form onSubmit={handleSubmit(writeComment)} >
                      <input type="text" {...register('comment')} className="form-control mb-4 mt-8" placeholder = "Write a Comment here...." />
                      <button class="button-82-pushable submit" role="button"><span class="button-82-shadow"></span><span class="button-82-edge "></span><span class="button-82-front p-0 px-3 text">
                          Add Comment
                      </span></button>
                    </form>
                  )
                }
              </div>
          </div>


        ):(

          // editing current article by the author
          <>
          <div className=' my-8 mx-12 pt-3 p-10 text-wrap min-h-screen rounded-xl' style={{boxShadow : "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"}} >
              <div className='grid grid-cols-1'>
                  <form className='mt-4' onSubmit={handleSubmit(saveModifiedArticle)} >
                      <div className="mb-4 ">
                        <label htmlFor="title" className="form-label font-semibold text-xl font-serif">
                          Title
                        </label>
                        <input type="text" className="form-control" id="title" name='title' {...register("title",{required:true,})} defaultValue={state.title}
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
                          {...register("category",{required:true})} name='category' id="category" className="form-select" defaultValue={state.category}
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
                          rows="10" name='content' defaultValue={state.content}
                          ></textarea>
                          {errors.content?.type === 'required' && (
                            <>
                              <p className='text-danger mt-2 col-span-3'>Content is Required*</p>
                            </>
                          )}
                      </div>

                      <div className="text-end">
                        <button type="submit" className="px-3 py-1 font-semibold hover:bg-green-500 hover:text-gray-900 text-gray-50 text-lg bg-green-600 rounded-xl">
                          Save
                        </button>
                      </div>
                  </form>            
              </div>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Article