import {
  Box,
  useTheme,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Team = () => {
  const theme = useTheme();
  const user = useSelector((store) => store.user.users);
  const [mockData, setMockData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [driveCount, setDriveCount] = useState(3);

  useEffect(() => {
    getMockData();
  }, []);

  const getMockData = async () => {
    const response = await fetch("http://127.0.0.1:8000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user["regno"],
      }),
    });
    const data = await response.json();
    setMockData(data);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setMockData((prevData) =>
      prevData.map((row) => ({
        ...row,
        ...Array.from({ length: driveCount }, (_, i) => `drive${i + 1}`).reduce(
          (acc, drive) => ({
            ...acc,
            [drive]: isChecked,
          }),
          {}
        ),
        selected: isChecked,
      }))
    );
  };

  const handleCheckboxChange = (rowId, drive) => (event) => {
    const { checked } = event.target;
    setMockData((prevData) =>
      prevData.map((row) =>
        row.reg_no === rowId ? { ...row, [drive]: checked } : row
      )
    );
  };

  const handleSelectedChange = (rowId) => (event) => {
    const { checked } = event.target;
    setMockData((prevData) =>
      prevData.map((row) => {
        if (row.reg_no === rowId) {
          const updatedRow = {
            ...row,
            selected: checked,
            ...Array.from({ length: driveCount }, (_, i) => `drive${i + 1}`).reduce(
              (acc, drive) => ({
                ...acc,
                [drive]: checked,
              }),
              {}
            ),
          };
          return updatedRow;
        }
        return row;
      })
    );
  };

  const columns = [
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "reg_no",
      headerName: "Reg. No.",
      flex: 1,
    },
    ...Array.from({ length: driveCount }, (_, i) => ({
      field: `drive${i + 1}`,
      headerName: `Drive ${i + 1}`,
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          checked={params.row[`drive${i + 1}`] || false}
          onChange={handleCheckboxChange(params.row.reg_no, `drive${i + 1}`)}
        />
      ),
    })),
    {
      field: "selected",
      headerName: "Selected",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.selected || false}
          onChange={handleSelectedChange(params.row.reg_no)}
        />
      ),
    },
  ];

  const handleSubmit = () => {
    const results = mockData.map((row) => {
      const checkedDrives = Array.from(
        { length: driveCount },
        (_, i) => `drive${i + 1}`
      ).filter((drive) => row[drive]);

      return {
        reg_no: row.reg_no,
        companyName,
        checkedDrives: checkedDrives.length,
        selected: row.selected || false,  // Include selected field in the output data
        noOfDrives: driveCount,
      };
    });

    fetch("http://127.0.0.1:8000/add_drive_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        results: results,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    console.log("Submission Data:", results);
  };

  return (
    <Box m="20px">
      <Header title="Drives Data" subtitle="Students Drives List" />
      <Box mb={2}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Select
          value={driveCount}
          onChange={(e) => setDriveCount(e.target.value)}
          fullWidth
          margin="normal"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num} Drives
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
          }
          label="Select All"
        />
      </Box>
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
            color: theme.palette.success.main,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.dark,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.primary.dark,
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.success.light} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockData}
          columns={columns}
          getRowId={(row) => row.reg_no}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#67a761",
            padding: "6px 50px",
            margin: "0px 15px",
            "&:hover": {
              backgroundColor: "#558c4f",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Team;
