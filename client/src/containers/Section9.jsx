import { Container, Grid } from "@mui/material";
import React from "react";
import ServiceCard from "../components/Cards/ServiceCard";
import Title from "../components/Title";
import { section9Content } from "../utils/content";

const { title, ITEMS } = section9Content;

const Section9 = () => {
  return (
    <Container sx={{ mt: { xs: 2, md: 10, lg: 15 }, pb: 2 }}>
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 } }}>
        {title}
      </Title>

      <Grid container spacing={3}>
        {ITEMS.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <ServiceCard {...item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section9;
