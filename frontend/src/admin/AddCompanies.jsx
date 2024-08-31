import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setSingleCompany } from '@/redux/companySlice';
import { COMPANIES_API_END_POINT } from '@/utils/notes';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddCompanies = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch= useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty.");
      return;
    }
    try {
      const res = await axios.post(
        `${COMPANIES_API_END_POINT}/register-company`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res?.data?.message);
        const companyID = res?.data?.company?._id;
        navigate(`/admin/companies/${companyID}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to register the company.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">Register New Company</h1>
        <p className="text-gray-600 mb-6">Provide the company name to register it in the system.</p>
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Company Name</Label>
          <Input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Google, Facebook..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button 
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCompanies;
