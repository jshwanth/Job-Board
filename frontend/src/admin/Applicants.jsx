import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import React, { useEffect } from 'react';
import ApplicantsList from './ApplicantsList';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/notes';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const  params  = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                toast.error("Failed to fetch applicants.");
                console.error(error);
            }
        };

        fetchAllApplicants();
    });

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Applications ({applicants?.applications?.length})
                </h1>
            <ApplicantsList/>
            </div>
        </div>
    );
};

export default Applicants;
