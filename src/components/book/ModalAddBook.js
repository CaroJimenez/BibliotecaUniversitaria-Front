import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCategory, getSubCategory } from "../../services/axiosCategories";

const ModalAddbook = ({ showModal, closeModal, agregarLibro }) => {
  const [categorys, setCategory] = useState([]);
  const [subCategorys, setSubCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [nameCategory, setNameCategory ] = useState("");
  const [nameSubCategory, setNameSubCategory] = useState("");
  const [imagen, setImagen] = useState(null);
  const [nuevoLibro, setNuevoLibro] = useState({
    title: "",
    description: "",
    subCategory: 0,
    subCategoryName: "",
    categoryName: "",
    subCategoryName: "",
    category: "",
    author: "",
    publication_date: "",
  });

  useEffect(() => {
    getCategoriesAxios();
    getSubCategoriesAxios();
  }, []);

  async function getCategoriesAxios() {
    try {
      const category = await getCategory();
      setCategory(category.data);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  async function getSubCategoriesAxios() {
    try {
      const subCategory = await getSubCategory();
      console.log(subCategory);
      setSubCategory(subCategory.data);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_category_book") {
      setSelectedCategoryId(value);
    }
    
    
    setNuevoLibro({
      ...nuevoLibro,
      [name]: value,
    });
  };

  const handleAgregarLibro = () => {
    agregarLibro(nuevoLibro);
    closeModal();
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const filterSubcategories = () => {
    const filteredSubcategoriesFild = subCategorys.filter((subCategory) => {
      return parseInt(subCategory.id) === parseInt(selectedCategoryId);
    });
    return filteredSubcategoriesFild;
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
              name="id_category_book"
              value={nuevoLibro.id_category_book}
              onChange={handleInputChange}
            >
              <option value="0">Selecciona una categoría</option>
              {categorys.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSubcategoria">
            <Form.Label>Subcategoría:</Form.Label>
            <Form.Control
              as="select"
              name="id_subcategory"
              value={nuevoLibro.id_subcategory}
              onChange={handleInputChange}
            >
              <option value="0">Selecciona una subcategoría</option>
              {subCategorys.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="formImagen">
            <Form.Label>Seleccionar Imagen:</Form.Label>
            <Form.Control
              type="file"
              name="image_name"
              value={nuevoLibro.imagen_name}
              onChange={handleInputChange}
            />
            {imagen && (
              <div>
                <p>Nombre del Archivo: {imagen.name}</p>
                <p>Tipo de Archivo: {imagen.type}</p>
              </div>
            )}
          </Form.Group> */}
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
