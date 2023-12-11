import React from "react";

const MyCard = ({ id, title, content, imagen }) => {
  function SolicitarLibro() {
    console.log("Solicitar Libro con ID: " + content);
  }

  // const CalculateAxios = async () => {
  //   if (pointA && pointB) {
  //     const jsonData = { time_of_trip: durationMin };

  //     try {
  //       const cost_fee = await calculateCost(jsonData);
  //       setCost(cost_fee);
  //       setModalCost(true);
  //     } catch (error) {
  //       // Manejar el error
  //       console.error("Error al calcular el costo:", error);
  //     }
  //   }
  // };

  return (
    <div
      className="card text-center"
      style={{ width: "20rem", marginBottom: "20px" }}
    >
      <div className="card-body">
        <div className="text-center d-flex justify-content-center align-items-center" style={{padding: "50px"}}>
          <img
            src={imagen? imagen: "https://cdn-icons-png.flaticon.com/512/207/207114.png"}
            alt="portada_libro"
            style={{ width: "200px", height: "300px" }}
          />
        </div>
        <h5 style={{color: "darkblue"}} className="card-title">{title}</h5>
        <p style={{color: "blue"}} className="card-text">{content}</p>
        <button className="buttonLogin" onClick={SolicitarLibro}>
          Ver más información
        </button>
      </div>
    </div>
  );
};

export default MyCard;
