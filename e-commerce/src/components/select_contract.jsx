import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ContractSelect() {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true;

    const getContracts = async () => {
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:7000/contract/allcontracts');
        if (componentMounted) {
          setContracts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch contracts: ', error);
      }
    };

    getContracts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    setSelectedContract(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Contract </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedContract}
          label="Contract"
          onChange={handleChange}
        >
          {contracts.map((contract, index) => (
            <MenuItem key={index} value={contract.price}>
              {contract.name}
            </MenuItem>
          ))}
        </Select>
        {selectedContract && (
          <MenuItem disabled style={{ fontStyle: 'italic', fontWeight: 900, color: '000' }}>
            Selected Contract Value: {selectedContract} DT/jour
          </MenuItem>
        )}


      </FormControl>
    </Box>  
  );
}

export default ContractSelect;
