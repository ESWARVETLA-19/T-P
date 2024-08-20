import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const ProfileResume = ({ studentId }) => {
  const [resumes, setResumes] = useState({
    normalResume: null,
    salesforceResume: null,
    pegaResume: null,
  });
  const [uploadMessage, setUploadMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch the existing resume data when the component mounts
    fetch(`http://127.0.0.1:8000/resumes/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an object with resume URLs or file paths
        setResumes({
          normalResume: data.normalResume || null,
          salesforceResume: data.salesforceResume || null,
          pegaResume: data.pegaResume || null,
        });
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
      });
  }, [studentId]);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setResumes({
      ...resumes,
      [type]: file,
    });
  };

  const handleUpload = (type) => {
    const formData = new FormData();
    formData.append("resume", resumes[type]);
    formData.append("student_id", studentId);

    fetch(`http://127.0.0.1:8000/upload/${type}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadMessage(`Successfully uploaded ${type} resume.`);
        setOpenSnackbar(true); // Show success message
        setResumes({
          ...resumes,
          [type]: data.fileUrl, // Assuming the server returns the file URL or identifier
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadMessage(`Failed to upload ${type} resume.`);
        setOpenSnackbar(true); // Show error message
      });
  };

  const handleDelete = (type) => {
    fetch(`http://127.0.0.1:8000/delete/${type}/${studentId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setResumes({
          ...resumes,
          [type]: null,
        });
        setUploadMessage(`Successfully deleted ${type} resume.`);
        setOpenSnackbar(true); // Show success message
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadMessage(`Failed to delete ${type} resume.`);
        setOpenSnackbar(true); // Show error message
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: "#512da8", // Dark purple color for the main background
          color: "#ffffff",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Resume Upload
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {/* Normal Resume Section */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "normalResume")}
              sx={{ mb: 2, backgroundColor: "#d1c4e9" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("normalResume")}
              disabled={!resumes.normalResume}
              sx={{ mb: 0, mr: 1 }}
            >
              Upload
            </Button>
            {resumes.normalResume && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete("normalResume")}
                  sx={{ mb: 1 }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  href={resumes.normalResume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>
              </>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Normal Resume
            </Typography>
          </Box>

          {/* Salesforce Resume Section */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "salesforceResume")}
              sx={{ mb: 2, backgroundColor: "#d1c4e9" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("salesforceResume")}
              disabled={!resumes.salesforceResume}
              sx={{ mb: 0, mr: 1 }}
            >
              Upload
            </Button>
            {resumes.salesforceResume && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete("salesforceResume")}
                  sx={{ mb: 1 }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  href={resumes.salesforceResume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>
              </>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Salesforce Resume
            </Typography>
          </Box>

          {/* Pega Resume Section */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => handleFileChange(e, "pegaResume")}
              sx={{ mb: 2, backgroundColor: "#d1c4e9" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload("pegaResume")}
              disabled={!resumes.pegaResume}
              sx={{ mb: 0, mr: 1 }}
            >
              Upload
            </Button>
            {resumes.pegaResume && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete("pegaResume")}
                  sx={{ mb: 1 }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  href={resumes.pegaResume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>
              </>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Pega Resume
            </Typography>
          </Box>
        </Box>

        {/* Snackbar for showing messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={uploadMessage.includes("failed") ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {uploadMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default ProfileResume;
