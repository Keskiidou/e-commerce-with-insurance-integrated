import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import Swal from "sweetalert2";

const ProductToRepair = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:7000/repair/getallrepairs");
            const data = response.data.map(row => ({ 
                id: row.repairId,
                productName: row.productName,
                status: row.status
            }));
            setProductData(data);
        } catch (error) {
            console.error('Error fetching Product data:', error);
        }
    };

    const handleRepair = async (repairID) => {
        try {
            const response = await axios.post(`http://localhost:7000/repair/itemrepaired/${repairID}`);
            console.log("Deleted: ", response);
            if (response.status === 200) {
                await fetchData();
                Swal.fire({
                    title: "Success!",
                    text: "The item has been marked as repaired.",
                    icon: "success"
                });
            } else {
                throw new Error('Failed to mark item as repaired');
            }
        } catch (error) {
            console.error('Error marking item as repaired:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to mark the item as repaired.",
                icon: "error"
            });
        }
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        // {
        //     field: "id",
        //     headerName: "ID",
        //     flex: 1,
        //     cellClassName: "name-column--cell",
        // },
        {
            field: "productName",
            headerName: "Product Name",
            flex: 1.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "Action",
            headerName: "Action",
            flex: 1,
            renderCell: ({ row }) => (
                <>
                    {row.status !== "repaired" && ( 
                        <Button variant="contained" color="secondary" onClick={() => handleRepair(row.id)}>
                            Mark as repaired
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <Box m="10px">
            <Header title="PRODUCTS TO REPAIR" subtitle="Managing the PRODUCTS TO REPAIR " />
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
                <DataGrid
                    checkboxSelection
                    rows={productData}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default ProductToRepair;
