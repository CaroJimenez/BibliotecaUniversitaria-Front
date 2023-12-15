import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCategory, getSubCategory } from "../../services/axiosCategories";

const ModalAddbook = ({ showModal, closeModal, agregarLibro, updateContent }) => {
  const [categorys, setCategory] = useState([]);
  const [subCategorys, setSubCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [nameCategory, setNameCategory] = useState("");
  const [selectSubCatId, setSelectedSubCateId] = useState(0);
  const [nameSubCategory, setNameSubCategory] = useState("");
  const [nuevoLibro, setNuevoLibro] = useState({
    title: "",
    description: "",
    idSubCategory: selectSubCatId,
    subCategoryName: nameSubCategory,
    categoryName: nameCategory,
    idCategory: selectedCategoryId,
    author: "",
    publication_date: "",
  });

  useEffect(() => {
    getCategoriesAxios();
    getSubCategoriesAxios();
    updateContent = false;
  }, [updateContent]);

  //Función que traé las categorias
  async function getCategoriesAxios() {
    try {
      const category = await getCategory();
      console.log(category);
      setCategory(category.data);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  //Función que traé las subcategorias
  async function getSubCategoriesAxios() {
    try {
      const subCategory = await getSubCategory();
      console.log(subCategory);
      setSubCategory(subCategory.data);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  //Función que trae lo modificado del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "idCategory") {
      setSelectedCategoryId(value);
      filterSubcategories();
      const findCategory = categorys.find((cat) => {
        return parseInt(cat.id) === parseInt(value);
      });
      // console.log("findcat:", findCategory);
      setNameCategory(findCategory.name);
    }

    if (name === "idSubCategory") {
      setSelectedSubCateId(value);
      const findSubCategory = subCategorys.find((sub) => {
        return parseInt(sub.id) === parseInt(value);
      });
      // console.log("findsub:",findSubCategory);
      setNameSubCategory(findSubCategory.name);
    }

    //Setteo de datos
    setNuevoLibro({
      ...nuevoLibro,
      [name]: value,
    });
  };

  // Cierra el modal y lo manda a la vista padre
  const handleAgregarLibro = () => {
    console.log("categoria: " + nameCategory + " sub: " + nameSubCategory);

    // Crear un nuevo objeto con las propiedades de nuevoLibro y las nuevas propiedades
    const updatedLibro = {
      ...nuevoLibro,
      categoryName: nameCategory,
      subCategoryName: nameSubCategory,
    };

    // Pasar el nuevo objeto a la función agregarLibro
    agregarLibro(updatedLibro);

    // Cerrar el modal
    closeModal();
  };

  //Filtro para el filtrado por subcateria dependiendo de la categoria
  const filterSubcategories = () => {
    var data = [];
    if (parseInt(selectedCategoryId) !== 0) {
      const filteredSubcategoriesFild = subCategorys.filter((subCategory) => {
        console.log(selectedCategoryId);
        return (
          parseInt(subCategory.category.id) === parseInt(selectedCategoryId)
        );
      });
      data = filteredSubcategoriesFild;
    } else {
      data = subCategorys;
    }
    return data;
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={nuevoLibro.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Descripción del Libro:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={nuevoLibro.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={nuevoLibro.author}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formFecha">
            <Form.Label>Fecha de publicación:</Form.Label>
            <Form.Control
              type="date"
              name="publication_date"
              value={nuevoLibro.publication_date}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategoria">
            <Form.Label>Categoría:</Form.Label>
            <Form.Control
              as="select"
              name="idCategory"
              value={nuevoLibro.idCategory}
              onChange={handleInputChange}
            >
              <option value="0">Selecciona una categoría</option>
              {categorys.map((category) => (
                <option key={category.idCategory} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSubcategoria">
            <Form.Label>Subcategoría:</Form.Label>
            <Form.Control
              as="select"
              name="idSubCategory"
              value={nuevoLibro.idSubCategory}
              onChange={handleInputChange}
            >
              <option value="0">Selecciona una subcategoría</option>
              {filterSubcategories().map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAgregarLibro}>
          Agregar Libro
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddbook;
