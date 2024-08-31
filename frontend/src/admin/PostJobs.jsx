import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/utils/notes";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyID: ""
    });

    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyID: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Please wait...");
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post-job`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message,{id:toastId});
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message,{id:toastId});
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center w-full py-10">
                <form onSubmit={submitHandler} className="p-8 max-w-3xl w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus:ring-2 focus:ring-red-500 my-1"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="focus:ring-2 focus:ring-red-500">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <Button type="submit" className="w-full mt-6 bg-red  text-white font-semibold py-2">
                        Submit
                    </Button>
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center mt-3">
                            *Please register a company first before posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
