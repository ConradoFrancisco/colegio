

'use client'
import {  PiStudentBold } from "react-icons/pi";
import { FaBook, FaUsers } from "react-icons/fa";
import { useState } from "react";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar(){
  const [activeItem, setActiveItem] = useState("dashboard");

    return(
        <div
          className="sidebar"
          data-image="/light-bootstrap-dashboard-react/static/media/sidebar-3.9992d0ce.jpg"
          data-color="black"
        >
          <div
            className="sidebar-background"
            style={{
              backgroundImage:
                'url("/light-bootstrap-dashboard-react/static/media/sidebar-3.9992d0ce.jpg")',
            }}
          />
          <div className="sidebar-wrapper">
            <div className="logo">
              <a
                href="https://www.creative-tim.com?ref=lbd-sidebar"
                className="simple-text logo-mini mx-1"
              >
                <div className="logo-img m-auto">
                  <img src="logo2.png" alt="" width={150}/>
                </div>
              </a>
              
            </div>
            <div className="nav">
            <li
                  className={activeItem === "users" ? "nav-item active" : "nav-item"}
                  onClick={() => setActiveItem("users")}
                >
                <a
                  aria-current="page"
                  className="nav-link active"
                  href="/users"
                >
                  <FaUsers size={25} className="me-4" />
                  <p>Alta de usuarios</p>
                </a>
              </li>
              <li
                  className={activeItem === "alumnos" ? "nav-item active" : "nav-item"}
                  onClick={() => setActiveItem("alumnos")}
                >
                <a className="nav-link" href="/alumnos">
                  <PiStudentBold size={25} className="me-4" />
                  <p>Listado de alumnos</p>
                </a>
              </li>
              <li
                  className={activeItem === "actividades" ? "nav-item active" : "nav-item"}
                  onClick={() => setActiveItem("actividades")}
                >
                <a className="nav-link" href="/actividades">
                  <FaBook size={25} className="me-4" />
                  <p>Actividades</p>
                </a>
              </li>
            </div>
          </div>
        </div>
    )
}