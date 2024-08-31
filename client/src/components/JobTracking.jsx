import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const JobTracking = () => {
  const [jobNames, setJobNames] = useState([]);
  const [selectedJobName, setSelectedJobName] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchJobNames();
  }, []);

  const fetchJobNames = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/job_company_name", {
        method: "GET", // Use GET method to fetch job names
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setJobNames(data);
      } else {
        setJobNames([]);
      }
    } catch (error) {
      console.error("Error fetching job names:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedStudents = async (jobName) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/get_applied_students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ job_name: jobName }),
        }
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedData = data.map((item, index) => ({
          id: index + 1,
          jobName: item.id,
          email: item.email,
          appliedAt: new Date(item.appliedAt).toLocaleString(),
        }));

        setRows(formattedData);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobNameChange = (event) => {
    const jobName = event.target.value;
    setSelectedJobName(jobName);
    fetchAppliedStudents(jobName);
  };

  const columns = [
    { field: "jobName", headerName: "Job Name", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "appliedAt", headerName: "Applied At", width: 200 },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Applied Students Data
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Job Name</InputLabel>
          <Select
            value={selectedJobName}
            onChange={handleJobNameChange}
            label="Job Name"
          >
            {jobNames.map((jobName) => (
              <MenuItem key={jobName} value={jobName}>
                {jobName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
};

export default JobTracking;
