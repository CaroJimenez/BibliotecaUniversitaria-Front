import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from "react-bootstrap";

const LibroAdmin = ({ id, title, content, imagen, categoria, subcategoria }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedData, setEditedData] = useState({
      title: title,
      content: content,
      imagen: imagen,
      categoria: categoria,
      subcategoria: subcategoria,
    });

  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const handleEdit = () => {
      // Aquí puedes enviar los datos editados a tu API o realizar otras acciones necesarias
      console.log("Datos editados:", editedData);
      closeModal();
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedData({
        ...editedData,
        [name]: value,
      });
    };
  
    const deleteLibro = () =>{
  
    }

  return (
    <div
      className="card text-center"
      style={{ width: "20rem", marginBottom: "20px" }}
    >
      <div className="card-body">
        <div className="text-center d-flex justify-content-center align-items-center" style={{padding: "50px"}}>
          <img
            src={imagen}
            alt="portada_libro"
            style={{ width: "200px", height: "300px" }}
          />
        </div>
        <h5 style={{color: "darkblue"}} className="card-title">{title}</h5>
        <p style={{color: "blue"}} className="card-text">{content}</p>
        <button className="button_card_admin"  onClick={openModal}>
        <FontAwesomeIcon icon={faEdit} /> 
        </button>
        <button className="button_card_admin_d" onClick={deleteLibro}>
        <FontAwesomeIcon icon={faTrashAlt} /> 
        </button>
      </div>

      <Modal show={modalIsOpen} onHide={setModalIsOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedData.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={editedData.content}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Agrega campos adicionales según tus necesidades */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default LibroAdmin;
