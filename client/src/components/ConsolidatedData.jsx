import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ConsolidatedData = ({ testData }) => {
  const [selectedCompany, setSelectedCompany] = useState(
    Object.keys(testData)[0]
  );
  const [rows, setRows] = useState([]);
  const [averages, setAverages] = useState({
    coding_percentage: 0,
    cognitive_ability_percentage: 0,
    technical_ability_percentage: 0,
  });

  useEffect(() => {
    if (!selectedCompany || !testData[selectedCompany]) return;

    // Calculate averages and prepare rows
    let totalCodingPercentage = 0;
    let totalCognitivePercentage = 0;
    let totalTechnicalPercentage = 0;
    let count = 0;

    const processedRows = testData[selectedCompany].map((test, index) => {
      const testName = Object.keys(test)[0];
      const testDetails = test[testName];

      totalCodingPercentage += testDetails["coding percentage"] || 0;
      totalCognitivePercentage +=
        testDetails["cognitive ability percentage"] || 0;
      totalTechnicalPercentage +=
        testDetails["technical ability percentage"] || 0;
      count += 1;

      return {
        id: index + 1,
        testName,
        status: testDetails.status || 0,
        timeSpent: testDetails["time spent"] || 0,
        totalMarks: testDetails.total || 0,
        maxMarks: testDetails["max marks"] || 0,
        percentage: testDetails.percentage || 0,
        qualified: testDetails.qualified || 0,
        accuracy: testDetails.accuracy || 0,
        cognitiveTotal: testDetails["cognitive ability total"] || 0,
        cognitivePercentage: testDetails["cognitive ability percentage"] || 0,
        technicalTotal: testDetails["technical ability total"] || 0,
        technicalPercentage: testDetails["technical ability percentage"] || 0,
        codingTotal: testDetails["coding total"] || 0,
        codingPercentage: testDetails["coding percentage"] || 0,
      };
    });

    if (count > 0) {
      setAverages({
        coding_percentage: totalCodingPercentage / count,
        cognitive_ability_percentage: totalCognitivePercentage / count,
        technical_ability_percentage: totalTechnicalPercentage / count,
      });
    }

    setRows(processedRows);
  }, [selectedCompany, testData]);

  const columns = [
    { field: "testName", headerName: "Test Name", width: 150 },
    { field: "percentage", headerName: "Percentage (%)", width: 150 },
    { field: "qualified", headerName: "Qualified", width: 120 },
    { field: "accuracy", headerName: "Accuracy (%)", width: 150 },
    { field: "cognitiveTotal", headerName: "Cognitive Total", width: 180 },
    { field: "cognitivePercentage", headerName: "Cognitive (%)", width: 180 },
    { field: "technicalTotal", headerName: "Technical Total", width: 180 },
    { field: "technicalPercentage", headerName: "Technical (%)", width: 180 },
    { field: "codingTotal", headerName: "Coding Total", width: 150 },
    { field: "codingPercentage", headerName: "Coding (%)", width: 150 },
  ];

  // Add a final row for averages
  const averageRow = {
    id: rows.length + 1,
    testName: "Averages",
    percentage: 0,
    qualified: 0,
    accuracy: 0,
    cognitiveTotal: 0,
    cognitivePercentage: averages.cognitive_ability_percentage.toFixed(2),
    technicalTotal: 0,
    technicalPercentage: averages.technical_ability_percentage.toFixed(2),
    codingTotal: 0,
    codingPercentage: averages.coding_percentage.toFixed(2),
  };

  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="company-select-label">Select Company</InputLabel>
          <Select
            labelId="company-select-label"
            id="company-select"
            value={selectedCompany}
            label="Select Company"
            onChange={(e) => setSelectedCompany(e.target.value)}
            sx={{
              backgroundColor: "#5656c9", // Light background color for the dropdown
              borderRadius: "4px", // Rounded corners
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)", // Border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "& .MuiSvgIcon-root": {
                color: "white", // Customize the arrow icon color
              },
            }}
          >
            {Object.keys(testData).map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={[...rows, averageRow]} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default ConsolidatedData;
