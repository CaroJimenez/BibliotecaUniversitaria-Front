import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { postNewCategory } from "../../services/axiosCategories";

const ModalAddCategory = ({ showModal, closeModal, agregarCategory }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({
      ...nuevaCategoria,
      [name]: value,
    });
  };

  const handleAddCategory = async () => {
    try {
      // Llamada al servicio para agregar una nueva categoría
      const newCategory = await postNewCategory(nuevaCategoria);

      // Agregar la nueva categoría al estado o realizar otras operaciones según sea necesario
      console.log("Nueva Categoría:", newCategory);

      // Llama a la función de agregar categoría pasada como prop
      agregarCategory(newCategory);
      closeModal();
    } catch (error) {
      // Manejar el error
      console.error("Error al agregar la categoría:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={nuevaCategoria.name}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddCategory}>
          Agregar Categoría
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddCategory;
