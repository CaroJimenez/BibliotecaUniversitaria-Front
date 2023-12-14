import "../../App.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faIdCard,
  faEnvelope,
  faCalendarAlt,
  faLock,
  faKey,
  faSpinner,
  faFont,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axios from "axios";
import swal from "sweetalert";
import {
  API_BASE_URL,
  DATA_,
  actualizarAlmacenamientoLocal,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../components/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricula, setMatricula] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, modalNotVisible] = useState(false);
  const [modalContra, modalNoContra] = useState(false);
  const [fuente, setFuente] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  // const { loogin } = useAuth();

  const incrementar = () => {
    setFuente(fuente + 1);
  };

  const decrementar = () => {
    setFuente(fuente - 2);
  };

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

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setMatricula("");
    setName("");
    setLastName("");
    setBirthday("");
  };

  const alerta = () => {
    swal({
      title: "¡Registro exitoso!",
      text: "¡Bienvenido a la biblioteca!",
      icon: "success",
      button: "Aceptar",
    });
  };

  const rechazado = () => {
    swal({
      title: "¡Error al registrar usuario!",
      text: "¡Intenta de nuevo!",
      icon: "error",
      button: "Aceptar",
    });
  };

  const handleClick = async () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      swal({
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.",
        icon: "error",
        button: "Aceptar",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(API_BASE_URL + "/api/auth/signup", {
        email,
        password,
        matricula,
        name,
        last_name,
        birthday,
      });

      swal({
        title: "¡Registro exitoso!",
        text: "¡Bienvenido a la biblioteca!",
        icon: "success",
        button: "Aceptar",
      });
    } catch (error) {
      swal({
        title: "¡Error al registrar usuario!",
        text: "¡Intenta de nuevo!",
        icon: "error",
        button: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const inicioSesion = (data) => {
    const userInfo = data.userInfo;
    console.log(userInfo);
    DATA_.push({
      id: userInfo.id,
      rol: userInfo.roles[0].pop(),
      jwtToken: data.jwtToken
    });
    actualizarAlmacenamientoLocal();
    swal({
      title: "¡Inicio se sesión exitoso!",
      text: "¡Bienvenido!",
      icon: "success",
      button: "Aceptar",
    });
    // Redireccionamos a la ruta deseada
    navigate("/list_books");
  };

  const noLogueado = () => {
    swal({
      title: "¡Error al iniciar sesión!",
      text: "¡Verifica bien tus datos!",
      icon: "error",
      button: "Aceptar",
    });
  };

  const iniciarSesion = async () => {
    try {
      setLoading2(true);
      const response = await axios.post(API_BASE_URL + "/api/auth/signin", {
        matricula,
        password,
      });
      inicioSesion(response.data);
    } catch (error) {
      console.log(error);
      noLogueado();
    } finally {
      setLoading2(false);
    }
  };

  const olvidarContraseña = async () => {
    try {
      setLoading3(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/all/forgot-password?email=${email}`
      );
    } catch (error) {
    } finally {
      setLoading3(false);
    }
  };

  const modificarContraseña = async () => {
    try {
      setLoading4(true);
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/all/reset-password?token=${token}&password=${password}`
      );
    } catch (error) {
    } finally {
      setLoading4(false);
    }
  };

  return (
    <div className="App">
      <button onClick={incrementar}>
        <FontAwesomeIcon icon={faFont} className="faUser" />
      </button>
      <button onClick={decrementar}>
        <FontAwesomeIcon icon={faCompress} className="faUser" />
      </button>
      <header className="App-header">
        <img src="/libro.png" alt="libro" />
        <div className="form">
          <a className="titulo" style={{ fontSize: `${fuente}px` }}>
            Sistema de Gestión de Servicios de una Biblioteca Universitaria
          </a>
          <div className="textContainer">
            <a className="text" style={{ fontSize: `${fuente}px` }}>
              Matricula
            </a>
          </div>

          <div className="inputContainer">
            <input
              placeholder="Ingresa tu matricula"
              value={matricula}
              onChange={(event) => setMatricula(event.target.value)}
              style={{ fontSize: `${fuente}px` }}
            />
            <FontAwesomeIcon icon={faUser} className="faUser" />
          </div>
          <div className="passwordContainer">
            <a className="text" style={{ fontSize: `${fuente}px` }}>
              Contraseña
            </a>
          </div>
          <div className="inputContainer">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña"
              style={{ fontSize: `${fuente}px` }}
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="eyeIcon"
            />
          </div>
          <div>
            <div
              className="buttonContainer"
              style={{ fontSize: `${fuente}px` }}
            >
              <button
                className="buttonLogin"
                style={{ fontSize: `${fuente}px` }}
                onClick={() => {
                  iniciarSesion();
                  clearFields();
                }}
              >
                {loading2 ? (
                  <>
                    <span>Cargando...</span>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ marginLeft: "8px" }}
                    />
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </div>

            <div className="linkContainer">
              <a
                className="textLink"
                onClick={modalContras}
                style={{ fontSize: `${fuente}px` }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <a
              className="textLink"
              onClick={modalVisibles}
              style={{ fontSize: `${fuente}px` }}
            >
              Registrarse
            </a>
          </div>
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
                <input
                  placeholder="ingresa tu correo electrónico..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <FontAwesomeIcon icon={faEnvelope} className="faUser" />
                <div className="token">
                  <button className="enviarToken" onClick={olvidarContraseña}>
                    {loading3 ? (
                      <>
                        <span>Enviando...</span>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{ marginLeft: "8px" }}
                        />
                      </>
                    ) : (
                      "Enviar Token"
                    )}
                  </button>
                </div>
                <div className="textModal">
                  <a className="text">Ingresa Token enviado</a>
                </div>
                <input
                  placeHolder="Ingresa Token"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                />
                <input
                  placeHolder="Ingresa nueva contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="botonesContainer">
                <button className="cancelarModal" onClick={modalNoContra}>
                  Cancelar
                </button>
                <button className="cancelarModal" onClick={modificarContraseña}>
                  {loading4 ? (
                    <>
                      <span>Modificando...</span>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        style={{ marginLeft: "8px" }}
                      />
                    </>
                  ) : (
                    "Modificar"
                  )}
                </button>
              </div>
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
                <input
                  placeholder="ingresa tu nombre..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <FontAwesomeIcon icon={faUser} className="faUser" />

                <div className="textModal">
                  <a className="text">Apellido(s)</a>
                </div>
                <input
                  placeholder="ingresa tus apellidos..."
                  value={last_name}
                  onChange={(event) => setLastName(event.target.value)}
                />
                <FontAwesomeIcon icon={faIdCard} className="faUser" />

                <div className="textModal">
                  <a className="text">Matricula</a>
                </div>
                <input
                  placeholder="ingresa tu matricula..."
                  value={matricula}
                  onChange={(event) => setMatricula(event.target.value)}
                />
                <FontAwesomeIcon icon={faEnvelope} className="faUser" />

                <div className="textModal">
                  <a className="text">Correo electrónico</a>
                </div>
                <input
                  placeholder="ingresa tu correo electrónico..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <FontAwesomeIcon icon={faLock} className="faUser" />

                <div className="textModal">
                  <a className="text">Fecha de nacimiento</a>
                </div>
                <input
                  placeholder="ingresa tu fecha de nacimiento"
                  value={birthday}
                  onChange={(event) => setBirthday(event.target.value)}
                />
                <FontAwesomeIcon icon={faCalendarAlt} className="faUser" />

                <div className="textModal">
                  <a className="text">Contraseña</a>
                </div>
                <input
                  placeholder="ingresa tu contraseña..."
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FontAwesomeIcon icon={faKey} className="faUser" />
              </div>
            </form>
            <div className="botonesContainer">
              {loading ? (
                <>
                  <p>Cargando...</p>
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </>
              ) : (
                <>
                  <button onClick={modalNotVisibles} className="cancelarModal">
                    Cancelar registro
                  </button>
                  <button
                    onClick={() => {
                      handleClick();
                      clearFields();
                    }}
                    className="cancelarModal"
                  >
                    Registrar usuario
                  </button>
                </>
              )}
            </div>
          </Modal>
        </div>
      </header>
    </div>
  );
}

export default Login;
