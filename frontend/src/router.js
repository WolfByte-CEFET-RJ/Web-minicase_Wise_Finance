import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login"
import Home from "./pages/home"


const routes = [
  {
    path: "/cadastro",
    element: <Cadastro />,
  } ,
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/home",
    element: <Home/>
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