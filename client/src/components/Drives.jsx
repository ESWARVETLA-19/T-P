import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Drives = ({ data }) => {
  // If data is null, return a message or an empty table
  if (!data) {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={[]} columns={[]} pageSize={5} />
        <div>No data available</div>
      </div>
    );
  }

  // Determine the maximum number of rounds across all companies
  const maxRounds = Object.values(data).reduce((max, drive) => {
    return Math.max(max, drive.drives ? Object.keys(drive.drives).length : 0);
  }, 0);

  // Map over the data to create rows
  const rows = Object.entries(data).map(([key, value], index) => {
    const rounds = Array.from({ length: maxRounds }).reduce((acc, _, idx) => {
      const roundKey = Object.keys(value.drives || {})[idx];
      acc[`round${idx + 1}`] =
        roundKey && value.drives[roundKey]
          ? `${roundKey.charAt(0).toUpperCase() + roundKey.slice(1)}✔️`
          : "-";
      return acc;
    }, {});

    return {
      id: index + 1,
      name: key,
      ...rounds,
      selected: value.selected ? "✔️" : "-",
    };
  });

  // Define columns for rounds based on maxRounds
  const roundColumns = Array.from({ length: maxRounds }).map((_, idx) => ({
    field: `round${idx + 1}`,
    headerName: `Round ${idx + 1}`,
    width: 150,
  }));

  // Define all columns
  const columns = [
    { field: "name", headerName: "Company", width: 200 },
    ...roundColumns, // Fixed round columns
    { field: "selected", headerName: "Selected", width: 100 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default Drives;
