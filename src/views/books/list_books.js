import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import LibrosCard from "./Card";
import AdminCard from "./CardAdmin";
import ModalAddbook from "../../components/book/ModalAddBook";
import { Modal, Button, Form } from "react-bootstrap";
import { getBooks } from "../../services/axiosBooks";
import { getCategory } from "../../services/axiosCategories";
import "../../App.css";
import "../../css/estilos.css";

const ListBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("claro");
  const [typeUser, setTypeUser] = useState(2);
  const [booksP, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalC, setShowModalC] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalCategoria = () => {
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalC = () => {
    setShowModalC(false);
  };

  useEffect(() => {
    getCategoriesAxios();
    getBooksAxios();
  }, []);

  async function getBooksAxios() {
    try {
      const books = await getBooks();
      console.log('Lista de libros:', books);
      // setBooks(books);
    } catch (error) {
      console.error("Error al obtener los libros: ", error);
    }
  }

  async function getCategoriesAxios() {
    try {
      const category = await getCategory();
      console.log(category);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  const handleAgregarLibro = (nuevoLibro) => {
    // Lógica para agregar el nuevo libro (puedes implementarla según tu necesidad)
    console.log("Nuevo libro:", nuevoLibro);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className={`fondo-${theme}`}>
        {typeUser === 1 ? <Navbar /> : <NavbarAdmin />}
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
            {typeUser === 2 && (
              <>
              <button style={{ margin: "5px", height: "50%", width: "150px" }} className="btn btn-primary" onClick={openModal}>
                Nuevo Libro
              </button>
              <button style={{ margin: "5px", height: "50%", width: "150px" }} className="btn btn-primary" onClick={openModalCategoria}>
                Nueva Categoria
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
                    {typeUser === 1 ? (
                      <LibrosCard
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        imagen={item.imagen}
                        categoria={item.categoria}
                        subcategoria={item.subcategia}
                      />
                    ) : (
                      <AdminCard
                        id={item.id}
                        title={item.title}
                        content={item.content}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBooks;
