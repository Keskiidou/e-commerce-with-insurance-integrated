import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import Swal from "sweetalert2";

const Contacts = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/contacts");
      const modifiedUserData = response.data.map(user => ({
        ...user,
        id: user._id
      }));
      setUserData(modifiedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:7000/contacts/${userId}`);
    console.log("Deleted: ", response);
    if (response.status === 200) {
      await fetchData();
      Swal.fire({
        title: "Deleted!",
        text: "user has been deleted.",
        icon: "success"
      });
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the user.",
      icon: "error"
    });
  }
};

const handleEdit = async (UserId) => {
  const { value: formValues } = await Swal.fire({
    title: "Edit User",
    html: `
      <input id="swal-name" class="swal2-input" placeholder="Name">
      <input id="swal-email" class="swal2-input" placeholder="Email">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      return {
        newName: document.getElementById("swal-name").value,
        newEmail: document.getElementById("swal-email").value,
      };
    }
  });

  if (formValues) {
    try {
      const response = await axios.put(`http://localhost:7000/contacts/${UserId}`, formValues);
      console.log("Updated: ", response);
      if (response.status === 200) {
        await fetchData(); 
        Swal.fire({
          title: "Updated!",
          text: "user has been updated.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the user.",
        icon: "error"
      });
    }
  }
};
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={()=>handleEdit(row.id)}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="USERS"
        subtitle="List of The USERS"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={userData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Contacts;
