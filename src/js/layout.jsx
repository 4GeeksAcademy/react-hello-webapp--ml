import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./store/appContext.jsx";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";

const Layout = () => (
    <AppProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:type/:theid" element={<Single />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </AppProvider>
);

export default Layout;
