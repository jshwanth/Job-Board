import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata"]
    },
    {
        filterType: "Industry",
        array: ["IT Services", "Finance", "Healthcare", "Education", "Retail"]
    },
    {
        filterType: "Salary",
        array: ["0-30k", "30k-50k", "50k-70k", "70k-1 lakh", "1-2 lakh"]
    }
];

const FilterCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xs mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Filter Jobs</h1>
      <hr className="border-gray-200 mb-4" />
      <RadioGroup>
        {
            filterData.map((data, index) => (
                <div className="mb-6" key={index}>
                    <h2 className="text-lg font-medium text-gray-600 mb-2">{data.filterType}</h2>
                    {
                        data.array.map((item, index) => (
                            <div className="flex items-center mb-2" key={index}>
                                <RadioGroupItem 
                                  className="form-radio text-red border-gray-300 focus:ring-red-500" 
                                  value={item} 
                                  id={item} 
                                />
                                <Label htmlFor={item} className="ml-2 text-gray-700">{item}</Label>
                            </div>
                        ))
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
