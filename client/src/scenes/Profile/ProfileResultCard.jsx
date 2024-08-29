import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileResultCard({ title, test }) {
  const testName = title;
  const testData = test;

  const hasData = testData && testData.total !== "-";

  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        margin: "12px", 
        backgroundColor: !hasData ? 'grey' : (testData.qualified === 'NOT QUALIFIED' ? '#ee4c4c' : 'green')
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: "bold" }} color="text.secondary" gutterBottom>
          {testName}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Marks: {hasData ? testData.total : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Max Marks: {hasData ? testData["max marks"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Time Spent: {hasData ? testData["time spent"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Questions Count: {hasData ? testData["ques count"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Attempted Questions: {hasData ? testData["attempted ques"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Accuracy: {hasData ? testData.accuracy.toFixed(2) + '%' : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Tab Switches: {hasData ? testData["tab switches"] : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}
