import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteBook, updateBook } from "../../services/axiosBooks";
import swal from "sweetalert";

const LibroAdmin = ({
  id,
  title,
  description,
  imagen,
  category,
  subCategory,
  publication_date,
  disponibility,
  author,
  idCategory,
  idSubCategory,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: id,
    title: title,
    description: description,
    publication_date: publication_date,
    disponibility: disponibility,
    category: category,
    idCategory: idCategory,
    subcategory: subCategory,
    idSubCategory: idSubCategory,
    author: author,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Función que resive los datos a editar
  const handleEdit = async() => {
    closeModal();
    swal({
      title: "¿Estás seguro?",
      text: "Una vez que borres esto, no podrás recuperarlo.",
      icon: "warning",
      buttons: ["Cancelar", "Editar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // El usuario ha hecho clic en "Editar"
        try {
          editBookAxios();
          swal("¡Poof! Haz editado el Libro.", {
            icon: "success",
          });
        } catch (error) {
          swal("¡Hubo un problema para editar esto!", {
            icon: "warning",
          });
        }
      } else {
        // El usuario ha hecho clic en "Cancelar"
        swal("El elemento está a salvo.", {
          icon: "info",
        });
      }
    });
  };

  //Función que modifica y envia en formato json
  const editBookAxios = async () => {
    // Aquí puedes enviar los datos editados a tu API o realizar otras acciones necesarias
    console.log("Datos editados:", editedData);
    try {
      const data = {
        id: editedData.id,
        title: editedData.title,
        author: editedData.author,
        publication_date: editedData.publication_date,
        description: editedData.description,
        subCategory: {
          id: parseInt(editedData.idSubCategory),
          name: editedData.subcategory,
          category: {
            id: parseInt(editedData.idCategory),
            name: editedData.category,
          },
        },
        disponibility: "DISPONIBLE",
      };
  
      var jsonString = JSON.stringify(data);
      const editAxiosBook = await updateBook(jsonString);
      console.log(editAxiosBook);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleDeleteBook = () => {
    console.log(id);
    swal({
      title: "¿Estás seguro?",
      text: "Edita con precausión.",
      icon: "warning",
      buttons: ["Cancelar", "Borrar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // El usuario ha hecho clic en "Borrar"
        try {
          deleteBookAxios();
          swal("¡Poof! El elemento ha sido borrado.", {
            icon: "success",
          });
        } catch (error) {
          swal("¡Hubo un problema para eliminar esto!", {
            icon: "warning",
          });
        }
      } else {
        // El usuario ha hecho clic en "Cancelar"
        swal("El elemento está a salvo.", {
          icon: "info",
        });
      }
    });
  };

  const deleteBookAxios = async () => {
    const deleteB = await deleteBook(id);
    console.log(deleteB);
  };

  return (
    <div
      className="card text-center"
      style={{ width: "20rem", marginBottom: "20px", height: "575px" }}
    >
      <div className="card-body">
        <div
          className="text-center d-flex justify-content-center align-items-center"
          style={{ padding: "50px" }}
        >
          <img
            src={
              imagen
                ? imagen
                : "https://i.pinimg.com/736x/64/f9/e3/64f9e38a938abf5987beb729ecbf54af.jpg"
            }
            alt="portada_libro"
            style={{ width: "200px", height: "300px" }}
          />
        </div>
        <h4 style={{ color: "darkblue" }} className="card-title">
          {title}
        </h4>
        <p style={{ color: "blue" }} className="card-text description">
          {description}
        </p>
        <h5 className="disponibility">{disponibility}</h5>
        <button className="button_card_admin" onClick={openModal}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="button_card_admin_d" onClick={handleDeleteBook}>
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

            <Form.Group controlId="formDescription">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editedData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* <Form.Group controlId="formFecha">
            <Form.Label>Fecha de publicación:</Form.Label>
            <Form.Control
              type="date"
              name="publication_date"
              value={editedData.publication_date}
              onChange={handleInputChange}
            />
          </Form.Group> */}
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
