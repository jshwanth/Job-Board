import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 text-md';
      case 'rejected':
        return 'bg-[#f8d7da] text-[#e62e00] text-md';
      default:
        return 'bg-gray-100 text-gray-800'; // Default color if status is unknown
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <Table className="min-w-full bg-white">
        <TableCaption className="text-lg font-semibold text-gray-800 mb-4"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You have not applied for any jobs yet.</span> :
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span>{new Date(appliedJob?.createdAt).toLocaleDateString("en-GB")}</span>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-md ">{appliedJob?.job?.title}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-md ">{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                  <Badge className={`px-3 py-1 rounded-full cursor-pointer ${getStatusBadgeClass(appliedJob?.status)}`}>
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
