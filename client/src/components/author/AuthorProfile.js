import {useSelector} from 'react-redux';
import { NavLink, Outlet } from "react-router-dom";
import './AuthorProfile.css'
import { useState } from 'react';

    function AuthorProfile() {
        
    let {currentUser}=useSelector(state => state.userAuthorLoginReducer)

    const [user, setUser] = useState({currentUser});
    console.log(user);
    
    return (
        <div className="  p-3 mx-2  ">
        <ul className="nav authorActive flex items-center justify-between ">
            <li className="nav-item ">
            <NavLink
                className="nav-link  text-gray-600 font-medium text-2xl"
                to={`articles-by-author/${user.username}`}
            >
                Articles
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink
                className="nav-link  text-gray-600 font-medium text-2xl"
                to="new-article"
            >
                Add new
            </NavLink>
            </li>
        </ul>
        <Outlet />
        </div>
    );
    }

    export default AuthorProfile;