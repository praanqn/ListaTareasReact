import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
