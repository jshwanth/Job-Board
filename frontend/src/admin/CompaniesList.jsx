import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Edit3Icon, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (companies.length > 0) {
      const filtered = companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
      setFilteredCompanies(filtered);
    }
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <Table>
        
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-gray-600 text-base">Logo</TableHead>
            <TableHead className="text-gray-600 text-base">Name</TableHead>
            <TableHead className="text-gray-600 text-base">Date</TableHead>
            <TableHead className="text-gray-600 text-base">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company._id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell>
                <Avatar className="border border-gray-200">
                  <AvatarImage src={company.logo} className="rounded-full" />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-800 font-medium text-base">{company.name}</TableCell>
              <TableCell className="text-gray-600 text-base"><span>{new Date(company.createdAt).toLocaleDateString("en-GB")}</span>
              </TableCell>
              <TableCell className="text-right text-gray-600 text-base">
                {/* <Popover> */}
                  {/* <PopoverTrigger>
                    <MoreHorizontal className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer" />
                  </PopoverTrigger> */}
                  {/* <PopoverContent className="w-32 bg-white shadow-lg rounded-lg border border-gray-200"> */}
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-end gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                    >
                      <FiEdit className="w-4 items-end justify-end text-blue-500 hover:text-blue-700 transition-colors duration-200" />
                      <span className="text-gray-800 text-base">Edit</span>
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

export default CompaniesTable;
