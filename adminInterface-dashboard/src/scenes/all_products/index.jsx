import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";

const AllProducts = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/product/allproducts");
      const data = response.data;
      const modifiedData = data.map(row => ({ ...row, id: row._id }));
      setProductData(modifiedData);
    } catch (error) {
      console.error('Error fetching Product data:', error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/product/deleteProduct/${productId}`);
      console.log("Deleted: ", response);
      if (response.status === 200) {
        await fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to delete Product');
      }
    } catch (error) {
      console.error('Error deleting Product:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the Product.",
        icon: "error"
      });
    }
  };
  const handleEdit = async (productId) => {
    const product = productData.find((product) => product.id === productId);

    const { value: formValues } = await Swal.fire({
      title: "Edit Product",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${product.name}">
        <input id="swal-price" class="swal2-input" placeholder="Price" value="${product.price}">
        <input id="swal-category" class="swal2-input" placeholder="Category" value="${product.category}">
        <input id="swal-description" class="swal2-input" placeholder="Description" value="${product.description}">
        <input id="swal-imgID" class="swal2-input" placeholder="imgID" value="${product.imgID}">
        <input id="swal-stock" class="swal2-input" placeholder="Stock" value="${product.stock}">

      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          price: document.getElementById("swal-price").value,
          category: document.getElementById("swal-category").value,
          description: document.getElementById("swal-description").value,
          imgID: document.getElementById("swal-imgID").value,
          stock: document.getElementById("swal-stock").value,

        };
      }
    });

    if (formValues) {
      try {
        const response = await axios.put(`http://localhost:7000/product/updateproduct/${productId}`, formValues);
        console.log("Updated: ", response);
        if (response.status === 200) {
          await fetchData(); 
          Swal.fire({
            title: "Updated!",
            text: "Product has been updated.",
            icon: "success"
          });
        } else {
          throw new Error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update the product.",
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
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "imgID",
      headerName: "Image",
      flex: 1,
      renderCell: ({ value }) => (
<img src={value} alt="product image" style={{ width: 75 }} />
      ),
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
      <Header title="PRODUCTS" subtitle="Managing the PRODUCTS " />
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
        <DataGrid checkboxSelection rows={productData} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllProducts;
