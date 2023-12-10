import React, {useState, useContext} from "react";
// import ThemeContext from "./ThemeContext";

const NavbarAdmin = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme ] = useState("claro")
  // const { theme, setTheme } = useContext(ThemeContext);

  // const handleThemeChange = () => {
  //   setTheme(theme === 'claro' ? 'oscuro' : 'claro'); // Cambiar el tema
  // };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} fondoNavbar-${theme}`}>
      <a
        href="/list_books"
        className="navbar-brand"
        style={{ float: "left" }}
      >
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
        style={{textAlign: "right"}}
      >
        <ul className="navbar-nav d-flex justify-content-end">
          <li className="nav-item">
            <a href="/list_books" className="nav-link">Multas</a>
          </li>
          <li className="nav-item">
            <a href="/prestamos" className="nav-link">Préstamos</a>
          </li>
          <li className="nav-item">
            <a href="/perfil" className="nav-link">Perfil</a>
          </li>
          <li className="nav-item">
            <a href="/perfil" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
          {/* <button onClick={handleThemeChange}>Cambiar tema</button> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default NavbarAdmin;
