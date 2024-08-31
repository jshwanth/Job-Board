import { setCompanies, setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANIES_API_END_POINT } from '@/utils/notes'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAllCompanies = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const getCompanies = async ()=>{
      try {
        const res = await axios.get(`${COMPANIES_API_END_POINT}/get`,{withCredentials:true});
        if(res.data.success){
          dispatch(setCompanies(res.data.companies));
      }
      } catch (error) {
        console.log(error);
        
      }
    }
    getCompanies();
  })
}

export default useGetAllCompanies;
