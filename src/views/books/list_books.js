import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import LibrosCard from "./Card";
import AdminCard from "./CardAdmin";
import ModalAddbook from "../../components/book/ModalAddBook";
import ModalAddCategory from "../../components/category/ModalAddCategory";
import ModalAddSubCategory from "../../components/subcategory/ModalAddSub";
import { Modal, Button, Form } from "react-bootstrap";
import { getBooks, postNewBook } from "../../services/axiosBooks";
import { DATA_, THEME, LETTERSIZE } from "../../utils/constants";
import swal from "sweetalert";
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

  //Función qeu chaca que tipo de usuario está logeado
  function verify() {
    if (DATA_) {
      setUserInfo(DATA_);
      setRole(DATA_[0].rol);
      console.log(DATA_[0].rol);
      console.log(typeUser);
      // if (rol == "ROLE_STUDENT" || rol === undefined) {
      //   setTypeUser(2);
      // } else {
      //   setTypeUser(1);
      // }
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
      swal({
        title: "¡Registro exitoso!",
        text: "¡Se ha registrado con éxito la categoría!",
        icon: "success",
        button: "Aceptar",
      });
    } else {
      swal({
        title: "¡Error al registrar!",
        text: "¡Intenta de nuevo!",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const handleAddSubCategory = async (nuevaSubCategoria) => {
    if (nuevaSubCategoria) {
      swal({
        title: "¡Registro exitoso!",
        text: "¡Se ha registrado con éxito la subcategoría!",
        icon: "success",
        button: "Aceptar",
      });
    } else {
      swal({
        title: "¡Error al registrar!",
        text: "¡Intenta de nuevo!",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  //Función que nos permite guardar el libro
  const handleAgregarLibro = async (nuevoLibro) => {
    let libros_actuales = booksP.length;
    var count = parseInt(libros_actuales) + 1;
    // console.log(libros_actuales);
    // console.log("Nuevo libro Solo Esta:", nuevoLibro);
    if (nuevoLibro) {
      const nuevoLibroParaDB = {
        id: parseInt(count),
        title: nuevoLibro.title,
        author: nuevoLibro.author,
        publication_date: nuevoLibro.publication_date,
        description: nuevoLibro.description,
        subCategory: {
          id: parseInt(nuevoLibro.idSubCategory),
          name: nuevoLibro.subCategoryName,
          category: {
            id: parseInt(nuevoLibro.idCategory),
            name: nuevoLibro.categoryName,
          },
        },
        disponibility: "DISPONIBLE",
      };
      
    // console.log(nuevoLibroParaDB);
    var jsonString = JSON.stringify(nuevoLibroParaDB);

      try {
        const newbook = await postNewBook(jsonString);
        // console.log(newbook);
        swal({
          title: "¡Registro exitoso!",
          text: "¡Se ha registrado con éxito el libro!",
          icon: "success",
          button: "Aceptar",
        });
        getBooksAxios();
      } catch (error) {
        // Manejar el error
        console.error("Error al guardar el libro:", error);
        swal({
          title: "¡Error al registrar!",
          text: "¡Intenta de nuevo!",
          icon: "error",
          button: "Aceptar",
        });
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
                  style={{ margin: "5px", height: "50px", width: "180px" }}
                  className="btn btn-primary"
                  onClick={openModal}
                >
                  Nuevo Libro
                </button>
                <button
                  style={{ margin: "5px", height: "50px", width: "180px" }}
                  className="btn btn-primary"
                  onClick={openModalCategoria}
                >
                  Nueva Categoría
                </button>
                <button
                  style={{ margin: "5px", height: "50px", width: "180px" }}
                  className="btn btn-primary"
                  onClick={openModalSubCategoria}
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
                  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.subCategory.category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        disponibility={item.disponibility}
                        publication_date={item.publication_date}
                      />
                    ) : (
                      <AdminCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        imagen={item.imagen}
                        category={item.subCategory?.category?.name}
                        idCategory={item.subCategory?.category?.id}
                        subCategory={item.subCategory?.name}
                        idSubCategory={item.subCategory?.id}
                        disponibility={item.disponibility}
                        publication_date={item.publication_date}
                        author={item.author}
    
                      />
                    )}
                  </div>
                ))}

              <ModalAddbook
                showModal={showModal}
                closeModal={closeModal}
                agregarLibro={handleAgregarLibro}
                updateContent={true}
              />
              <ModalAddCategory
                showModal={showModalC}
                closeModal={closeModalC}
                agregarCategory={handleAddCategory}
                updateContent={true}
              />
              <ModalAddSubCategory
                showModal={showModalS}
                closeModal={closeModalS}
                agregarSubCategory={handleAddSubCategory}
                updateContent={true}
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
