"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dots from "@/app/components/dots";

import Navbar from '@/app/components/navbar';
export default function home({ params }){
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
      const newFiles = event.target.files;
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };
    const handleRemoveFile = (index) => {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    };
  
    const handleSubmitClick = () => {
      // Add logic for submission
      console.log("Submitted Files:", files);
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      const newFiles = event.dataTransfer.files;
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
      // You can add styling or visual cues to indicate a valid drop target
    };
  
    const truncateFileName = (fileName, maxLength) => {
      const curlen = fileName.length;
      if (curlen > maxLength) {
        return fileName.substring(0, maxLength * 2/5) + ".........." + fileName.substring(curlen - maxLength*2/5, curlen);
      }
      return fileName;
    };
  
    const calculateTotalMemory = () => {
      return files.reduce((total, file) => total + file.size, 0);
      
    };
  
    const calculateCurrentCost = () => {
      const totalMemory = calculateTotalMemory();
      const costPerMB = 0.00610351562;
      return (totalMemory / (1024 * 1024)) * costPerMB;
    };
    return (
      <section
        className="flex mb-16"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        
       <Dots />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-4">  {/* Adjusted the bottom margin here */}
      <Navbar someID={params.id} current={3}/>
      <div className="mt-24 md:pb-20">
            <div className="text-center md:pb-16">
            <h1 className="text-8xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out"><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Upload files</span></h1>
            <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Compress your files easily with our decentralized compression service. Save space and maintain the integrity of your data on Arweave.</p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <div className="mb-4 sm:mb-0">
                    {files.length > 0 ? (
                      <div>
                        <div className="bg-gray-100 border rounded p-4 mb-4 min-w-[600px] overflow-y-auto max-h-[400px]">
                          {files.map((file, index) => (
                            <div key={index} className="bg-white border rounded p-4 mb-4 flex justify-between items-center">
                              <div>
                                <p className="text-gray-600 text-md text-left">{truncateFileName(file.name, 40)}</p>
                                <p className="text-gray-600 text-md text-left">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                              </div>
                              <button
                                className="text-red-500 hover:text-red-700 ml-16"
                                onClick={() => handleRemoveFile(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-6">
                          <div className="text-left">
                            <p className="text-gray-600 text-md">
                              Total Memory: {(calculateTotalMemory() / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <p className="text-gray-600 text-md">
                              Current Cost: ${(calculateCurrentCost()).toFixed(3)}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="fileInput"
                              className="cursor-pointer bg-orange-400 hover:bg-orange-500 text-white py-2 px-5 border rounded inline-block font-bold mr-4"
                            >
                              Add More
                            </label>
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} multiple />
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 border rounded font-bold"
                              onClick={handleSubmitClick}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <label htmlFor="fileInput" className="cursor-pointer bg-orange-300 text-white py-24 px-48 border rounded-lg font-bold block text-2xl">
                          Drag and Drop or Click to Upload
                        </label>
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} multiple />
                      </>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }