import React, { useContext, useState, useRef } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Dropdown from 'react-bootstrap/Dropdown';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = localStorage.getItem('adminId');
  const dropdownRef = useRef(null); // Reference for dropdown menu

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    navigate("/login-admin");
  };

  const handleButtonClick = () => {
    // Toggle dropdown visibility
    setShowDropdown(prevState => !prevState);
  };

  const handleDropdownClose = (e) => {
    // Close dropdown when clicking outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* You can add content for the left side if needed */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Conditionally render dropdown or login link */}
        {isLoggedIn ? (
          <div ref={dropdownRef}>
            <Dropdown
              show={showDropdown}
              onClick={handleDropdownClose}
            >
              <Dropdown.Toggle as={IconButton} variant="secondary" onClick={handleButtonClick}>
                <PersonOutlinedIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item >Profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <IconButton component={Link} to="/login-admin">
            <PersonOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
