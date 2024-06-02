import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RedStar = styled('span')({
  color: 'red',
});

const Claim = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const purchaseId = searchParams.get('purchaseId');

  const storedEmail = localStorage.getItem('email');
  const [email, setEmail] = useState(storedEmail || '');
  const [description, setDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSelectedIssue(name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:7000/claim/sendclaim/${purchaseId}`, {
        email,
        issue: selectedIssue,
        description:description
      });
      console.log(response.data);
      setSuccessMessage('Claim submitted successfully.');
      setError('');
      // Clear form fields after successful claim
      setEmail('');
      setDescription('');
      setSelectedIssue(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit claim. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">CLAIM</h1>
        <hr />

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <Typography variant="subtitle1" gutterBottom>
                Email<RedStar>*</RedStar>
              </Typography>
              <div className="mb-3">
                <TextField
                  id="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <Typography variant="subtitle1" gutterBottom>
                Issues<RedStar>*</RedStar>
              </Typography>
              <Box sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 2, mb: 3 }}>
                <FormGroup>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedIssue === "Stolen"} onChange={handleCheckboxChange} name="Stolen" />}
                        label="stolen"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedIssue === "Malfunctioning"} onChange={handleCheckboxChange} name="Malfunctioning" />}
                        label="malfunctioning"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedIssue === "Damaged"} onChange={handleCheckboxChange} name="Damaged" />}
                        label="damaged"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Description<RedStar>*</RedStar>
              </Typography>
              <div className="mb-3">
                <TextField
                  id="description"
                  label="Description"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-outline-dark m-2">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Claim;
