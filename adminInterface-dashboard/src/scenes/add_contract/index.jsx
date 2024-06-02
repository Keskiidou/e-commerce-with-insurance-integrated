import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

const AddContractForm = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !price || !description) {
        setError("Please fill in all fields");
        return;
      }

      const data = {
        price: price,
        name: name,
        description: description
      };

      const response = await axios.post(
        "http://localhost:7000/contract/createContract",
        data
      );

      console.log("response is ", response.data);
      setSuccessMessage("Contract created successfully!");
      setPrice("");
      setName("");
      setDescription("");
      setError(null);
    } catch (err) {
      console.log("err adding new Contract ", err);
      setError("Error adding new Contract");
    }
  };

  return (
    <Box m="20px">
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Contract
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddContractForm;
