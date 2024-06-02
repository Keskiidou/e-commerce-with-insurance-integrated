import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BasicSelect({ value, onChange }) {
  return (
    <Box sx={{minWidth: 50  }} >
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" > Category </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Category"
          onChange={onChange}
          sx={{ '& .MuiSelect-root': { color: 'red' } }}
        >
          <MenuItem value={1}>Phones</MenuItem>
          <MenuItem value={2}>Computers</MenuItem>
          <MenuItem value={3}>Household</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
