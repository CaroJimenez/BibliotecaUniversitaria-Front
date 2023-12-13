import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import ListBooks from "./views/books/list_books";
import Login from "./views/login/Login";
// import EditLibro from "./views/books/EditBook"
import Navbar from "./components/Navbar";
import RequestBooks from "./views/RequestBooks/RequestBooks";
import BookLoanRequest from "./views/BookLoanRequest/BookLoanRequest";
import ViewFinesBooks from "./views/ViewFinesBooks/ViewFinesBooks";
import ViewRequestBooks from "./views/ViewRequestBooks/ViewRequestBooks";
=======
import listBooks from "./views/books/list_books";
import Login from "./views/login/Login"
>>>>>>> origin/login

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/list_books",
<<<<<<< HEAD
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
    // {
    //   path: "/list_books",
    //   element: <ListBooks />,
    // },
  ]);
=======
      element: <listBooks/>
    }
  ])
>>>>>>> origin/login

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
