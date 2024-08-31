import { setAllJobs, setSearchedJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/notes';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          const allJobs = res.data.jobs;
          dispatch(setAllJobs(allJobs));

          // If a search query exists, filter the jobs
          if (searchedQuery) {
            const filteredJobs = allJobs.filter(job =>
              job.title.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            dispatch(setSearchedJobs(filteredJobs));
          }
          // } else {
          //   // Clear the searchedJobs when there's no search query
          //   dispatch(setSearchedJobs([]));
          // }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
      }
    };

    fetchJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
