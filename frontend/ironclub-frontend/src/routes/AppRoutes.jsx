import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Treinos from "../pages/Treinos/Treinos";
import Loja from "../pages/Loja/Loja";
import Perfil from "../pages/Perfil/Perfil";
import NovoProduto from "../pages/NovoProduto/NovoProduto";
import EditarProduto from "../pages/EditarProduto/EditarProduto";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/treinos" element={<Treinos />} />
                <Route path="/produtos" element={<Loja />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/produtos/novo" element={<NovoProduto />} />
                <Route path="/produtos/:id/editar"element={<EditarProduto />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;