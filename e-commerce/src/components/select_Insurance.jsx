import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BasicSelect() {
  const [insurance, setInsurance] = React.useState('');

  const handleChange = (event) => {
    setInsurance(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="insurance-label">Insurance</InputLabel>
        <Select
          labelId="insurance-label"
          id="insurance"
          value={insurance}
          onChange={handleChange}
          label="Insurance"
        >
          <MenuItem value={1}>Buy with Insurance</MenuItem>
          <MenuItem value={0}>Buy without Insurance</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
