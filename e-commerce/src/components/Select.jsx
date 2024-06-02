import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectAutoWidth = ({ onSelect }) => {
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    const selectedRole = event.target.value; 
    setRole(selectedRole); 
    onSelect(selectedRole); 
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={role}
          onChange={handleChange}
          autoWidth
          label="Role"
        >

          <MenuItem value="Warden_admin">Warden_admin</MenuItem> 
          <MenuItem value="Shop_admin">Shop_admin</MenuItem>
          <MenuItem value="Insurance_admin">Insurance_admin</MenuItem>
          <MenuItem value="Repair_admin">Repair_admin</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectAutoWidth;
