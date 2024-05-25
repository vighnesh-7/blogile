import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className='m-4'>
      <NavLink to='articles' className='fw-medium text-3xl text-sky-600 nav-link mb-3 hover:text-sky-500'>Articles</NavLink>
      <Outlet />
    </div>
  );
}

export default UserProfile;