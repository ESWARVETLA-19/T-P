import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StudentCard from "./StudentCard";
import ResultCard from "./ResultCard";
import Drives from "./Drives";
import Resume from "./Resume";
import ConsolidatedData from "./ConsolidatedData";

const Detail = () => {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drives, setDrives] = useState(null);

  useEffect(() => {
    getStudentData();
  }, [id]);

  const getStudentData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/student/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudentDetail(data);
      setResult(data.tests || {});
      setDrives(data.drives || {});
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudentDetail(null);
      setResult(null);
    }
  };

  if (!studentDetail || !result || Object.keys(result).length === 0) {
    return (
      <Box m="20px">
        <h2>No data found</h2>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    
  };

  return (
    <Box m="20px">
      <StudentCard details={studentDetail} />

      {/* Navbar */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{
          "& .MuiTab-root": {
            color: "#f0f0f0 !important", // Adding !important
          },
          "& .Mui-selected.MuiTab-root": { // More specific selector
            color: "#5c56cb !important",
            backgroundColor: "#171b2d !important",
          },
        }}
        
      >
        <Tab label="Mock Data" />
        <Tab label="Drive Data" />
        <Tab label="Resumes" />
        <Tab label="Consolidated Data" />
      </Tabs>

      <Box mt="20px">
        {selectedTab === 0 && (
          <div>
            {Object.entries(result).map(([companyName, testArray], index) => (
              <div key={index}>
                <h2>{companyName}</h2>
                <div style={{ display: "flex", flexWrap : "wrap", gap : "4px", justifyContent : "center"}}>
                  {testArray.map((testObj, testIndex) => {
                    const [testName, testData] = Object.entries(testObj)[0];
                    return (
                      <ResultCard key={testIndex} title={testName} test={testData} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedTab === 1 && (
          <Drives data={drives} />
        )}
        {selectedTab === 2 && (
          <Resume data = {studentDetail}/>
        )}
        {selectedTab === 3 && (
          <ConsolidatedData testData={result} userId = {id}/>)}
      </Box>
    </Box>
  );
};

export default Detail;
