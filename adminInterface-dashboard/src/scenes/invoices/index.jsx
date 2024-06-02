import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

const Invoices = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get('id');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [messageData, setmessageData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/invoices/${adminId}`);
      const data = response.data;
      const modifiedData = data.map(row => ({
       id: row._id,
        name: row.sender.name,
        email: row.sender.email,
        date: new Date(row.timestamp).toLocaleString(),
        message: row.message
      }));
      setmessageData(modifiedData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };
  const handleDelete = async (messageId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/invoices/${messageId}`);
      console.log("Deleted: ", response);
      if (response.status === 200) {
         fetchData(); 
        Swal.fire({
          title: "Deleted!",
          text: "Message has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the message.",
        icon: "error"
      });
    }
  };

  const handleEdit = (recipientEmail, recipientName) => {
    Swal.fire({
      title: "Send reply",
      html: `
        <input id="swal-reply" class="swal2-input" style="height: 100px;" placeholder="Reply Text">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          message: document.getElementById("swal-reply").value,
          email: recipientEmail,
          name: recipientName
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`http://localhost:7000/invoices`, result.value);
          console.log("Reply sent: ", response);
          if (response.status === 200) {
             fetchData(); 
            Swal.fire({
              title: "Sent!",
              text: "Reply message has been sent.",
              icon: "success"
            });
          } else {
            throw new Error('Failed to send reply message');
          }
        } catch (error) {
          console.error('Error sending reply message:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to send the reply message.",
            icon: "error"
          });
        }
      }
    });
  };
  const columns = [
    // { field: "id", headerName: "ID" },
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "message", headerName: "message", flex: 3 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEdit(row.email, row.name)}>
            Reply
          </Button>
        </>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Header title="Messages" subtitle="List of Messages " />
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

        <DataGrid checkboxSelection rows={messageData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
