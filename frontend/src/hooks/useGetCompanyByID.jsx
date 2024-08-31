import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANIES_API_END_POINT } from '@/utils/notes'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetCompanyByID = (companyID) => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const getSingleCompany = async ()=>{
      try {
        const res = await axios.get(`${COMPANIES_API_END_POINT}/get/${companyID}`,{withCredentials:true});
        if(res.data.success){
          dispatch(setSingleCompany(res.data.company));
      }
      } catch (error) {
        console.log(error);
        
      }
    }
    getSingleCompany();
  },[companyID,dispatch])
}

export default useGetCompanyByID;
