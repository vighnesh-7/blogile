import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { axiosWithToken } from '../axiosWithToken';


function AllArticles() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();


  const getArticlesOfAllSessions=async()=>{
    let res = await axiosWithToken.get(`http://localhost:40001/user-api/articles`)

    console.log(res)
    console.log(res.data.message)
    setArticlesList(res.data.payload)
    console.log(res.data.payload);
  }

  useEffect(()=>{
    getArticlesOfAllSessions()
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
                <div className='card h-100 '>
                    <div className='card-body '>
                      <h5 className='card-title font-semibold text-center text-lg '> {article.title}  </h5>
                      <p className='card-text'> {article.content.substring(0,150)+"..."} </p>
                      <button className=' p-2 px-3 mt-4 hover:bg-orange-500 hover:text-gray-950 text-gray-50 font-semibold rounded-xl bg-orange-700 ' onClick={() => readArticleByArticleId(article)}>
                          Read More
                      </button>
                    </div>
                    <div className='card-footer'>
                      <span className=' text-gray-500'>{formatDate(article.dateOfModification)}</span>
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

export default AllArticles