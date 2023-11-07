import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Form, Detail } from "./views/index";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  //uso el hook uselocation
  const location = useLocation();
  // Verificar si la ubicación actual es la ruta de Landing
  const isLanding = location.pathname === "/";

  return (
    <div className="App">
      {/* Mostrar NavBar solo si no estamos en la ruta de Landing */}
      {!isLanding && <NavBar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
