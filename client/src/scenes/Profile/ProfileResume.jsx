import React, { useState, useMemo } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const ProfileResume = ({ studentId }) => {

  const [resumes, setResumes] = useState({
    normalResume: null,
    salesforceResume: null,
    pegaResume: null,
  });

  // Memoizing the resumes object
  const memoizedResumes = useMemo(() => resumes, [resumes]);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setResumes({
      ...resumes,
      [type]: file,
    });
  };

  const handleUpload = (type) => {
    const formData = new FormData();
    formData.append("resume", memoizedResumes[type]);
    formData.append("student_id", studentId);
    console.log("FormData before upload:", formData); // Add this line

    fetch(`http://127.0.0.1:8000/upload/${type}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (type) => {
    fetch(`http://127.0.0.1:8000/delete/${type}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setResumes({
          ...resumes,
          [type]: null,
        });
        console.log("Resume deleted:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: "#5c56cb" }}>
        <Typography variant="h4" align="center" gutterBottom color="#ffffff">
          Resume Upload
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "normalResume")}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("normalResume")}
              disabled={!memoizedResumes.normalResume}
              sx={{ mb: 1 }}
            >
              Upload
            </Button>
            {memoizedResumes.normalResume && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete("normalResume")}
              >
                Delete
              </Button>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Normal Resume
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "salesforceResume")}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("salesforceResume")}
              disabled={!memoizedResumes.salesforceResume}
              sx={{ mb: 1 }}
            >
              Upload
            </Button>
            {memoizedResumes.salesforceResume && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete("salesforceResume")}
              >
                Delete
              </Button>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Salesforce Resume
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "pegaResume")}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("pegaResume")}
              disabled={!memoizedResumes.pegaResume}
              sx={{ mb: 1 }}
            >
              Upload
            </Button>
            {memoizedResumes.pegaResume && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete("pegaResume")}
              >
                Delete
              </Button>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Pega Resume
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileResume;
