import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { applyForJob } from '../utils/jobApplications';

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reg_no = useSelector((store) => store.user.users.regno);
  const [formData, setFormData] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get_job_application/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching job application data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasApplied) {
      const applicationData = {
        company_name: formData.company_name,
        applied: hasApplied,
        reg_no: reg_no,
        date_applied: new Date().toISOString().split('T')[0],
        job_id: id, 
        has_applied: true, 
      };
      console.log(applicationData);

      try {
        const response = await fetch('http://127.0.0.1:8000/submit_application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        navigate('/student_jobs');
      } catch (error) {
        console.error('Error submitting application data:', error);
      }
    } else {
      alert("Please confirm that you have applied.");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Apply for {formData.company_name}
      </Typography>

      <Typography variant="body1" paragraph>
        {formData.job_description}
      </Typography>

      <Typography variant="body1" paragraph>
        Application Deadline: {formData.application_deadline}
      </Typography>

      <Typography variant="body1" paragraph>
        Date of Drive: {formData.drive_date}
      </Typography>

      <Typography variant="body1" paragraph>
        Job Application Link: <a href={formData.job_application_link} target="_blank" rel="noopener noreferrer">{formData.job_application_link}</a>
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={hasApplied}
            onChange={(e) => setHasApplied(e.target.checked)}
            color="primary"
          />
        }
        label="I have applied"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!hasApplied}
        sx={{ marginTop: '16px' }}
      >
        Submit Application
      </Button>
    </Box>
  );
}
