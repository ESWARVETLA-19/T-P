import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function StudentCard({details}) {
  return (
    <Box sx={{ minWidth: 275, margin:"12px"}}>
      <Card variant="outlined" style={{backgroundColor : "#5656c9"}}>
        <CardContent>
          <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
            {details.username}
            ({details.reg_no})
          </Typography>
          <Typography style={{paddingBottom : "4px"}}variant="h5" component="div">
            Email : {details.email}
          </Typography>
          <Typography style={{paddingBottom : "4px"}} variant="h5" component="div">
            Section : {details.batch}
          </Typography>
          <Typography style={{paddingBottom : "4px"}} variant="h5" component="div">
            Batch Year : {details.batch_year}
          </Typography>
        </CardContent>
       
      </Card>
    </Box>
  );
}
