import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
export default function JobApplicationDisplay() {
    const formDataList = useSelector((store) => store.data.formDataList);
  
    if (!formDataList || formDataList.length === 0) {
      return <Typography>No data available</Typography>;
    }
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        {formDataList.map((data, index) => (
          <Card 
            key={index} 
            sx={{ 
              width: '100%', 
              maxWidth: '600px', 
              marginBottom: 2, 
              backgroundColor: '#e0e0f8', 
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {data.companyName}
              </Typography>
              <Typography variant="body1">
                Job Description: {data.jobDescription}
              </Typography>
              <Typography variant="body1">
                Application Deadline: {data.applicationDeadline}
              </Typography>
              <Typography variant="body1">
                Date of Drive: {data.driveDate}
              </Typography>
              <Typography variant="body1">
                Job Application Link: <a href={data.jobApplicationLink} target="_blank" rel="noopener noreferrer">{data.jobApplicationLink}</a>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }
  