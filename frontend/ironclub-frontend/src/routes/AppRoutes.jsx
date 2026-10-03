import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Treinos from "../pages/Treinos/Treinos";
import Loja from "../pages/Loja/Loja";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/treinos" element={<Treinos />} />
                <Route path="/produtos" element={<Loja />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;