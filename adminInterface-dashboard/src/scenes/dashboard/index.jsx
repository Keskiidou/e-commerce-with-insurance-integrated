import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import Header from "../../components/Header";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get('id');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfAdmins, setNumberOfAdmins] = useState(0);
  const [numberOfmessages, setNumberOfMessages] = useState(0);
  const [numberOfclaims, setNumberOfClaims] = useState(0);
  const [numberOfContract, setNumberOfContract] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [numberOfProductToRepair, setNumberOfProductToRepair] = useState(0);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchNumberOfUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/getusers");
        setNumberOfUsers(response.data.numberOfClients);
      } catch (error) {
        console.error("Error fetching number of users:", error);
      }
    };

    const fetchNumberOfAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:7000/getadmin");
        setNumberOfAdmins(response.data.numberOfAdmins);
      } catch (error) {
        console.error("Error fetching number of admins:", error);
      }
    };
    const fetchNumberOfMessagesbyRole = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/getmessages/${adminId}`);
        setNumberOfMessages(response.data.numberOfMessages);
      } catch (error) {
        console.error("Error fetching number of messages:", error);
      }
    };
    const fetchNumberOfClaims = async () => {
      try {
        const response = await axios.get("http://localhost:7000/claim/getnumberclaims");
        setNumberOfClaims(response.data.numberOfClaims);
      } catch (error) {
        console.error("Error fetching number of claims:", error);
      }
    };

    const fetchAdminRole = async () => {
      try {
        const response = await fetch(`http://localhost:7000/dashboard/${adminId}`);
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        } else {
          console.error("Failed to fetch admin role");
        }
      } catch (error) {
        console.error("Error fetching admin role:", error);
      }
    };
    const getnumberOfContract = async () => {
      try {
        const response = await axios.get("http://localhost:7000/contract/getnumbercontract");
        setNumberOfContract(response.data.numberOfContract);
      } catch (error) {
        console.error("Error fetching number of claims:", error);
      }
    };
    const fetchNumberOfProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/product/getnumberproducts");
        setNumberOfProduct(response.data.numberOfProducts);
      } catch (error) {
        console.error("Error fetching number of products:", error);
      }
    };
const fetchNumberOfProductsToRepair = async () => {
  try {
    const response = await axios.get("http://localhost:7000/repair/getNumberOfProductsToRepair");
    console.log(response.data);
    setNumberOfProductToRepair(response.data.numberOfProductsToRepair); 
  } catch (error) {
    console.error("Error fetching number of products to repair:", error);
  }
};

    fetchAdminRole();
    fetchNumberOfUsers();
    fetchNumberOfAdmins();
    fetchNumberOfMessagesbyRole();
    fetchNumberOfClaims();
    getnumberOfContract();
    fetchNumberOfProducts();
    fetchNumberOfProductsToRepair();
  }, [adminId]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {userRole === "Warden_admin" && (
          <>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center" color={colors.grey[100]}>
                <PersonAddIcon fontSize="large" />
                <div>Total Clients</div>
                <div>{numberOfUsers}</div>
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center" color={colors.grey[100]}>
                <AdminPanelSettingsIcon fontSize="large" />
                <div>Total Admins</div>
                <div>{numberOfAdmins}</div>
              </Box>
            </Box>
          </>
        )}
        {userRole === "Insurance_admin" && (
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color={colors.grey[100]}>
              <ReportProblemOutlinedIcon fontSize="large" />
              <div>Total Claims</div>
              <div>{numberOfclaims}</div>
            </Box>
          </Box>
        )}
        {userRole === "Insurance_admin" && (
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color={colors.grey[100]}>
              <ArticleIcon fontSize="large" />
              <div>Total Contract</div>
              <div>{numberOfContract}</div>
            </Box>
          </Box>
        )}
        {userRole === "Shop_admin" && (
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color={colors.grey[100]}>
              <Inventory2Icon fontSize="large" />
              <div>Total Products</div>
              <div>{numberOfProduct}</div>
            </Box>
          </Box>
        )}
        {userRole === "Repair_admin" && (
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color={colors.grey[100]}>
              <BuildOutlinedIcon fontSize="large" />
              <div>Total Products To Repair</div>
              <div>{numberOfProductToRepair}</div> 
            </Box>
          </Box>
        )}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box textAlign="center" color={colors.grey[100]}>
            <ForumTwoToneIcon fontSize="large" />
            <div>Total Messages</div>
            <div>{numberOfmessages}</div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
