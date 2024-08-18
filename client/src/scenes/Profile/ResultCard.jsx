import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, Grid } from '@mui/material';

const ResumeUpload = () => {
  const [resumes, setResumes] = useState({
    normalResume: null,
    salesforceResume: null,
    pegaResume: null,
  });

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setResumes({
      ...resumes,
      [type]: file,
    });
  };

  const handleUpload = (type) => {
    const formData = new FormData();
    formData.append('resume', resumes[type]);

    fetch(`http://127.0.0.1:8000/upload/${type}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDelete = (type) => {
    fetch(`http://127.0.0.1:8000/delete/${type}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setResumes({
          ...resumes,
          [type]: null,
        });
        console.log('Resume deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Resume Upload
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                onChange={(e) => handleFileChange(e, 'normalResume')}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('normalResume')}
                disabled={!resumes.normalResume}
              >
                Upload
              </Button>
              {resumes.normalResume && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete('normalResume')}
                >
                  Delete
                </Button>
              )}
            </Box>
            <Typography variant="caption" display="block" align="center" mt={1}>
              Normal Resume
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                onChange={(e) => handleFileChange(e, 'salesforceResume')}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('salesforceResume')}
                disabled={!resumes.salesforceResume}
              >
                Upload
              </Button>
              {resumes.salesforceResume && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete('salesforceResume')}
                >
                  Delete
                </Button>
              )}
            </Box>
            <Typography variant="caption" display="block" align="center" mt={1}>
              Salesforce Resume
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                onChange={(e) => handleFileChange(e, 'pegaResume')}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('pegaResume')}
                disabled={!resumes.pegaResume}
              >
                Upload
              </Button>
              {resumes.pegaResume && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete('pegaResume')}
                >
                  Delete
                </Button>
              )}
            </Box>
            <Typography variant="caption" display="block" align="center" mt={1}>
              Pega Resume
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ResumeUpload;
