import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';

// Sample data for faculty members
const facultyData = [
  {
    name: 'Dr. John Doe',
    position: 'Professor & Head of Department',
    imageUrl: 'https://example.com/john_doe.jpg',
  },
  {
    name: 'Dr. Jane Smith',
    position: 'Assistant Professor',
    imageUrl: 'https://example.com/jane_smith.jpg',
  },
  {
    name: 'Dr. Emily Brown',
    position: 'Associate Professor',
    imageUrl: 'https://example.com/emily_brown.jpg',
  },
  // Add more faculty members as needed
];

function About() {
  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Our Department
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Department of Computer Science. Our department is dedicated to providing
        high-quality education and research opportunities in the field of computer science. Our
        faculty members are experts in their fields and are committed to fostering an environment
        of learning and innovation.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Meet Our Faculty
      </Typography>
      <Grid container spacing={4}>
        {facultyData.map((faculty, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                margin: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={faculty.imageUrl}
                alt={faculty.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h3">
                  {faculty.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {faculty.position}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
