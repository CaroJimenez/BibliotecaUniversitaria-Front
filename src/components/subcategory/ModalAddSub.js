import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalAgregarSubcategoria = ({ showModal, closeModal, agregarSubcategoria }) => {
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState({
    name: "",
    // Otros campos relacionados con la subcategoría si es necesario
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNuevaSubcategoria({
      ...nuevaSubcategoria,
      [name]: value,
    });
  };

  const handleAgregarSubcategoria = () => {
    // Puedes agregar validaciones aquí antes de agregar la subcategoría
    agregarSubcategoria(nuevaSubcategoria);
    closeModal();
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
          {/* Otros campos relacionados con la subcategoría si es necesario */}
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
