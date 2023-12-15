import React from "react";

const MyCard = ({ id, title, content, imagen, disponibility }) => {
  function SolicitarLibro() {
    console.log("Solicitar Libro con ID: " + id);
  }

  

  return (
    <div
      className="card text-center"
      style={{ width: "20rem", marginBottom: "20px", height: "575px" }}
    >
      <div className="card-body">
        <div className="text-center d-flex justify-content-center align-items-center" style={{padding: "50px"}}>
          <img
            src={imagen? imagen: "https://i.pinimg.com/originals/1f/1a/af/1f1aaf6f0497a5a241f5c2a5abe9af3d.jpg"}
            alt="portada_libro"
            style={{ width: "200px", height: "300px" }}
          />
        </div>
        <h5 style={{color: "darkblue"}} className="card-title">{title}</h5>
        <p style={{color: "blue"}} className="card-text description">{content}</p>
        <h5 className="disponibility">{disponibility}</h5>
        <button className="buttonLogin" onClick={SolicitarLibro}>
          Ver más información
        </button>
      </div>
    </div>
  );
};

export default MyCard;
