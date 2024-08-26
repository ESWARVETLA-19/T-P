import React from 'react';
import Section1 from '../containers/Section1';
import Section2 from '../containers/Section2';
import Section9 from '../containers/Section9';
import Section11 from '../containers/Section11';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Section8 from '../containers/Section8';
const Body = () => {
  const isStudent = useSelector((store) => store.user.isStudent);
  return (
    <div>
      
      <Section1 />

      <Box sx={{ bgcolor: "#161b2d", minHeight: "100vh", pt: "20px" }}>
        <Section2 />
        {!isStudent ? (<Section9 />) : <Section8/>}
        <Section11 />
      </Box>
    </div>
  );
};

export default Body;
