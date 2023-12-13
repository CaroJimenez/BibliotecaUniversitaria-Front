import React from "react";
import "./BookLoanRequest.css";
import Navbar from "../../components/Navbar";

function BookLoanRequest() {
  return (
    <div className="book-loan-request">
      <Navbar />
      <h1 className="title">Solicitar Préstamo</h1>
      <div className="book-info">
        <img
          src="https://pbs.twimg.com/media/FWEW5sqXkAAyCeK.jpg"
          alt="Imagen del libro"
          className="book-image"
        />
        <div className="info">
          <h2>Nombre del Libro</h2>
          <p>Autor: Autor del Libro</p>
          <p>Editorial: Editorial</p>
        </div>
      </div>
      <button className="request-button">Solicitar</button>
    </div>
  );
}

export default BookLoanRequest;
