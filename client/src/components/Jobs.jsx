import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

export default function Jobs() {
  const [formDataList, setFormDataList] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const reg_no = useSelector((store) => store.user.users.regno);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_all_job_applications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormDataList(data);
      } catch (error) {
        console.error('Error fetching job application data:', error);
      }
    };

    const fetchAppliedApplications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_applied_applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reg_no: reg_no }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const appliedJobsData = data.reduce((acc, application) => {
          if (application.has_applied) {
            acc[application.job] = true;
          }
          return acc;
        }, {});
        setAppliedJobs(appliedJobsData);
      } catch (error) {
        console.error('Error fetching applied applications:', error);
      }
    };

    fetchJobsData();
    fetchAppliedApplications();
  }, [reg_no]);

  const handleExpandClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleApplyClick = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        Upcoming Drives
      </Typography>
      {formDataList.map((data, index) => (
        <Card
          key={data.id} 
          sx={{
            width: '100%',
            maxWidth: '600px',
            marginBottom: 2,
            backgroundColor: '#434398',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            position: 'relative',
          }}
          onClick={() => handleExpandClick(index)}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {data.company_name}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Job Description: {data.job_description}
            </Typography>
            {appliedJobs[data.id] && (
              <CheckIcon
                sx={{ color: 'green', position: 'absolute', top: '10px', right: '10px' }}
              />
            )}
          </CardContent>

          <Collapse in={expandedCard === index} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body1">
                Application Deadline: {data.application_deadline}
              </Typography>
              <Typography variant="body1">
                Date of Drive: {data.drive_date}
              </Typography>
              
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => handleApplyClick(data.id)}
                disabled={appliedJobs[data.id]} 
              >
                Apply
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
}
