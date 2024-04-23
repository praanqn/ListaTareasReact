import React from 'react';
import './Titulo.module.css'; // Archivo de estilos para el componente

const Titulo = ({ texto }) => {
  return (
    <h1 className="titulo">{texto}</h1>
  );
}

export default Titulo;