import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAlumnos from "./views/alumnos/ListAlumnos";
import AlumnoDetai from "./views/alumnos/AlumnoDetail";
import { ToastContainer } from "react-toastify";
import ListActividades from "./views/actividades/ListActividades";
import ListUsers from "./views/users/listUsers";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/users" element={<ListUsers/>} />
          <Route path="/" element={<ListAlumnos/>} />
          <Route path="/alumnos" element={<ListAlumnos />} />
          <Route path="/alumnos/:id" element={<AlumnoDetai />} />
          <Route path="/actividades" element={<ListActividades/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
