import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { APPLICATION_API_END_POINT } from '@/utils/notes';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const jobStatus = ["Accepted", "Rejected"];

const ApplicantsList = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/update/${id}`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Applicants List</h1>
            <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full name</TableHead>
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</TableHead>
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Contact</TableHead>
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Resume</TableHead>
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            const resumeLink = item.applicant?.profile?.resume;
                            const resumeName = item.applicant?.profile?.resumeOriginalName;
                            return(
                            <TableRow key={item._id} className="hover:bg-gray-50">
                                <TableCell className="px-4 py-2 border-t border-gray-200">{item.applicant.fullname}</TableCell>
                                <TableCell className="px-4 py-2 border-t border-gray-200">{item.applicant.email}</TableCell>
                                <TableCell className="px-4 py-2 border-t border-gray-200">{item.applicant.phoneNo}</TableCell>
                                <TableCell className="px-4 py-2 border-t border-gray-200">
                                    {
                                        resumeLink ? (
                                            <a
                                                className="text-blue-600 cursor-pointer"
                                                href={resumeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {resumeName}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )
                                    }
                                </TableCell>
                                <TableCell className="px-4 py-2 border-t border-gray-200"><span>{new Date(applicants.createdAt).toLocaleDateString("en-GB")}</span></TableCell>
                                <TableCell className="px-4 py-2 border-t border-gray-200">
                                    <Select onValueChange={(value) => statusHandler(value, item?._id)}>
                                        <SelectTrigger className="focus:ring-2 focus:ring-red-500">
                                            <SelectValue placeholder="Select Job Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {jobStatus.map((status, index) => (
                                                    <SelectItem key={index} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </TableCell>
                            </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsList;
