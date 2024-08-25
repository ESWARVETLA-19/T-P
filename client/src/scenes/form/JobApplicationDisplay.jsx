import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

export default function JobApplicationDisplay() {
  const [formDataList, setFormDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_all_job_applications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormDataList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching job application data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete_job_application/${id}`, {
        method: 'post',
      });
      if (response.ok) {
        setFormDataList((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error('Failed to delete job application');
      }
    } catch (error) {
      console.error('Error deleting job application:', error);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'company_name', headerName: 'Company Name', width: 200 },
    { field: 'job_description', headerName: 'Job Description', width: 300 },
    { field: 'application_deadline', headerName: 'Application Deadline', width: 180 },
    { field: 'drive_date', headerName: 'Drive Date', width: 180 },
    {
      field: 'job_application_link',
      headerName: 'Job Application Link',
      width: 250,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit_job_application/${params.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  // Prepare rows for DataGrid
  const rows = formDataList.map((data, index) => ({
    id: data.id, // Ensure this is unique, use your data's unique identifier
    ...data,
  }));

  return (
    <Box sx={{ height: 400, width: '100%', padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
          },
          '& .MuiDataGrid-cell': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        }}
      />
    </Box>
  );
}
