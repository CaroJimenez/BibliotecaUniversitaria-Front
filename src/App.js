import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListBooks from "./views/books/list_books";
import Login from "./views/login/Login";
import Navbar from "./components/Navbar";
import RequestBooks from "./views/RequestBooks/RequestBooks";
import BookLoanRequest from "./views/BookLoanRequest/BookLoanRequest";
import ViewFinesBooks from "./views/ViewFinesBooks/ViewFinesBooks";
import ViewRequestBooks from "./views/ViewRequestBooks/ViewRequestBooks";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/list_books",
      element: <ListBooks />,
    },
    {
      path: "/solicitudes_prestamos",
      element: <RequestBooks />,
    },
    {
      path: "/solicitar_prestamo_alumno/libro",
      element: <BookLoanRequest />,
    },
    {
      path: "/multas",
      element: <ViewFinesBooks />,
    },
    {
      path: "/devoluciones_libros",
      element: <ViewRequestBooks />,
    },
    {
      // Comenté la entrada duplicada
      // path: "/list_books",
      // element: <ListBooks />,
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^

      // Agregué la entrada correcta
      path: "/otra_ruta",
      element: <listBooks />,
    },
  ]);

  return (
    <RouterProvider router={router}>
      <React.StrictMode>
        {/* Nota según la documentación podemos rencerizar componentes comunes aquí, ejemplo:
          <Header/> */}
      </React.StrictMode>
    </RouterProvider>
  );
}
export default App;
