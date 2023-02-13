import "./App.css";
import React, {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import {AuthContext} from "./context/AuthContext";
import SignOut from "./pages/SignOut";

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
                        <Route exact path="/uitloggen" element={<SignOut/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;