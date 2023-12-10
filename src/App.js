import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListBooks from "./views/books/List_books";
import Login from "./views/login/Login";
// import EditLibro from "./views/books/EditBook"
import Navbar from "./components/Navbar";

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
    // {
    //   path: "/list_books",
    //   element: <ListBooks />,
    // },
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
