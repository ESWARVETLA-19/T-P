import React from "react";
import { Container, Grid } from "@mui/material";
import CustomCard from "../components/Cards/StudentServiceCard";
import Title from "../components/Title";
import { useSelector } from "react-redux";
const Section8 = () => {
    const reg_no = useSelector((store) => store.user.users.regno);
  const cardsData = [
    {
      title: "Student Jobs",
      subtitle: "Explore available student jobs.",
      image: "/images/student_jobs.jpg", 
      link: "/student_jobs",
    },
    {
      title: "Mock Data",
      subtitle: "Access mock data for practice.",
      image: "/images/mock_data.jpg", 
      link: `/results/${reg_no}`,
    },
    {
      title: "Resumes",
      subtitle: "Build and manage your resumes.",
      image: "/images/resumes.jpg", 
      link: "/resumes",
    },
  ];

  return (
    <Container sx={{ mt: { xs: 2, md: 10, lg: 15 }, pb: 2 }}>
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 } }}>
        Explore Our Services
      </Title>

      <Grid container spacing={3}>
        {cardsData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <CustomCard {...item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section8;
