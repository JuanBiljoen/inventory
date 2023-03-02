import "bootstrap/dist/css/bootstrap.min.css"; // Import some styling from Bootstrap
import { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./Components/About/AboutPage";
import ContactPage from "./Components/Contact/ContactPage";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Components/Home/HomePage";
import AuthComponent from "./Components/Login/AuthComponent";
import StockPage from "./Components/Stock/StockPage";

function App() {
  // If this state is false then display "Logout" instead of "Login/Sign In" in the Header
  const [displayLogin, setDisplayLogin] = useState(true);

  // When a user logs in successfully, display "Logout" in the Header
  function loginHandler() {
    setDisplayLogin(false);
  }

  return (
    <Container style={{ marginTop: "5px" }}>
      <div>
        <BrowserRouter>
          <Header displayLogin={displayLogin} />
          <hr></hr>
          <Routes>
            <Route exact={true} path="/" element={<HomePage />}></Route>
            <Route exact={true} path="/about" element={<AboutPage />}></Route>
            <Route exact={true} path="/stocklist" element={<StockPage />}></Route>
            <Route
              exact={true}
              path="/contact"
              element={<ContactPage />}
            ></Route>
            <Route
              exact={true}
              path="/auth"
              element={<AuthComponent onLogin={loginHandler} />}
            ></Route>
          </Routes>
          <hr></hr>
          <Footer />
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
