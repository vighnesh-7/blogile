import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";




function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  let { currentUser } = useSelector(state => state.userAuthorLoginReducer);

  let token=localStorage.getItem('token')

    //create axios with token authorization
    const axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
    })

  const getArticlesOfSession=async()=>{
    let res = await axiosWithToken.get(`http://localhost:40001/author-api/articles/${currentUser.username}`)

    // console.log(res)

    setArticlesList(res.data.payload)
    // console.log(res.data.payload);
  }

  useEffect(()=>{
    getArticlesOfSession()
  },[])
  
  
  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
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
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
        {
          articlesList.map((article) => (
            <div className='col' key={article.Id} >
                <div className={`card h-100  ${article.status=== false && 'bg-red-500' }`}>
                    <div className='card-body '>
                      <h5 className='card-title font-semibold text-center text-lg '> {article.title}  </h5>
                      <p className='card-text'> {article.content.substring(0,185)+"..."} </p>
                      <button className=' p-2 px-3 mt-4 hover:bg-teal-600 hover:text-gray-950 text-gray-50 font-semibold rounded-xl bg-teal-700 ' onClick={() => readArticleByArticleId(article)}>
                          Read More
                      </button>
                    </div>
                    <div className={`card-footer ${article.status === false && 'border-t-[1px] border-t-gray-50' } `  }>
                      <span className={` ${article.status=== false && 'text-gray-50' }`}>{formatDate(article.dateOfModification)}</span>
                    </div>
                </div>
              </div>
          ))
        }
      </div>
      <Outlet />
  </div>
  )
}

export default ArticlesByAuthor