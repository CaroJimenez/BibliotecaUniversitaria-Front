import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import LibrosCard from "./Card";
import AdminCard from "./CardAdmin";
import ModalAddbook from "../../components/book/ModalAddBook";
import ModalAddCategory from "../../components/category/ModalAddCategory";
import { Modal, Button, Form } from "react-bootstrap";
import { getBooks, postNewBook } from "../../services/axiosBooks";
import { DATA_, THEME, LETTERSIZE } from "../../utils/constants";
// import { useAuth } from "../../components/AuthContext";
import "../../App.css";
import "../../css/estilos.css";

const ListBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(THEME);
  const [typeUser, setTypeUser] = useState(2);
  const [booksP, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [showModalS, setShowModalS] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [rol, setRole] = useState([]);
  const [sizeLetter, setSizeLetter] = useState(LETTERSIZE);

  //Funciones para abrir los componentes de Modal
  const openModal = () => {
    setShowModal(true);
  };

  const openModalCategoria = () => {
    setShowModalC(true);
  };

  const openModalSubCategoria = () => {
    setShowModalS(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalC = () => {
    setShowModalC(false);
  };

  const closeModalS = () => {
    setShowModalS(false);
  };

  useEffect(() => {
    verify();
    getBooksAxios();
  }, []);

  function verify() {
    if (DATA_) {
      setUserInfo(DATA_);
      setRole(DATA_[0].rol.pop());
      console.log(DATA_[0].rol.pop());
      console.log(typeUser);
      if (rol == "ROLE_STUDENT" || rol === undefined) {
        setTypeUser(2);
      } else {
        setTypeUser(1);
      }
      console.log(typeUser);
    }
  }

  async function getBooksAxios() {
    try {
      const books = await getBooks();
      console.log("Lista de libros:", books.data);
      setBooks(books.data);
    } catch (error) {
      console.error("Error al obtener los libros: ", error);
    }
  }

  const handleAddCategory = async (nuevaCategoria) => {
    if (nuevaCategoria) {
    } else {
      alert("La categoria no puede estar vacia");
    }
  };

  const handleAgregarLibro = async (nuevoLibro) => {
    console.log("Nuevo libro Solo Esta:", nuevoLibro);
    if (nuevoLibro) {
      const nuevoLibroParaDB = {
        title: nuevoLibro.title,
        author: nuevoLibro.author,
        publication_date: nuevoLibro.publication_date,
        description: nuevoLibro.description,
        subCategory: {
            id: nuevoLibro.subCategory,
            name: nuevoLibro.subCategoryName,
            category: {
                id: 3,  // Ajusta según sea necesario
                name: "Terror",  // Ajusta según sea necesario
            },
        },
        disponibility: "DISPONIBLE",  // Ajusta según sea necesario
    };

    console.log(nuevoLibroParaDB);

      try {
        const newbook = await postNewBook(nuevoLibroParaDB);
        console.log(newbook);
      } catch (error) {
        // Manejar el error
        console.error("Error al guardar el libro:", error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
    {userInfo ?   <>
      <div className={`fondo-${theme}`}>
        {typeUser === 1 ? <NavbarAdmin /> : <Navbar />}
        <div>
          <h1 style={{ textAlign: "center", marginTop: "10px" }}>
            Libros Disponibles
          </h1>

          <div style={{ margin: "50px" }}>
            <input
              type="text"
              placeholder="Buscar 🔎"
              id="searchInput"
              onChange={handleSearchChange}
            />
          </div>

          <div className="d-flex justify-content-end mb-4">
            {typeUser === 1 && (
              <>
                <button
                  style={{ margin: "5px", height: "43px", width: "175px" }}
                  className="btn btn-primary"
                  onClick={openModal}
                >
                  Nuevo Libro
                </button>
                <button
                  style={{ margin: "5px", height: "43px", width: "175px" }}
                  className="btn btn-primary"
                  onClick={openModalCategoria}
                >
                  Nueva Categoría
                </button>
                <button
                  style={{ margin: "5px", height: "43px", width: "175px" }}
                  className="btn btn-primary"
                  onClick={openModalCategoria}
                >
                  Nueva Sub Categoría
                </button>
              </>
            )}
          </div>

          <div className="tex-center" style={{ alignContent: "center" }}>
            <div
              className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-3"
              style={{ marginLeft: "20px", marginRight: "5px" }}
            >
              {booksP
                .filter((item) =>
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index} className="col">
                    {typeUser === 2 ? (
                      <LibrosCard
                        id={item.id}
                        title={item.title}
                        content={item.description}
                        imagen={item.imagen}
                        categoria={item.categoria}
                        subcategoria={item.subcategia}
                      />
                    ) : (
                      <AdminCard
                        id={item.id}
                        title={item.title}
                        content={item.description}
                        imagen={item.imagen}
                        categoria={item.categoria}
                        subcategoria={item.subcategia}
                      />
                    )}
                  </div>
                ))}

              <ModalAddbook
                showModal={showModal}
                closeModal={closeModal}
                agregarLibro={handleAgregarLibro}
              />
              <ModalAddCategory
                showModal={showModalC}
                closeModal={closeModalC}
                agregarLibro={handleAddCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
 : <>
 <div>
 <h1>Lo siento no tienes la sesión iniciada</h1>
 </div>
 </>}
    </>
    );
};

export default ListBooks;
