import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalAddCategory = ({ showModal, closeModal, agregarLibro }) => {
  const [nuevoLibro, setNuevoLibro] = useState({
    title: "",
    description: "",
    // imagen: "",
    categoria: "",
    subcategoria: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoLibro({
      ...nuevoLibro,
      [name]: value,
    });
  };

  const handleAgregarLibro = () => {
    // Lógica para agregar el nuevo libro
    agregarLibro(nuevoLibro);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoria</Modal.Title>
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
            <Form.Label>Contenido:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Descripción"
              value={nuevoLibro.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategoria">
            <Form.Label>Categoría:</Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              value={nuevoLibro.categoria}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Ficción">Ficción</option>
              <option value="No ficción">No ficción</option>
              {/* Agrega más opciones según tus necesidades */}
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

export default ModalAddCategory;
