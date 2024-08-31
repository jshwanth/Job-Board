

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AdminJobsList = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        if (allAdminJobs.length > 0) {
            const filtered = allAdminJobs.filter((job) => {
                if (!searchJobByText) {
                    return true;
                }
                return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
            });
            setFilterJobs(filtered);
        }
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <Table>

                <TableHeader className="bg-gray-100 text-center">
                    <TableRow className='text-center'>
                        <TableHead className="text-gray-600 text-base">Company name</TableHead>
                        <TableHead className="text-gray-600 text-base">Role</TableHead>
                        <TableHead className="text-gray-600 text-base">Date</TableHead>
                        <TableHead className="text-gray-600 text-base">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 transition-colors duration-200">

                                <TableCell className="text-gray-800 font-medium text-base">{job?.company?.name}</TableCell>
                                <TableCell className="text-gray-800 font-medium text-base">{job?.title}</TableCell>
                                <TableCell className="text-gray-600 text-base"><span>{new Date(job.createdAt).toLocaleDateString("en-GB")}</span>
                                </TableCell>
                                <TableCell className=" text-gray-600 text-base">
                                    {/* <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white shadow-lg rounded-lg border border-gray-200"> */}
                                    <div className="flex gap-7 items-center">

                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                                        >
                                            <FiEdit className="w-4 text-blue-500 hover:text-blue-700 transition-colors duration-200" />
                                            <span className="text-gray-800 text-base">Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 '>
                                            <FiEye className='w-4' />
                                            <span>Applicants</span>
                                        </div>
                                    </div>
                                    {/* </PopoverContent>
                                    </Popover> */}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsList;
