import "./App.css";
import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import {AuthContext} from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Workshops from "./pages/Workshops";
import WorkshopBanner from "./components/planner/WorkshopBanner";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <main>
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/inloggen" element={<SignIn/>}/>
                        <Route exact path="/dashboard" element={isAuth ? <Dashboard/> : <Navigate to="/inloggen"/>}/>
                        <Route path="/workshops/:id" element={isAuth ? <Workshops/> : <Navigate to="/inloggen"/>}/>
                        <Route exact path="/upload-banner" element={isAuth ? <WorkshopBanner/> : <Navigate to="/inloggen"/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;