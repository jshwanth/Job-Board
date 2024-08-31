import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetCompanyByID from '@/hooks/useGetCompanyByID';
import { COMPANIES_API_END_POINT } from '@/utils/notes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CompanySetup = () => {
    const params=useParams();
    useGetCompanyByID(params.id)

    const navigate=useNavigate();
    const {singleCompany}=useSelector(store=>store.company)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    // Event handler for input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler=(e)=>{
        const file=e.target.files?.[0];
        setInput({...input,file})
    }
    const submitHandler=async ( e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("description",input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        if(input.file){

            formData.append("file",input.file);
        }
        try {
            const res= await axios.put(`${COMPANIES_API_END_POINT}/update/${params.id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        setInput({

            name: singleCompany.name||"",
            description:singleCompany.description|| "",
            website: singleCompany.website||"",
            location: singleCompany.location||"",
            file:singleCompany.file|| null
        })
    },[singleCompany])
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg max-w-3xl">
                <div className="flex items-center mb-6">
                    <Button onClick={()=>navigate("/admin/companies")} className="mr-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                        <FaArrowCircleLeft className="w-6 h-6 text-gray-700" />
                    </Button>
                    <h1 className="text-2xl font-bold">Company Setup</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter company name"
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
                            placeholder="Enter company description"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter company website URL"
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
                            placeholder="Enter company location"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">Upload Logo</Label>
                        <Input
                            type="file"
                            name="image/*"
                            onChange={changeFileHandler}
                            className="mt-1 block w-full"
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

export default CompanySetup;
