import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function JobApplicationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    jobDescription: '',
    applicationDeadline: '',
    driveDate: '',
    jobApplicationLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://127.0.0.1:8000/job_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Server Response:', result);

      setFormData({
        companyName: '',
        jobDescription: '',
        applicationDeadline: '',
        driveDate: '',
        jobApplicationLink: '',
      });
      navigate('/jobs');
      
    } catch (error) {
      console.error('Error submitting the form:', error);
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
        color: '#fff',
        opacity: 0.9,
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>
        Job Application Form
      </Typography>
      
      <TextField
        required
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: '#ffffff' },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#d1cfe2' },
            '&.Mui-focused fieldset': { borderColor: '#d1cfe2' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
        }}
      />
      
      <TextField
        required
        label="Job Description"
        name="jobDescription"
        multiline
        rows={4}
        value={formData.jobDescription}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: '#ffffff' },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#d1cfe2' },
            '&.Mui-focused fieldset': { borderColor: '#d1cfe2' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
        }}
      />
      
      <TextField
        required
        label="Application Deadline"
        name="applicationDeadline"
        type="date"
        InputLabelProps={{
          shrink: true,
          style: { color: '#ffffff' },
        }}
        value={formData.applicationDeadline}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#d1cfe2' },
            '&.Mui-focused fieldset': { borderColor: '#d1cfe2' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
        }}
      />
      
      <TextField
        required
        label="Date of Drive"
        name="driveDate"
        type="date"
        InputLabelProps={{
          shrink: true,
          style: { color: '#ffffff' },
        }}
        value={formData.driveDate}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#d1cfe2' },
            '&.Mui-focused fieldset': { borderColor: '#d1cfe2' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
        }}
      />

      <TextField
        required
        label="Job Application Link"
        name="jobApplicationLink"
        type="url"
        InputLabelProps={{
          style: { color: '#ffffff' },
        }}
        value={formData.jobApplicationLink}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#d1cfe2' },
            '&.Mui-focused fieldset': { borderColor: '#d1cfe2' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
        }}
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ 
          marginTop: '16px', 
          backgroundColor: '#3f51b5', 
          '&:hover': { backgroundColor: '#303f9f' }
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
