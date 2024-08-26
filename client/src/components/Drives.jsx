import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Drives = ({ data }) => {
  const rows = Object.entries(data).map(([key, value], index) => {
    if (typeof value === "object") {
      return {
        id: index + 1,
        name: key,
        checkedDrives: value.checkedDrives,
        noOfDrives: value.noOfDrives,
        selected: value.selected ? "Yes" : "No", 
        
      };
    } else {
      return {
        id: index + 1,
        name: key,
        checkedDrives: value,
        noOfDrives: "N/A",
        selected: "N/A",
      };
    }
  });

  const columns = [
    { field: "name", headerName: "Drive Name", width: 250 },
    { field: "checkedDrives", headerName: "Selected Drives", width: 250 },
    { field: "noOfDrives", headerName: "Number of Drives", width: 250 },
    { field: "selected", headerName: "Selected", width: 250 },

  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />

    </div>
  );
};

export default Drives;
