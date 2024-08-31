import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  facultyCard: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  facultyAvatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function About() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
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
            <Card className={classes.facultyCard}>
              <Avatar src={faculty.imageUrl} alt={faculty.name} className={classes.facultyAvatar} />
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
