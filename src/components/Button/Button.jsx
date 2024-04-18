import Boton from '@mui/material/Button';
import React from 'react';

import style from "./Button.module.css";

const Button = ({ text, onClick }) => {
    return (
      <Boton variant="contained"  onClick={onClick} className={style.button}>
        {text}
      </Boton>
    );
  };
  
export default Button;