/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Table, Container, Accordion, Badge } from "react-bootstrap";
import { LuFilter } from "react-icons/lu";
import Paginator from "../../components/Paginator";
import AlumnoModal from "./components/AlumnoModal";
import AlumnosService from "../../services/AlumnosService";
import SideBar from "../../layout/SideBar";
import Panel from "../../layout/Panel";
import ActividadService from "../../services/ActividadService";
import type { IActividad } from "./components/InscripcionModal";
import { exportToExcel } from "../../services/ExcelService";
export interface IAlumnoListado {
  id: string;
  nombre: string;
  apellido: string;
  barrio: string;
  direccion: string;
  dni: string;
  edad: string;
  escuela: string;
  actividad:string;
  fecha_nacimiento: string;
  socio_educativo: string;
  last_modified: string | null;
  preinscripcion: string;
  contacto: string;
  prioridad: number;
}

export default function ListAlumnos() {
  /*   const [ordenCampo, setOrdenCampo] = useState("apellido");
  const [ordenDireccion, setOrdenDireccion] = useState<"ASC" | "DESC">("ASC"); */
  const [alumnos, setAlumnos] = useState<IAlumnoListado[]>([]);
  const [actividades, setActividades] = useState<IActividad[]>([]);
  const [actividad, setActividad] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [barrio, setBarrio] = useState("");
  const [, setFlag] = useState(0);
  const [ordenCampo, setOrdenCampo] =
    useState<keyof IAlumnoListado>("apellido");
  const [ordenDireccion, setOrdenDireccion] = useState<"ASC" | "DESC">("ASC");
  // Simulación de datos hasta traerlos desde el backend
  /* const alumnos : IAlumnoListado[] = [
    { id: 1, nombre: 'Valentina', apellido: 'Gómez',fechaNac: '2000-01-01',dni: '12345678',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
    { id: 2, nombre: 'Lucas', apellido: 'Fernández',fechaNac: '2000-01-01',dni: '12345679',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
  ] */
   const [mes, setMes] = useState(new Date().toLocaleString('default', { month: 'long' }));
   
  const handleExport = async () => {
  if (!actividad) {
    alert('Por favor, selecciona una actividad primero');
    return;
  }
  
  try {
    const actividadNombre = actividades.find(a => a.id === parseInt(actividad))?.nombre || actividad;
    await exportToExcel(alumnos, actividadNombre, mes);
  } catch (error) {
    console.error('Error al exportar:', error);
    alert('Error al exportar el archivo');
  }
};
  const handleCreateAlumno = async (data: unknown) => {
    try {
      // Acá harías la llamada a tu backend para guardar el nuevo alumno
      console.log("Nuevo alumno:", data);
      await AlumnosService.createAlumno(data);
      setFlag((flag) => flag + 1);
      getAlumnos();
    } catch (error) {
      console.error("Error al guardar alumno", error);
    } finally {
      setShowModal(false);
    }
  };
  const getAlumnos = async () => {
    const response: { cant: number; data: IAlumnoListado[] } =
      await AlumnosService.getAlumnos({
        actividad: actividad ? parseInt(actividad) : undefined,
        busqueda,
        barrio,
        limit, // o el número que quieras
        offset, // más adelante podés hacer paginación real
        orderCampo: ordenCampo,
        orderDireccion: ordenDireccion,
      });
    setTotal(response.cant); // o 'total' si cambiaste eso en el backend
    setAlumnos(response.data);
  };
  const getActividades = async () => {
    const response = await ActividadService.getAll();
    console.log(response.data);
    setActividades(response.data);
  }
  const handleSort = (campo: keyof IAlumnoListado) => {
    if (ordenCampo === campo) {
      // Si hago click en el mismo campo, invierto la dirección
      setOrdenDireccion(ordenDireccion === "ASC" ? "DESC" : "ASC");
    } else {
      // Si hago click en otro campo, lo seteo y empiezo en ASC
      setOrdenCampo(campo);
      setOrdenDireccion("ASC");
    }
  };

  useEffect(() => {
    getActividades()
    getAlumnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, ordenCampo, ordenDireccion, actividad]);
  return (
    <>
      <SideBar />
      <Panel>
        <Container fluid className="my-4">
          <div className="d-flex justify-content-between">
            <h2 className="mb-4">Listado de Alumnos</h2>
            <div className="">
              <button 
                className="btn btn-success" 
                onClick={handleExport}
                disabled={!actividad}
              >
                Exportar a Excel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                + Añadir alumno
              </button>
            </div>
          </div>
           <div className="row mb-3">
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
                <option value="enero">Enero</option>
                <option value="febrero">Febrero</option>
                <option value="marzo">Marzo</option>
                <option value="abril">Abril</option>
                <option value="mayo">Mayo</option>
                <option value="junio">Junio</option>
                <option value="julio">Julio</option>
                <option value="agosto">Agosto</option>
                <option value="septiembre">Septiembre</option>
                <option value="octubre">Octubre</option>
                <option value="noviembre">Noviembre</option>
                <option value="diciembre">Diciembre</option>
              </select>
            </div>
          </div>
          <div className="row">
            <Accordion defaultActiveKey="0" className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <LuFilter size={20} /> Filtros
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-md-3 mb-3">
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
                    <div className="col-md-3 mb-3">
                      <select
                        className="form-select"
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                      >
                        <option value={undefined}>Seleccionar actividad</option>
                        {actividades.map((act) => (
                          <option key={act.id} value={act.id}>
                            {act.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 mb-3 justify-content-between d-flex gap-2">
                      <button
                        className="btn btn-primary w-75 gap-2"
                        onClick={() => {
                          getAlumnos();
                          setOffset(0); // limpia y vuelve a pedir todo
                        }}
                      >
                        Buscar
                      </button>
                      <button
                        className="btn btn-secondary w-75"
                        onClick={() => {
                          setBusqueda("");
                          setBarrio("");
                          getAlumnos();
                          setOffset(0); // limpia y vuelve a pedir todo
                        }}
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("apellido")}
                  style={{ cursor: "pointer" }}
                >
                  Apellido{" "}
                  {ordenCampo === "apellido" &&
                    (ordenDireccion === "ASC" ? "▲" : "▼")}
                </th>
                <th
                  onClick={() => handleSort("nombre")}
                  style={{ cursor: "pointer" }}
                >
                  Nombre{" "}
                  {ordenCampo === "nombre" &&
                    (ordenDireccion === "ASC" ? "▲" : "▼")}
                </th>
                <th
                  onClick={() => handleSort("fecha_nacimiento")}
                  style={{ cursor: "pointer" }}
                >
                  Fecha de Nacimiento{" "}
                  {ordenCampo === "fecha_nacimiento" &&
                    (ordenDireccion === "ASC" ? "▲" : "▼")}
                </th>
                <th
                  onClick={() => handleSort("dni")}
                  style={{ cursor: "pointer" }}
                >
                  DNI{" "}
                  {ordenCampo === "dni" &&
                    (ordenDireccion === "ASC" ? "▲" : "▼")}
                </th>
                <th>Barrio</th>
                <th>Dirección</th>
                <th>Escuela</th>
                <th>Actividad</th>
                <th
                  onClick={() => handleSort("prioridad")}
                  style={{ cursor: "pointer" }}
                >
                  Prioridad{" "}
                  {ordenCampo === "prioridad" &&
                    (ordenDireccion === "ASC" ? "▲" : "▼")}
                </th>
                
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos?.map((a, index) => (
                <tr key={index}>
                  <td>{a.apellido}</td>
                  <td>{a.nombre}</td>
                  <td>{a.fecha_nacimiento}</td>
                  <td>{a.dni}</td>
                  <td>{a.barrio}</td>
                  <td>{a.direccion}</td>
                  <td>{a.escuela}</td>
                  <td>{a.actividad !== null ? a.actividad : "No inscripto"}</td>
                  <td>
                    {a.prioridad === 0 ? (
                      <Badge bg="black">No asignada </Badge>
                    ) : a.prioridad >= 10 ? (
                      <Badge bg="danger">Alta </Badge>
                    ) : a.prioridad >= 7 ? (
                      <Badge bg="warning">Media</Badge>
                    ) : a.prioridad >= 4 ? (
                      <Badge bg="warning">Media baja </Badge>
                    ) : (
                      <Badge bg="success">Baja </Badge>
                    )}
                  </td>
                  <td>
                    <a
                      href={`/alumnos/${a.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Más información
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginator
            cantidad={total}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
          />
        </Container>
        <AlumnoModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateAlumno}
        />
      </Panel>
    </>
  );
}
