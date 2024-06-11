import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./layouts/Layout.tsx";
import FicheLogementPage from "./pages/FicheLogementPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/fiche-logement/:id" element={<FicheLogementPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    )
};

export default AppRoutes;