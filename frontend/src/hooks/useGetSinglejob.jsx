import { setAllJobs, setSingleJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/notes'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetSingleJob = (jobID) => {
  const dispatch=useDispatch();
  
 
}

export default useGetSingleJob
