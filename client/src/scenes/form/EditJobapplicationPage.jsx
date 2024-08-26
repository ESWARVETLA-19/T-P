import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function EditJobApplicationPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '',
    job_description: '',
    application_deadline: '',
    drive_date: '',
    job_application_link: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get_job_application/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
          
        }
        const data = await response.json();
        setFormData({
          company_name: data.company_name || '',
          job_description: data.job_description || '',
          application_deadline: data.application_deadline || '',
          drive_date: data.drive_date || '',
          job_application_link: data.job_application_link || '',
        });
        console.log(formData);
      } catch (error) {
        console.error('Error fetching job application data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/edit_job_application/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/jobs'); 
    } catch (error) {
      console.error('Error updating job application data:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { marginBottom: 2 },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#18172',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom>
        Edit Job Application
      </Typography>
      
      <TextField
        required
        label="Company Name"
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      
      <TextField
        required
        label="Job Description"
        name="job_description"
        multiline
        rows={4}
        value={formData.job_description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      
      <TextField
        required
        label="Application Deadline"
        name="application_deadline"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.application_deadline}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      
      <TextField
        required
        label="Date of Drive"
        name="drive_date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.drive_date}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />

      <TextField
        required
        label="Job Application Link"
        name="job_application_link"
        type="url"
        value={formData.job_application_link}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: '16px', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
      >
        Update
      </Button>
    </Box>
  );
}
