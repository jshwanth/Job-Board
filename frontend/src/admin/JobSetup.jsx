import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

import { JOB_API_END_POINT } from '@/utils/notes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobSetup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, loading, error } = useGetAllAdminJobs(); // Get jobs data from hook

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        noOfPositions: "",
        file: null
    });

    useEffect(() => {
        if (!loading && !error) {
            const job = jobs.find(job => job._id === id);
            if (job) {
                setInput({
                    title: job.title || "",
                    description: job.description || "",
                    requirements: job.requirements || "",
                    salary: job.salary || "",
                    location: job.location || "",
                    jobType: job.jobType || "",
                    experience: job.experience || "",
                    position: job.position || "",
                });
            }
        }
    }, [jobs, id, loading, error]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("requirements", input.requirements);
        formData.append("salary", input.salary);
        formData.append("location", input.location);
        formData.append("jobType", input.jobType);
        formData.append("experience", input.experience);
        formData.append("position", input.position);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading jobs.</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg max-w-3xl">
                <div className="flex items-center mb-6">
                    <Button onClick={() => navigate("/admin/jobs")} className="mr-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                        <FaArrowCircleLeft className="w-6 h-6 text-gray-700" />
                    </Button>
                    <h1 className="text-2xl font-bold">Job Setup</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job title"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job description"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job requirements"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Salary</Label>
                        <Input
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job salary"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job location"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Job Type</Label>
                        <Input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter job type"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Experience Level</Label>
                        <Input
                            type="text"
                            name="experienceLevel"
                            value={input.experience}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter experience level"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">No. of Positions</Label>
                        <Input
                            type="text"
                            name="position"
                            value={input.position}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter number of positions"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-red text-white px-4 py-2 rounded-md w-full"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default JobSetup;
