
import React from "react";
import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArticleIcon from '@mui/icons-material/Article';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';



const Item = ({ title, to, icon, selected, setSelected, adminId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={`${to}?id=${adminId}`} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get('id');

  useEffect(() => {
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

    fetchAdminRole();
  }, [adminId]);


  const renderMenuItems = () => {
    if (userRole === "Repair_admin") {
      return (
        <>
          <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Data</Typography>

          <Item title="Items To repair" to="/reparables" icon={<BuildOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Messages" to="/invoices" icon={<ForumTwoToneIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
        </>
      );
    }  
    else if(userRole === "Shop_admin"){
      return (
        <>
          <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Data</Typography>

          <Item title="Add product" to="/add_product" icon={<BuildOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="All Products" to="/all_products" icon={<ForumTwoToneIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Messages" to="/invoices" icon={<ForumTwoToneIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />

          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
        </>
      );
    }

    else if(userRole === "Insurance_admin"){
      return (
        <>
          <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Data</Typography>

          <Item title="Add contract" to="/add_contract" icon={<NoteAddIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="All Contract" to="/all_contracts" icon={<ArticleIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Messages" to="/invoices" icon={<ForumTwoToneIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
            <Item title="claims" to="/claim" icon={<ReportProblemOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
        </>
      );
    }
    
    
    

    else {

      return (
        <>
          <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Data</Typography>
          <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Contacts Information" to="/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Messages" to="/invoices" icon={<ForumTwoToneIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
          <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} adminId={adminId} />
        </>
      );
    }

  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>ADMIN</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}><MenuOutlinedIcon /></IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {userRole !== null && renderMenuItems()}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
