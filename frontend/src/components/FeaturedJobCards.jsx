/* eslint-disable react/prop-types */
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const FeaturedJobCards = ({job}) => {
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate(`/description/${job._id}`)} className='p-6 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-semibold text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-xl my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-5'>
                <Badge className={'text-blue-700 text-sm font-bold'} variant='ghost'>{job?.position} positions</Badge>
                <Badge className={'text-blue-700 text-sm font-bold'} variant='ghost'>{job?.jobType}</Badge>
                <Badge className={'text-blue-700 text-sm font-bold'} variant='ghost'>{job?.salary}</Badge>
            </div>

    </div>
    )
//     
}
export default FeaturedJobCards