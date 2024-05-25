import React, { lazy, Suspense } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Navigate} from 'react-router-dom';


import Spinner from './components/Spinner'

import RootLayout from './components/RootLayout';
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ErrorLayout from './components/ErrorLayout'


import UserProfile from './components/user/UserProfile'

import AuthorProfile from './components/author/AuthorProfile';


//dynamic import using lazy method for fast performance of app

const Articles = lazy(() => import('./components/user/AllArticles') )

const Article = lazy(() => import('./components/Article')) 

const AddArticle = lazy(() => import('./components/author/AddArticle') )
const ArticlesByAuthor = lazy(() => import('./components/author/ArticlesByAuthor') )



    function MyRoutes() {

    // create browser router obj
    let router=createBrowserRouter([
        {
        path:'',
        element:<RootLayout/>,
        errorElement:<ErrorLayout/>,
        children:[
            {
            path:'',
            element:<Home/>
            },
            {
            path:'signup',
            element:<Signup/>
            },
            {
            path:'signin',
            element:<Signin/>
            },
            {
            path:'userProfile',
            element:<UserProfile/>,
            children:[
                    {
                        path:"articles",
                        element:<Suspense fallback={<Spinner />} ><Articles /></Suspense> 
                    },
                    {
                        path:"article/:articleId",
                        element: <Suspense fallback={<Spinner />} ><Article /></Suspense> 
                    },
                    //the default route in the user profile until we click any other the above
                    {
                        path:'',
                        element:<Navigate to='articles' />
                    }
                ]
            },
            {
            path:'authorProfile',
            element:<AuthorProfile/>,
            children:[
                    {
                        path:"new-article",
                        element:<Suspense fallback={<Spinner />} ><AddArticle /></Suspense> 
                    },
                    {
                        path:"articles-by-author/:author",
                        element:<Suspense fallback={<Spinner />} ><ArticlesByAuthor /></Suspense> 
                    },
                    {
                        path:"article/:articleId",
                        element: <Suspense fallback={<Spinner />} ><Article /></Suspense> 
                    },
                    // the default route in the author profile until we click any other the above
                    {
                        path:'',
                        element:<Navigate to='articles-by-author/:author' />
                    }
                ]
            },
        ]
        }
    ])
    

        return (
        <div>
        {/* provide BrowserRouter obj to application */}
            <RouterProvider router={router}/>
        </div>
        )
    }

    export default MyRoutes