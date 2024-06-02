import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, MenuItem, Menu } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import Swal from "sweetalert2";

const Claims = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [messageData, setMessageData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:7000/claim/getclaims");
            const data = response.data;
            const modifiedData = data.map(row => ({
                id: row._id,
                senderName: row.sender ? row.sender.name : "Unknown", 
                productName: row.product ? row.product.name : "Unknown", 
                issue: row.issue,
                description: row.description,
                claimStatus: row.claimStatus,
            }));
            setMessageData(modifiedData);
        } catch (error) {
            console.error('Error fetching claims data:', error);
        }
    };

    const declineClaim = async () => {
        try {
            if (selectedRow) {
                await axios.put(`http://localhost:7000/claim/declineclaim/${selectedRow.id}`, { senderName: selectedRow.senderName });
                fetchData();
            }
        } catch (error) {
            console.error('Error declining claim:', error);
        }
    };
    const sendtoRepair = async () => {
        try {
            if (selectedRow) {
                await axios.post(`http://localhost:7000/claim/sendtorepair/${selectedRow.id}`);
                fetchData();

            }
        } catch (error) {
            console.error('Error declining claim:', error);
        }
    };
    const RepayClaim = async () => {
        try {
            if (selectedRow) {
                await axios.put(`http://localhost:7000/claim/repayclaim/${selectedRow.id}`, { senderName: selectedRow.senderName });
                fetchData();
            }
        } catch (error) {
            console.error('Error declining claim:', error);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        switch (option) {
            case 'Decline':
                declineClaim();
                break;
            case 'Repair':
                sendtoRepair();
                break;
            case 'Repay':
                RepayClaim();
                break;
            default:
                break;
        }
        handleMenuClose();
    };

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
    };

    const ViewContract = async (purchaseId) => {
        try {
            const response = await axios.get(`http://localhost:7000/claim/getdetails/${purchaseId}`);
            const contractDetails = response.data;

            const { name, description, vol, endDate } = contractDetails;

            await Swal.fire({
                title: "Purchase Details",
                html: `
                    <p><strong>Contract Name:</strong> ${name}</p>
                    <p><strong>Contract description:</strong> ${description}</p>
                    <p><strong>Theft Protection:</strong> ${vol}</p>
                    <p><strong>End Date:</strong> ${endDate}</p>
                `,
                confirmButtonText: "Close",
            });
        } catch (error) {
            console.error('Error fetching contract details:', error);
        }
    };

    const columns = [
        // { field: "id", headerName: "ID" },
        { field: "senderName", headerName: "Sender Name", flex: 1 },
        { field: "productName", headerName: "Product Name", flex: 1 },
        { field: "issue", headerName: "Issue", flex: 1 },
        { field: "description", headerName: "Description", flex: 3 },
        { field: "claimStatus", headerName: "claimStatus", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => ViewContract(row.id)}>
                            Details
                        </Button>
                        {row.claimStatus === 'In Treatment' && (
                            <>
                                <Button variant="contained" color="primary" onClick={handleMenuOpen}>
                                    Actions
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => { handleOptionSelect("Decline"); }}>Decline</MenuItem>
                                    <MenuItem onClick={() => { handleOptionSelect("Repair"); }}>Repair</MenuItem>
                                    <MenuItem onClick={() => { handleOptionSelect("Repay"); }}>Repay</MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];


    return (
        <Box m="20px">
            <Header title="CLAIMS" subtitle="List of Claims to treat " />
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
                <DataGrid checkboxSelection rows={messageData} columns={columns} onRowClick={handleRowClick} />
            </Box>
        </Box>
    );
};

export default Claims;
