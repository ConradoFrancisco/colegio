
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAlumnos from './views/alumnos/ListAlumnos';
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/alumnos" element={<ListAlumnos/>} />
          <Route path="/alumnos/:id" element={<h1>About</h1>} />
          <Route path="/actividades" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
