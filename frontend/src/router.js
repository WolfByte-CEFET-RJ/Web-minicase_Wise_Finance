import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login"


const routes = [
  {
    path: "/cadastro",
    element: <Cadastro />,
  } ,
  {
    path: "/login",
    element: <Login />,
  }
];

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;