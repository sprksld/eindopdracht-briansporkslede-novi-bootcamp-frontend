import "./App.css";
import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <>
          <NavBar />
          <main>
          <div className="content">
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/inloggen" element={<SignIn/>} />
          </Routes>
          </div>
          </main>
          <Footer />
      </>
  );
}

export default App;