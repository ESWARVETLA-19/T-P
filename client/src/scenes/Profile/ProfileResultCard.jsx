import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileResultCard({ title, test }) {
  const testName = title;
  const testData = test;

  const hasData = testData && testData.marks !== "-";

  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        margin: "12px", 
        backgroundColor: !hasData ? 'grey' : (testData.qualified === 'NOT QUALIFIED' ? '#ee4c4c' : 'green')
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {testName}
        </Typography>
        <Typography style={{ paddingBottom: "4px" }} variant="h6" component="div">
          Marks: {hasData ? testData.marks : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" }} variant="h6" component="div">
          Max Marks: {hasData ? testData.max : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" }} variant="h6" component="div">
          Percentage: {hasData ? testData.percentage : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" }} variant="h6" component="div">
          Qualified: {hasData ? testData.qualified : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" }} variant="h6" component="div">
          Status: {hasData ? testData.status : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}


