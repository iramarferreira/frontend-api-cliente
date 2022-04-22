import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Add from "./pages/add";
import Update from "./pages/update";

const Rotas = () => {
     // Definirá que estamos definindo as rotas 
    // através de um Browser
    // Routes irá que seja exibida apenas um componente 
    // com uma rota
    // exact é para ser mostrado se realmente for a rota correta
    return (
    // <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>} ></Route>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/update" element={<Update/>}></Route>
            {/* <Route path="/sobre/"  component={About}></Route>
            <Route path="/contato/"  component={Contact}></Route>
            <Route path="/add/:senha"  component={Add}></Route> */}
            <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
    )
    // </BrowserRouter>
}

export default Rotas;