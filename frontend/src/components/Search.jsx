import React, { useEffect } from 'react';
import Navbar from './global/Navbar';
import Footer from './global/Footer';
import SingleJob from './SingleJob';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';



const Search = () => {
  useGetAllJobs();
  const { searchedJobs } = useSelector((store) => store.job);
  const dispatch=useDispatch();
  useEffect(()=>{
    return()=>{
    dispatch(setSearchedQuery(''))
    }
  })
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Search Results ({searchedJobs.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedJobs.map((job) => (
              <SingleJob key={job._id} job={job} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
