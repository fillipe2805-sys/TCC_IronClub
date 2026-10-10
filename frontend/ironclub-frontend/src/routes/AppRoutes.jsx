import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Treinos from "../pages/Treinos/Treinos";
import Loja from "../pages/Loja/Loja";
import Perfil from "../pages/Perfil/Perfil";
import NovoProduto from "../pages/NovoProduto/NovoProduto";
import EditarProduto from "../pages/EditarProduto/EditarProduto";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";
import RotaProtegida from "../pages/components/RotaProtegida";
import NovoTreino from "../pages/NovoTreino/NovoTreino";
import DetalhesTreino from "../pages/DetalhesTreino/DetalhesTreino";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RotaProtegida>
                            <Home />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/treinos"
                    element={
                        <RotaProtegida>
                            <Treinos />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/treinos/:id"
                    element={
                        <RotaProtegida>
                            <DetalhesTreino />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/produtos"
                    element={
                        <RotaProtegida>
                            <Loja />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <RotaProtegida>
                            <Perfil />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/produtos/novo"
                    element={
                        <RotaProtegida>
                            <NovoProduto />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/produtos/:id/editar"
                    element={
                        <RotaProtegida>
                            <EditarProduto />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/treinos/novo"
                    element={
                        <RotaProtegida>
                            <NovoTreino />
                        </RotaProtegida>
                    }
                />

                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
