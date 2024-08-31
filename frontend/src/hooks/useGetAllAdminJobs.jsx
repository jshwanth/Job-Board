import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/notes'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get-admin-jobs`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
          setJobs(res.data.jobs); // Set jobs to local state
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getAllAdminJobs();
  }, [dispatch]);

  return { jobs, loading, error }; // Return the jobs, loading, and error states
};

export default useGetAllAdminJobs;
