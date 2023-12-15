import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCategory, postNewSubCategory } from "../../services/axiosCategories";

const ModalAgregarSubcategoria = ({ showModal, closeModal, agregarSubcategory }) => {
  const [ categorys, setCategorys ] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState({
    name: "",
    categoryName: nameCategory,
    idCategory: selectedCategoryId,
  });

  useEffect(()=>{
    getCategoriesAxios();
  },[])

  //Función que traé las categorias
  async function getCategoriesAxios() {
    try {
      const category = await getCategory();
      console.log(category);
      setCategorys(category.data);
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //Recuerda que este if me sirve para buscar los datos de la categoría
    if (name === "idCategory") {
      setSelectedCategoryId(value);
      const findCategory = categorys.find((cat) => {
        return parseInt(cat.id) === parseInt(value);
      });
      // console.log("findcat:", findCategory);
      setNameCategory(findCategory.name);
    }
    
    setNuevaSubcategoria({
      ...nuevaSubcategoria,
      [name]: value,
    });
  };

  const handleAgregarSubcategoria = async() => {
    try {
      var min = 10; // límite inferior del rango
      var max = 100; // límite superior del rango
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(num);

      var data = {
        id: parseInt(num),
        name: nuevaSubcategoria.name,
        category: {
          id: selectedCategoryId,
          name: nameCategory,
        },
      };

      // Convertir el objeto a una cadena JSON
      var jsonString = JSON.stringify(data);

      const newSubCategory = await postNewSubCategory(jsonString);
      console.log("nuva subcategoría", newSubCategory);
      agregarSubcategory(nuevaSubcategoria);
      closeModal();
    } catch (error) {
      
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Subcategoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombreSubcategoria">
            <Form.Label>Nombre de la Subcategoría:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={nuevaSubcategoria.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategoria">
            <Form.Label>Categoría:</Form.Label>
            <Form.Control
              as="select"
              name="idCategory"
              value={nuevaSubcategoria.idCategory}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAgregarSubcategoria}>
          Agregar Subcategoría
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarSubcategoria;
