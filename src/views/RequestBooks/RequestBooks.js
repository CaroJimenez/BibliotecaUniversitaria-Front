import React, { useState } from "react";
import "./RequestBooks.css";

function RequestBooks() {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      libro: "Libro 1",
      matriculaEstudiante: "12345",
      nombreEstudiante: "Juan Pérez",
      limiteDias: 15,
    },
    {
      libro: "Libro 2",
      matriculaEstudiante: "67890",
      nombreEstudiante: "María Gómez",
      limiteDias: 10,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.libro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.matriculaEstudiante
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.nombreEstudiante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <main>
        <input
          type="text"
          placeholder="Buscar"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <h1>Solicitudes de préstamos</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Matricula estudiante</th>
              <th>Nombre estudiante</th>
              <th>Límite de días</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.libro}</td>
                <td>{item.matriculaEstudiante}</td>
                <td>{item.nombreEstudiante}</td>
                <td>{item.limiteDias}</td>
                <td>
                  <button className="accept-button">Aceptar</button>
                  <button className="reject-button">Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default RequestBooks;
