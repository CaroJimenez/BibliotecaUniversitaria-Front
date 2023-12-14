import React, { useState, useContext } from "react";
import { limpiarDatosLocales, THEME } from "../utils/constants";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import ThemeContext from "./ThemeContext";

const NavbarAdmin = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState(THEME);
  const navigate = useNavigate();

  function logout() {
    navigate("/list_books");
    limpiarDatosLocales();
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${theme} fondoNavbar-${theme}`}
    >
      <a href="/list_books" className="navbar-brand" style={{ float: "left" }}>
        LogoAdmin
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{ textAlign: "right" }}
      >
        <ul className="navbar-nav d-flex justify-content-end">
          <li className="nav-item">
            <a href="/multas" className="nav-link">
              Multas
            </a>
          </li>
          <li className="nav-item">
            <a href="/solicitudes_prestamos" className="nav-link">
              Préstamos
            </a>
          </li>
          <li className="nav-item">
            <a href="/devoluciones_libros" className="nav-link">
              Devoluciones
            </a>
          </li>
          <li className="nav-item">
            <a href="/perfil" className="nav-link">
              Perfil
            </a>
          </li>
          <li className="nav-item">
            <a href="/perfil" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            {/* <button onClick={handleThemeChange}>Cambiar tema</button> */}
          </li>
          <li className="nav-item">
            <Button onClick={logout}>Cerrar sesión</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
