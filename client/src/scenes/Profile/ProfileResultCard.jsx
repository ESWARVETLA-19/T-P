import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ResultCard({ title, test }) {
  const testName = title;
  const testData = test;

  const hasData = testData && testData.Total !== "-";

  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        margin: "12px", 
        backgroundColor: !hasData ? 'grey' : (testData.Qualified === 'NOT QUALIFIED' ? '#ee4c4c' : 'green')
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight : "bold"}} color="text.secondary" gutterBottom>
          {testName}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontWeight : "12px", fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Marks: {hasData ? testData.Total : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Max Marks: {hasData ? testData["Max Marks"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }} variant="h6" component="div">
          Negative Marks: {hasData ? testData.Negative : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" , fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Time Spent: {hasData ? testData["Time Spent"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" , fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Questions Count: {hasData ? testData["Ques Count"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" , fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Attempted Questions: {hasData ? testData["Attempted Ques"] : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" , fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Accuracy: {hasData ? testData.Accuracy.toFixed(2) + '%' : 'N/A'}
        </Typography>
        <Typography style={{ paddingBottom: "4px" , fontSize: 15, color: "#ffffff"}} variant="h6" component="div">
          Tab Switches: {hasData ? testData["Tab Switches"] : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}
