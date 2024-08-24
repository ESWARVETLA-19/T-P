import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Button from '@mui/material/Button';
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Team = () => {
  const user = useSelector((store) => store.user.users);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    getMockData();
  }, []);
console.log(user);
  const getMockData = async () => {
    const response = await fetch("http://127.0.0.1:8000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'user': user['regno'],
      }),
    });
    const data = await response.json();
    console.log(data);
    setMockData(data);
  };

  const columns = [
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "batch",
      headerName: "Batch",
      flex: 1,
    },
    {
      field: "batch_year",
      headerName: "Batch Year",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "reg_no",
      headerName: "Reg. No.",
      flex: 1,
    },
    {
      field: "view",
      headerName: "Result",
      flex: 1,
      renderCell: (params) => {
        const { reg_no } = params.row;
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button
              style={{ background: "#5656c9", color: "white", padding : "6px 50px"}}
              component={Link}
              to={`/teams/${reg_no}`}
              variant="outlined"
            >
              View Details
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Student" subtitle="Students details List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockData}
          columns={columns}
          getRowId={(row) => row.reg_no}
        />
      </Box>
    </Box>
  );
};

export default Team;
