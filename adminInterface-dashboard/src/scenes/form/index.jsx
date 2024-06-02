import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import BasicSelect from '../../components/select_role';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get('id');

  // Define constants for roles
  const WARDEN_ROLE = 'Warden_admin';
  const roles = [
    { value: 1, label: 'Shop_admin' },
    { value: 2, label: 'Insurance_admin' },
    { value: 3, label: 'Repair_admin' }
  ];

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mappedRole = mapRoleToLabel(role);
    axios.post('http://localhost:7000/form', { name, lastName, email, contact, password, repeatPassword, role: mappedRole })
      .then((result) => {
        console.log(result.data);
        setName("");
        setLastName("");
        setEmail("");
        setContact("");
        setPassword("");
        setRepeatPassword("");
        setRole('');
        setSuccessMessage("Agent created successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          console.error(err);
          alert('An error occurred. Please try again later.');
        }
      });
  };

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  const mapRoleToLabel = (role) => {
    switch (role) {
      case 1:
        return 'Shop_admin';
      case 2:
        return 'Insurance_admin';
      case 3:
        return 'Repair_admin';
      default:
        return '';
    }
  };

  // Determine available roles for selection based on the user's role
  const filteredRoles = userRole === WARDEN_ROLE ? roles : roles.filter(role => role.label === userRole);

  return (
    <Box m="20px">
      <Header title="CREATE AGENT" subtitle="Create a New Agent" />
      {successMessage && (
        <Box mb={2} color="success.main" textAlign="center">
          {successMessage}
        </Box>
      )}
      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            name="contact"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            name="address2"
            sx={{ gridColumn: "span 4" }}
          />
          <BasicSelect value={role} onChange={handleSelectChange} roles={filteredRoles} />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Agent
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
