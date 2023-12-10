import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListBooks from "./views/books/list_books";
import Login from "./views/login/Login";

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
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        {/* Nota según la documentación podemos rencerizar cmponentes comunes aquí, ejemnplo:
      <Header/> */}
      </RouterProvider>
    </React.StrictMode>
  );
}

export default App;
