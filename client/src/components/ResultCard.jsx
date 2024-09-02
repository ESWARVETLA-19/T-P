import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ResultCard({ title, test }) {
  const testName = title;
  const testData = test;

  const hasData = testData && testData.total !== "-";

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "12px",
        backgroundColor: !hasData
          ? "grey"
          : testData.qualified === "NOT QUALIFIED"
          ? "#ee4c4c"
          : "green",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          {testName}
        </Typography>

        {hasData ? (
          Object.entries(testData).map(([key, value]) => (
            <Typography
              key={key}
              style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }}
              variant="h6"
              component="div"
            >
              {`${key}: ${value}`}
            </Typography>
          ))
        ) : (
          <Typography
            style={{ paddingBottom: "4px", fontSize: 15, color: "#ffffff" }}
            variant="h6"
            component="div"
          >
            No Data Available
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
