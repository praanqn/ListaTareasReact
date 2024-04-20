import React from 'react';
import CBox from '@mui/material/Checkbox';

const Checkbox = ({ label, value, onChange, checked }) => {
  return (
    <CBox
      value={value}
      onChange={onChange}
      checked={checked}
            
    />
  );
}

export default Checkbox;
