import React, { useState } from "react";
import "./ViewFinesBooks.css";

function ViewFinesBooks() {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      libro: "Libro 1",
      matriculaEstudiante: "12345",
      diasRetraso: 5,
      multa: 15,
    },
    {
      libro: "Libro 2",
      matriculaEstudiante: "67890",
      diasRetraso: 3,
      multa: 10,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.libro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.matriculaEstudiante.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Multas</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Matricula estudiante</th>
              <th>Días de retraso</th>
              <th>Multa</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.libro}</td>
                <td>{item.matriculaEstudiante}</td>
                <td>{item.diasRetraso}</td>
                <td>${item.multa}</td>
                <td>
                  <button className="accept-button">Pagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ViewFinesBooks;
