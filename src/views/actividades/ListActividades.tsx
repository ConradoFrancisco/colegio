/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button, Container, Table, Accordion } from "react-bootstrap";

import { FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../../layout/SideBar";



import { LuFilter } from "react-icons/lu";
import Paginator from "../../components/Paginator";
import ActividadModal from "./components/ActividadModal";
import ConfirmarAccionesModal from "./components/ConfirmarAccionesModal";
import InscriptosModal from "./components/InscriptosModal";
import ActividadService from "../../services/ActividadService";
import Panel from "../../layout/Panel";


export interface IActividad {
  id?: number;
  nombre: string;
  tipo: "Grupo" | "Taller";
  descripcion: string;
  cupo: number | null;
  turno: "TM" | "TT" | "TV" | "J Comp.";
  fecha_inicio: string;
  fecha_fin: string;
  estado: "Activa" | "Inactiva";
}

export default function ListActividades() {
  const [actividades, setActividades] = useState<IActividad[]>([]);
  const [actividadSeleccionada, setActividadSeleccionada] =
    useState<IActividad | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showInscriptosModal, setShowInscriptosModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState({show:false,action:""});
  const [cant, setCant] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit] = useState(4);
  const [offset, setOffset] = useState(0);

  const fetchActividades = async () => {
    const res = await ActividadService.getAll({ limit, offset });
    const { data, cant } = res;
    setCant(cant);
    setActividades(data);
  };

  const handleCreate = async (actividad: IActividad) => {
    await ActividadService.createActividad(actividad);
    setShowModal(false);
    fetchActividades();
  };

  const handleUpdate = async (actividad: IActividad) => {
    if (actividadSeleccionada?.id) {
      await ActividadService.updateActividad(actividadSeleccionada.id, actividad);
      fetchActividades();
      setShowModal(false);
    }
  }

  const handleUpdateEstado = async (id: number,estado:string) => {
    
      await ActividadService.updateEstado(id, estado === "Activa" ? "Inactiva" : "Activa");
      fetchActividades();
  }

  useEffect(() => {
    fetchActividades();
  }, [limit, offset]);

  return (
    <>
    <SideBar/>
    <Panel>
      <Container fluid className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Actividades</h2>
          <Button onClick={() => setShowModal(true)}>+ Nueva actividad</Button>
        </div>
        <div className="row">
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header><LuFilter size={20}/> {' '} Filtros</Accordion.Header>
              {/* <Accordion.Body>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre, apellido o dni"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Barrio"
                      value={barrio}
                      onChange={(e) => setBarrio(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3 justify-content-between d-flex gap-2">
                    <button
                      className="btn btn-primary w-75 gap-2"
                      onClick={() => {
                        getAlumnos();
                        setOffset(0); // limpia y vuelve a pedir todo
                      } }
                    >
                      Buscar
                    </button>
                    <button
                      className="btn btn-secondary w-75"
                      onClick={() => {
                        setBusqueda("");
                        setBarrio("");
                        getAlumnos()
                        setOffset(0) // limpia y vuelve a pedir todo
                      }}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              </Accordion.Body> */}
            </Accordion.Item>
          </Accordion>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Turno</th>
              <th>fecha de inicio</th>
              <th>Fecha de cierre</th>
              
              <th /* className="d-flex" */ style={{ width: "11%" }}>
                Inscripciones
              </th>
              <th style={{ width: "10%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades?.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nombre}</td>
                <td>{a.tipo}</td>
                <td>{a.turno}</td>
                <td>{a.fecha_inicio}</td>
                <td>{a.fecha_fin}</td>
                
                <td>
                  <button className="btn btn-primary" onClick={()=>{
                    setActividadSeleccionada(a);
                    setShowInscriptosModal(true);
                  }}>Ver Inscripciones</button>
                </td>
                <td className="d-flex gap-2" /* style={{width:'10%'}} */>
                  <button className="btn btn-primary" onClick={() => {{
                      setActividadSeleccionada(a);
                      setShowModal(true);
                    }}}>
                    <FaEdit />
                  </button>
                 
                  <button onClick={() => {
                    setActividadSeleccionada(a);
                    setShowActionModal({show:true,action:'eliminar'});
                  }} className="btn btn-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginator
          cantidad={cant}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
        />
        <ActividadModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setActividadSeleccionada(null);
          }}
          onSubmit={actividadSeleccionada ? handleUpdate : handleCreate}
          initialData={actividadSeleccionada}
        />
        <ConfirmarAccionesModal
          show={showActionModal.show}
          onHide={() => setShowActionModal({show:false,action:""})}
          actividad={actividadSeleccionada}
          action={showActionModal.action}
          onEliminar={() => {}}
          onToggleEstado={() => {
            if (actividadSeleccionada?.id) {
              handleUpdateEstado(actividadSeleccionada.id, actividadSeleccionada.estado);
              setShowActionModal({show:false,action:""});
            }
          }}
        />
        <InscriptosModal
          onHide={()=>setShowInscriptosModal(false)}
          idActividad={actividadSeleccionada?.id || 0}
          show={showInscriptosModal}
        />
      </Container>

    </Panel>
      
    </>
  );
}
