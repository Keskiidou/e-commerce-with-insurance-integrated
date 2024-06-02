import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";

const Team = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/team");
      const data = response.data;
      const modifiedData = data.map(row => ({ ...row, id: row._id }));
      setAdminData(modifiedData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };


  const handleDelete = async (adminId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/team/${adminId}`);
      console.log("Deleted: ", response);
      if (response.status === 200) {
        await fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Admin has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the admin.",
        icon: "error"
      });
    }
  };
  const handleEdit = async (adminId) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Admin",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name">
        <input id="swal-last-name" class="swal2-input" placeholder="Last Name">
        <input id="swal-email" class="swal2-input" placeholder="Email">
        <input id="swal-contact" class="swal2-input" placeholder="Contact">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          newName: document.getElementById("swal-name").value,
          newLastName: document.getElementById("swal-last-name").value,
          newEmail: document.getElementById("swal-email").value,
          newContact: document.getElementById("swal-contact").value
        };
      }
    });
  
    if (formValues) {
      try {
        const response = await axios.put(`http://localhost:7000/team/${adminId}`, formValues);
        console.log("Updated: ", response);
        if (response.status === 200) {
          await fetchData(); 
          Swal.fire({
            title: "Updated!",
            text: "Admin has been updated.",
            icon: "success"
          });
        } else {
          throw new Error('Failed to update admin');
        }
      } catch (error) {
        console.error('Error updating admin:', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update the admin.",
          icon: "error"
        });
      }
    }
  };
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        const isAdmin = row.role && row.role !== "user";
        const backgroundColor = isAdmin ? colors.greenAccent[600] : colors.blueAccent[700];
        const icon = isAdmin ? <AdminPanelSettingsOutlinedIcon /> : <LockOpenOutlinedIcon />;
        const accessText = isAdmin ? row.role : "User";

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={backgroundColor}
            borderRadius="4px"
          >
            {icon}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessText}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={adminData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
