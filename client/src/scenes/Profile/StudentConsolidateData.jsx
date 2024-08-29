import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StudentConsolidatedData = ({ testData }) => {
  const [rows, setRows] = useState([]);
  const [averages, setAverages] = useState({
    coding_percentage: 0,
    cognitive_ability_percentage: 0,
    technical_ability_percentage: 0,
  });

  useEffect(() => {
    // Calculate averages and prepare rows
    let totalCodingPercentage = 0;
    let totalCognitivePercentage = 0;
    let totalTechnicalPercentage = 0;
    let count = 0;

    const processedRows = testData["Accenture Mock Test"].map((test, index) => {
      const testName = Object.keys(test)[0];
      const testDetails = test[testName];

      totalCodingPercentage += testDetails["coding percentage"] || 0;
      totalCognitivePercentage += testDetails["cognitive ability percentage"] || 0;
      totalTechnicalPercentage += testDetails["technical ability percentage"] || 0;
      count += 1;

      return {
        id: index + 1,
        testName,
        status: testDetails.status || 'N/A',
        timeSpent: testDetails["time spent"] || 'N/A',
        totalMarks: testDetails.total || 'N/A',
        maxMarks: testDetails["max marks"] || 'N/A',
        percentage: testDetails.percentage || 'N/A',
        qualified: testDetails.qualified || 'N/A',
        accuracy: testDetails.accuracy || 'N/A',
        cognitiveTotal: testDetails["cognitive ability total"] || 'N/A',
        cognitivePercentage: testDetails["cognitive ability percentage"] || 'N/A',
        technicalTotal: testDetails["technical ability total"] || 'N/A',
        technicalPercentage: testDetails["technical ability percentage"] || 'N/A',
        codingTotal: testDetails["coding total"] || 'N/A',
        codingPercentage: testDetails["coding percentage"] || 'N/A',
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
  }, [testData]);

  const columns = [
    { field: 'testName', headerName: 'Test Name', width: 150 },
    { field: 'percentage', headerName: 'Percentage (%)', width: 150 },
    { field: 'qualified', headerName: 'Qualified', width: 120 },
    { field: 'accuracy', headerName: 'Accuracy (%)', width: 150 },
    { field: 'cognitiveTotal', headerName: 'Cognitive Total', width: 180 },
    { field: 'cognitivePercentage', headerName: 'Cognitive (%)', width: 180 },
    { field: 'technicalTotal', headerName: 'Technical Total', width: 180 },
    { field: 'technicalPercentage', headerName: 'Technical (%)', width: 180 },
    { field: 'codingTotal', headerName: 'Coding Total', width: 150 },
    { field: 'codingPercentage', headerName: 'Coding (%)', width: 150 },
  ];

  // Add a final row for averages
  const averageRow = {
    id: rows.length + 1,
    testName: 'Averages',
    percentage: 'N/A',
    qualified: 'N/A',
    accuracy: 'N/A',
    cognitiveTotal: 'N/A',
    cognitivePercentage: averages.cognitive_ability_percentage.toFixed(2),
    technicalTotal: 'N/A',
    technicalPercentage: averages.technical_ability_percentage.toFixed(2),
    codingTotal: 'N/A',
    codingPercentage: averages.coding_percentage.toFixed(2),
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={[...rows, averageRow]} 
        columns={columns} 
        pageSize={5} 
      />
    </div>
  );
};

export default StudentConsolidatedData;
