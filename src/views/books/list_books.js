import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import LibrosCard from "./Card";
import AdminCard from "./CardAdmin";
import ModalAddbook from "../../components/book/ModalAddBook";
import ModalAddCategory from "../../components/category/ModalAddCategory";
import { Modal, Button, Form } from "react-bootstrap";
import { getBooks, postNewBook } from "../../services/axiosBooks";
import "../../App.css";
import "../../css/estilos.css";

const ListBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("claro");
  const [typeUser, setTypeUser] = useState(1);
  const [booksP, setBooks] = useState([
    {
      id: 1,
      title: "Libro 1",
      content: "Contenido del Libro 1",
      imagen: null,
      categoria: "Ficción",
      subcategoria: "Aventura",
    },
    {
      id: 2,
      title: "Libro 2",
      content: "Contenido del Libro 2",
      imagen: null, // Puede ser nulo si no hay imagen
      categoria: "No Ficción",
      subcategoria: "Historia",
    },
    {
      id: 3,
      title: "Libro 3",
      content: "Contenido del Libro 3",
      imagen: null,
      categoria: "Misterio",
      subcategoria: "Suspense",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [showModalS, setShowModalS] = useState(false);

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
    getBooksAxios();
  }, []);

  async function getBooksAxios() {
    try {
      const books = await getBooks();
      console.log('Lista de libros:', books.data);
      setBooks(books.data);
    } catch (error) {
      console.error("Error al obtener los libros: ", error);
    }
  }

  const handleAddCategory = async(nuevaCategoria) => {
    if (nuevaCategoria) {
      
    }else{
      alert("La categoria no puede estar vacia");
    }
  }

  const handleAgregarLibro = async(nuevoLibro) => {
    console.log("Nuevo libro Solo Esta:", nuevoLibro);     
    if (nuevoLibro) {
      const Data = new FormData();
      Data.append("title", nuevoLibro.title);
      Data.append("description", nuevoLibro.description);
      Data.append("author", nuevoLibro.author);
      Data.append("id_category_book", nuevoLibro.id_category_book);
      Data.append('id_subcategory', nuevoLibro.id_subcategory);
      Data.append('author', nuevoLibro.author);

      try {
        const newbook = await postNewBook(Data);
        console.log(newbook);

      } catch (error) {
        // Manejar el error
        console.error("Error al calcular el costo:", error);
      }
    }

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
              <button style={{ margin: "5px", height: "43px", width: "175px" }} className="btn btn-primary" onClick={openModal}>
                Nuevo Libro
              </button>
              <button style={{ margin: "5px", height: "43px", width: "175px" }} className="btn btn-primary" onClick={openModalCategoria}>
                Nueva Categoría
              </button>
              <button style={{ margin: "5px", height: "43px", width: "175px" }} className="btn btn-primary" onClick={openModalCategoria}>
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
                    {typeUser === 1 ? (
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
  );
};

export default ListBooks;
