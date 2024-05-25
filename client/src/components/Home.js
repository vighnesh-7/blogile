import React from 'react';
import { Link } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import { MdTravelExplore } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { MdOutlineNotificationsActive } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-5xl font-bold text-center text-teal-600 mb-6">Welcome to Blogile  </h1>
      <p className="text-lg text-center text-gray-700 mb-16">Share your thoughts, read interesting articles, and engage with the community! </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
        <div className="bg-cyan-100 outline outline-1 outline-cyan-400 rounded-lg shadow-md p-6 ">
          <h2 className="text-2xl flex justify-center text-center font-bold text-cyan-800 mb-4">Create and Share&nbsp;<TfiWrite className=' mt-[5px] w-6 h-6 ' /></h2>
          <p className="text-lg text-gray-700">Express yourself by writing articles on topics you are passionate about. Share your knowledge and experiences with the world.</p>
          <Link to="/signup" className="block text-center mt-6 text-cyan-700 hover:text-cyan-900 font-semibold">Start Writing</Link>
        </div>
        <div className="bg-cyan-100 outline outline-1 outline-cyan-400 rounded-lg shadow-md p-6">
          <h2 className="text-2xl flex justify-center text-center  font-bold text-cyan-800 mb-4">Explore Articles&nbsp;<MdTravelExplore className='w-7 h-7 mt-[5px]' /></h2>
          <p className="text-lg text-gray-700">Discover a wide range of articles written by our talented authors. Explore different topics and perspectives.</p>
          <Link to="/signin" className="block text-center mt-6 text-cyan-700 hover:text-cyan-900 font-semibold">Explore Now</Link>
        </div>
        <div className="bg-cyan-100 outline outline-1 outline-cyan-400 rounded-lg shadow-md p-6">
          <h2 className="text-2xl flex justify-center text-center font-bold text-cyan-800 mb-4">Engage with Community&nbsp;<CgCommunity className='w-8 h-8 mt-[5px]' /></h2>
          <p className="text-lg text-gray-700">Connect with other members of the community. Comment on articles, share your thoughts, and participate in discussions.</p>
          <Link to="/community" className="block text-center mt-6 text-cyan-700 hover:text-cyan-900 font-semibold">Join Community</Link>
        </div>
        <div className="bg-cyan-100 outline outline-1 outline-cyan-400 rounded-lg shadow-md p-6">
          <h2 className="text-2xl flex justify-center text-center font-bold text-cyan-800 mb-4">Stay Updated&nbsp;<MdOutlineNotificationsActive className='w-7 h-7 mt-[4px]' /></h2>
          <p className="text-lg text-gray-700">Stay informed about the latest articles and updates. Subscribe to our newsletter to receive notifications directly to your inbox.</p>
          <Link to="/subscribe" className="block text-center mt-6 text-cyan-700 hover:text-cyan-900 font-semibold">Subscribe Now</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
