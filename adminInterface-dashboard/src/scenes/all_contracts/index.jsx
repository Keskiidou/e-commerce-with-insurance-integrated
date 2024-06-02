import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";

const AllContracts = () => {
  const [contractData, setContractData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/contract/allcontracts");
      const data = response.data;
      const modifiedData = data.map(row => ({ ...row, id: row._id }));
      setContractData(modifiedData);
    } catch (error) {
      console.error('Error fetching Contract data:', error);
    }
  };
  const handleDelete = async (contractId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/contract/deleteContract/${contractId}`);
      console.log("Deleted: ", response);
      if (response.status === 200) {
        await fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Contract has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to delete Contract');
      }
    } catch (error) {
      console.error('Error deleting Contract:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the Contract.",
        icon: "error"
      });
    }
  };
  const handleEdit = async (contractId) => {
    const contract = contractData.find((contract) => contract.id === contractId);

    const { value: formValues } = await Swal.fire({
      title: "Edit Contract",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${contract.name}">
        <input id="swal-price" class="swal2-input" placeholder="Price" value="${contract.price}">
        <input id="swal-description" class="swal2-input" placeholder="Description" value="${contract.description}">
      
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          price: document.getElementById("swal-price").value,
          description: document.getElementById("swal-description").value,
         
        };
      }
    });

    if (formValues) {
      try {
        const response = await axios.put(`http://localhost:7000/contract/updateContract/${contractId}`, formValues);
        console.log("Updated: ", response);
        if (response.status === 200) {
          await fetchData(); 
          Swal.fire({
            title: "Updated!",
            text: "contract has been updated.",
            icon: "success"
          });
        } else {
          throw new Error('Failed to update contract');
        }
      } catch (error) {
        console.error('Error updating contract:', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update the contract.",
          icon: "error"
        });
      }
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
 
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
   
    {
      field: "upd/del",
      headerName: "upd/del",
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
    <Box m="10px">
      <Header title="Contracts" subtitle="Managing the Contracts " />
      <Box
      style={{ padding: "20px" }}
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            lineHeight: "300rem", 
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
        <DataGrid checkboxSelection rows={contractData} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllContracts;
