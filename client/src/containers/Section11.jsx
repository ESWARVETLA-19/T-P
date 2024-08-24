import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Title from "../components/Title";
import { Section11Content } from "../utils/content";

const { title, ITEMS } = Section11Content;

const Section11 = () => {
  return (
    <Container sx={{ my: { xs: 10, md: 20, lg: 25 } }} style={{display : "flex", flexDirection: "column", alignItems : "center"}} >
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 } }}>
        {title}
      </Title>

      <Grid
        container
        rowSpacing={6}
        spacing={3}
        sx={{ mb: 10, position: "relative" }}
      >
        {ITEMS.map(({ link, image }) => (
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box
              sx={{ cursor: "pointer", "&:hover": { filter: "contrast(40%)" } }}
            >
              <img
                src={image}
                alt=""
                style={{ maxHeight: "60px", objectFit: "contain" }}
              />
            </Box>
          </Grid>
        ))}

      
      </Grid>

    </Container>
  );
};

export default Section11;
