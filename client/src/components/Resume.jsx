import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";

const Resume = ({ data }) => {
  // Extracting the documents array from the data prop
  const documents = data.documents;

  // Mapping the documents to create a dictionary of resume types and URLs
  const resumes = {};
  documents.forEach((doc) => {
    resumes[doc.type] = doc.url;
  });

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: "#5c56cb", 
          color: "#ffffff",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Resumes
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
          {/* Normal Resume Card */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7", // Purple color for the cards
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            {resumes.normalResume ? (
              <Link
                href={resumes.normalResume}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#ffffff", textDecoration: "none" }}
              >
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                  View Normal Resume
                </Button>
              </Link>
            ) : (
              <Typography>No Normal Resume Uploaded</Typography>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Normal Resume
            </Typography>
          </Box>

          {/* Salesforce Resume Card */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7", // Purple color for the cards
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            {resumes.salesforceResume ? (
              <Link
                href={resumes.salesforceResume}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#ffffff", textDecoration: "none" }}
              >
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                  View Salesforce Resume
                </Button>
              </Link>
            ) : (
              <Typography>No Salesforce Resume Uploaded</Typography>
            )}
            <Typography variant="caption" display="block" align="center" mt={1}>
              Salesforce Resume
            </Typography>
          </Box>

          {/* Pega Resume Card */}
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#673ab7", // Purple color for the cards
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            {resumes.pegaResume ? (
              <Link
                href={resumes.pegaResume}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#ffffff", textDecoration: "none" }}
              >
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                  View Pega Resume
                </Button>
              </Link>
            ) : (
              <Typography>No Pega Resume Uploaded</Typography>
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

export default Resume;
