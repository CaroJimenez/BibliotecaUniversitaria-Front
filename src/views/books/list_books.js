// Importa las dependencias necesarias de React
import React, { useState } from 'react';

// Componente principal
const LibrosVisualizados = () => {
  // Estado para rastrear si estás visualizando libros
  const [visualizandoLibros, setVisualizandoLibros] = useState(false);

  // Función para alternar el estado de visualización
  const alternarVisualizacion = () => {
    setVisualizandoLibros(!visualizandoLibros);
  };

  // Renderiza el componente
  return (
    <div>
      <h1>Libros Visualizados</h1>
      <p>Estado: {visualizandoLibros ? 'Visualizando libros' : 'No visualizando libros'}</p>
      <button onClick={alternarVisualizacion}>
        {visualizandoLibros ? 'Dejar de visualizar libros' : 'Comenzar a visualizar libros'}
      </button>
    </div>
  );
};

export default LibrosVisualizados;
