import React from 'react';
import TextField from '@mui/material/TextField';
import style from './Input.module.css'

const Input = ({ label, value, onChange, placeholder, onKeyDown }) => {

  return (
    <TextField className={style.input}
      type="text"
      onKeyDown={onKeyDown}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}

    />
  );
}

export default Input;
