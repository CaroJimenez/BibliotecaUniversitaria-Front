import "../../App.css";
import React, { useState, Alert } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faIdCard,
  faEnvelope,
  faCalendarAlt,
  faLock,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, modalNotVisible] = useState(false);
  const [modalContra, modalNoContra] = useState(false);
  function modalVisibles() {
    modalNotVisible(true);
  }
  function modalNotVisibles() {
    modalNotVisible(false);
  }

  function modalContras() {
    modalNoContra(true);
  }
  function modalNoContras() {
    modalNoContra(false);
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClick = () => {
    console.log("Iniciar sesión");
    // Puedes agregar lógica adicional aquí
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/libro.png" />
        <div className="form">
          <a className="titulo">
            Sistema de Gestión de Servicios de una Biblioteca Universitaria
          </a>
          <div className="textContainer">
            <a className="text">Matricula</a>
          </div>
          <div className="inputContainer">
            <input placeholder="Ingresa tu matricula" />
            <FontAwesomeIcon icon={faUser} className="faUser" />
          </div>
          <div className="passwordContainer">
            <a className="text">Contraseña</a>
          </div>
          <div className="inputContainer">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Contraseña"
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="eyeIcon"
            />
          </div>
          <div className="buttonContainer">
            <button className="buttonLogin" onClick={handleClick}>
              Iniciar sesión
            </button>
          </div>

          <div className="linkContainer">
            <a className="textLink" onClick={modalContras}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <a className="textLink" onClick={modalVisibles}>
            Registrarse
          </a>

          <Modal
            isOpen={modalContra}
            onRequestClose={modalNoContras}
            contentLabel="Example Modal"
            className="formModal"
          >
            <form>
              <div className="inputContainer">
                <div className="textModal">
                  <a className="text">Correo electrónico</a>
                </div>
                <input placeholder="ingresa tu correo electrónico..." />
                <FontAwesomeIcon icon={faEnvelope} className="faUser" />
                <div className="textModal">
                  <a className="text">Ingresa Token enviado</a>
                </div>
                <input placeHolder="Ingresa Token" />
              </div>
              <button className="cancelarModal" onClick={modalNoContras}>
                Cancelar
              </button>
            </form>
          </Modal>
          <Modal
            isOpen={modalVisible}
            onRequestClose={modalNotVisibles}
            contentLabel="Example Modal"
            className="formModal"
          >
            <form>
              <div className="inputContainer">
                <div className="textModal">
                  <a className="text">Nombre(s)</a>
                </div>
                <input placeholder="ingresa tu nombre..." />
                <FontAwesomeIcon icon={faUser} className="faUser" />
                <div className="textModal">
                  <a className="text">Apellido(s)</a>
                </div>
                <input placeholder="ingresa tus apellidos..." />
                <FontAwesomeIcon icon={faIdCard} className="faUser" />

                <div className="textModal">
                  <a className="text">Matricula</a>
                </div>
                <input placeholder="ingresa tu matricula..." />
                <FontAwesomeIcon icon={faEnvelope} className="faUser" />
                <div className="textModal">
                  <a className="text">Correo electrónico</a>
                </div>
                <input placeholder="ingresa tu correo electrónico..." />
                <FontAwesomeIcon icon={faLock} className="faUser" />
                <div className="textModal">
                  <a className="text">Fecha de nacimiento</a>
                </div>
                <input placeholder="ingresa tu fecha de nacimiento" />
                <FontAwesomeIcon icon={faCalendarAlt} className="faUser" />
                <div className="textModal">
                  <a className="text">Contraseña</a>
                </div>
                <input placeholder="ingresa tu contraseña..." />
                <FontAwesomeIcon icon={faKey} className="faUser" />
              </div>
            </form>
            <button onClick={modalNotVisibles} className="cancelarModal">
              Cancelar registro
            </button>
          </Modal>
        </div>
      </header>
    </div>
  );
}

export default Login;
