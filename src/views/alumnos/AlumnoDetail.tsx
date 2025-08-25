import { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import AlumnosService from "../../services/AlumnosService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import FamiliarModal from "./components/FamiliarModal";
import InscripcionModal from "./components/InscripcionModal";
import DocumentoModal from "./components/DocumentoModal";
import AlumnoEditModal from "./components/AlumnoEditModal";
import Panel from "../../layout/Panel";
import SideBar from "../../layout/SideBar";
interface IFamiliar {
  fechaNac: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  parentesco: string;
}
interface IDocumentacion {
  id: number;
  tipo: string;
  url: string;
}

interface IActividad {
  id: number;
  nombre: string;
  tipo: "Grupo" | "Taller";
  descripcion: string;
  cupo: number | null;
  turno: "TM" | "TT" | "TV" | "J Comp.";
  fecha_inicio: string;
  fecha_fin: string;
  estado: "Activa" | "Inactiva";
  en_lista_espera: string;
}

export interface IAlumno {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNac: string;
  direccion: string;
  barrio: string;
  socioEducativo: boolean;
  escuela: string;
  anioEscolar: string;
  ingresosHogar: number;
  canastaBasica: number;
  frecuenciaEscuela: number;
  repitencia: number;
  familiares: IFamiliar[];
  actividades: IActividad[];
  documentacion: IDocumentacion[];
}
export default function AlumnoDetai() {
  const { id } = useParams();
  const [ingresosHogar, setIngresosHogar] = useState(0);
  const [canastaBasica, setCanastaBasica] = useState(0);
  const [frecuenciaEscuela, setFrecuenciaEscuela] = useState(0);
  const [repitencia, setRepitencia] = useState(0);
  /* 
  const [documentos, setDocumentos] = useState<IDocumento[]>([]);
  const [showDocModal, setShowDocModal] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docTipo, setDocTipo] = useState("DNI");
 */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await AlumnosService.updatePrioridad({
        alumno_id: Number(id),
        canastaBasica,
        repitencia,
        ingresosHogar,
        frecuenciaEscuela,
      });

      setFlag((f) => f + 1);
    } catch (error) {
      toast.error("Error al guardar las respuestas");
      console.error("Error al guardar la prioridad", error);
    }
  };
  // Simulación de un alumno
  const [showModal, setShowModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showFamiliarModal, setShowFamiliarModal] = useState(false);
  const [showInscripcionModal, setShowInscripcionModal] = useState(false);
  const [alumno, setAlumno] = useState<IAlumno | undefined>({
    id: 1,
    nombre: "Valentina",
    apellido: "Gómez",
    dni: "12345678",
    fechaNac: "2000-01-01",
    direccion: "Av. Libertador 1234",
    barrio: "Centro",
    escuela: "Escuela N° 123",
    socioEducativo: true,
    anioEscolar: "5° grado",
    canastaBasica: 0,
    ingresosHogar: 0,
    frecuenciaEscuela: 0,
    repitencia: 0,
    documentacion: [
      {
        id: 1,
        tipo: "DNI",
        url: "https://example.com/dni.jpg",
      },
      {
        id: 2,
        tipo: "Certificado de nacimiento",
        url: "https://example.com/certificado.jpg",
      },
    ],

    familiares: [
      {
        id: 1,
        nombre: "Laura",
        apellido: "Gómez",
        dni: "34567890",
        telefono: "1122334455",
        parentesco: "Madre",
        fechaNac: "1985-10-20",
      },
      {
        id: 2,
        nombre: "Carlos",
        apellido: "Gómez",
        dni: "34567891",
        telefono: "1122334466",
        parentesco: "Padre",
        fechaNac: "1980-05-15",
      },
    ],
    actividades: [
      {
        id: 1,
        nombre: "Taller de Cerámica",
        tipo: "Taller",
        descripcion: "Actividades creativas con arcilla.",
        cupo: 15,
        turno: "TT",
        fecha_inicio: "2024-03-01",
        fecha_fin: "2024-12-15",
        estado: "Activa",
        en_lista_espera: "0",
      },
      {
        id: 2,
        nombre: "Grupo Recreativo",
        tipo: "Grupo",
        descripcion: "Juegos y actividades al aire libre.",
        cupo: 25,
        turno: "TM",
        fecha_inicio: "2024-04-01",
        fecha_fin: "2024-11-30",
        estado: "Activa",
        en_lista_espera: "1",
      },
    ],
  });
  const [selectedFamiliar, setSelectedFamiliar] = useState<IFamiliar | null>({
    id: 1,
    nombre: "Laura",
    apellido: "Gómez",
    dni: "34567890",
    telefono: "1122334455",
    parentesco: "Madre",
    fechaNac: "1985-10-20",
  });
  const [flag, setFlag] = useState(0);
  // Funciones para abrir modal
  const handleAddFamiliar = () => {
    setSelectedFamiliar(null); // nuevo
    setShowFamiliarModal(true);
  };

  const handleEditFamiliar = (familiar: IFamiliar) => {
    setSelectedFamiliar({
      ...familiar,
    });
    setShowFamiliarModal(true);
  };

  useEffect(() => {
    const getAlumno = async () => {
      const response = await AlumnosService.getById(id as string);
      setAlumno(response as IAlumno); // Assuming the first element is the desired alumno
      setIngresosHogar(response.ingresosHogar);
      setCanastaBasica(response.canastaBasica);
      setFrecuenciaEscuela(response.frecuenciaEscuela);
      setRepitencia(response.repitencia);
    };
    getAlumno();
  }, [flag]);

  return (
    <>
    <SideBar/>
    <Panel>

      <Container fluid className="my-4">
        <div className="d-flex justify-content-between m-2">
          <h1>
            {alumno?.apellido}, {alumno?.nombre}
          </h1>
          <button
            className="btn btn-primary py-2"
            onClick={() => setShowModal(true)}
          >
            Editar Alumno
          </button>
        </div>

        <Row className="mb-4 d-flex">
          <Col md={6} className="d-flex">
            <Card className="w-100 h-100">
              <Card.Header>Datos personales</Card.Header>
              <Card.Body>
                <p>
                  <strong>DNI:</strong> {alumno?.dni}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong> {alumno?.fechaNac}
                </p>
                <p>
                  <strong>Dirección:</strong> {alumno?.direccion}
                </p>
                <p>
                  <strong>Barrio:</strong> {alumno?.barrio}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex">
            <Card className="w-100 h-100">
              <Card.Header>Datos académicos</Card.Header>
              <Card.Body>
                <p>
                  <strong>Escuela:</strong> {alumno?.escuela}
                </p>
                <p>
                  <strong>Año escolar:</strong> {alumno?.anioEscolar}
                </p>
                <p>
                  <strong>Condición Socioeducativa:</strong>{" "}
                  {alumno?.socioEducativo ? "Sí" : "No"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Accordion className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Familiares</Accordion.Header>
            <Accordion.Body>
              {alumno?.familiares && alumno?.familiares.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Fecha de Nacimiento</th>
                      <th>Teléfono</th>
                      <th>Parentesco</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumno.familiares.map(
                      (
                        familiar: IFamiliar,
                        index: number | null | undefined
                      ) => (
                        <tr key={index}>
                          <td>{familiar.nombre}</td>
                          <td>{familiar.apellido}</td>
                          <td>{familiar.dni}</td>
                          <td>{familiar.fechaNac}</td>
                          <td>{familiar.telefono}</td>
                          <td>{familiar.parentesco}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEditFamiliar(familiar)}
                            >
                              <i className="bi bi-pencil"></i>
                              Editar
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <div className="text-muted mb-3">
                  Este alumno aún no tiene familiares asociados.
                </div>
              )}

              <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={handleAddFamiliar}>
                  + Agregar familiar
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="mb-4">
          <Accordion.Item eventKey="1">
            <div>
              <Accordion.Header className="d-flex justify-content-between">
                Actividades
              </Accordion.Header>
            </div>
            <Accordion.Body>
              {alumno?.actividades && alumno?.actividades.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Turno</th>
                      <th>Fechas</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumno.actividades.map(
                      (act: IActividad, index: number | null | undefined) => (
                        <tr key={index}>
                          <td>{act.nombre}</td>
                          <td>{act.tipo}</td>
                          <td>{act.turno}</td>
                          <td>
                            {act.fecha_inicio} → {act.fecha_fin}
                          </td>
                          <td>
                            <Badge
                              bg={
                                act.en_lista_espera === "0"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {act.en_lista_espera === "0"
                                ? "Inscripto"
                                : "Lista de espera"}
                            </Badge>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <div className="text-muted mb-3">
                  Este alumno aún no está inscripto en ninguna actividad.
                </div>
              )}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={() => setShowInscripcionModal(true)}
                >
                  + Nueva inscripción
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Documentación adjunta</Accordion.Header>
            <Accordion.Body>
              {alumno?.documentacion ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumno?.documentacion.map(
                      (doc: IDocumentacion, index: number) => (
                        <tr key={index}>
                          <td>
                            {doc ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL_FILES}${
                                  doc?.url
                                }`}
                                height={100}
                                rel="noopener noreferrer"
                              ></img>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{doc.tipo}</td>
                          <td>
                            <button className="btn btn-danger w-100">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <>
                  <p className="text-muted mb-3">
                    No hay documentación adjunta para este alumno.
                  </p>
                  <div className="d-flex justify-content-end"></div>
                </>
              )}
              <button
                className="btn btn-success"
                onClick={() => setShowDocModal(true)}
              >
                + Adjuntar
              </button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion className="my-4">
          <Accordion.Item eventKey="3">
            <Accordion.Header>Datos adicionales del alumno</Accordion.Header>
            <Accordion.Body>
              <form className="row g-3" onSubmit={handleSubmit}>
                {/* Pregunta 1 */}
                <div className="col-md-12">
                  <label htmlFor="ingresosHogar" className="form-label">
                    ¿De dónde provienen los principales ingresos económicos del
                    hogar?
                  </label>
                  <select
                    id="ingresosHogar"
                    value={ingresosHogar}
                    onChange={(e) => setIngresosHogar(Number(e.target.value))}
                    className="form-select"
                  >
                    <option value={0}>
                      Trabajo estable en relación de dependencia
                    </option>
                    <option value={1}>Trabajo informal estable</option>
                    <option value={2}>
                      Trabajo informal esporádico (changas)
                    </option>
                    <option value={3}>
                      Asignaciones/pensiones/planes sociales
                    </option>
                    <option value={4}>Otros</option>
                  </select>
                </div>

                {/* Pregunta 2 */}
                <div className="col-md-12">
                  <label htmlFor="canastaBasica" className="form-label">
                    ¿Considerás que los ingresos familiares alcanzan para cubrir
                    la canasta básica?
                  </label>
                  <select
                    value={canastaBasica}
                    onChange={(e) => setCanastaBasica(Number(e.target.value))}
                    id="canastaBasica"
                    className="form-select"
                  >
                    <option value={0}>Sí</option>
                    <option value={1}>No</option>
                    <option value={2}>Parcialmente</option>
                    <option value={3}>Muy poco</option>
                  </select>
                </div>

                {/* Pregunta 3 */}
                <div className="col-md-12">
                  <label htmlFor="frecuenciaEscuela" className="form-label">
                    Situacion escolar
                  </label>
                  <select
                    value={frecuenciaEscuela}
                    onChange={(e) =>
                      setFrecuenciaEscuela(Number(e.target.value))
                    }
                    id="frecuenciaEscuela"
                    className="form-select"
                  >
                    <option value={1}>
                      Regular
                    </option>
                    <option value={2}>
                      Discontinua
                    </option>
                    <option value={3}>Dif Pedag.</option>
                    <option value={4}>Dif ped y Disc</option>
                    <option value={5}>Desvinculación</option>
                  </select>
                </div>

                {/* Pregunta 4 */}
                <div className="col-md-12">
                  <label htmlFor="repitencia" className="form-label">
                    ¿Tuvo que hacer permanencia en algún año escolar
                    (repitencia)?
                  </label>
                  <select
                    value={repitencia}
                    onChange={(e) => setRepitencia(Number(e.target.value))}
                    id="repitencia"
                    className="form-select"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Sí</option>
                  </select>
                </div>

                {/* Botón de guardar */}
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary mt-3">
                    Guardar respuestas
                  </button>
                </div>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Panel>
      {alumno && (
        <AlumnoEditModal
          setFlag={setFlag}
          saveAlumnno={AlumnosService.updateAlumno}
          alumno={alumno}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      {alumno && (
        <>
          <FamiliarModal
            setFlag={setFlag}
            show={showFamiliarModal}
            onHide={() => setShowFamiliarModal(false)}
            familiar={selectedFamiliar}
            alumno_id={alumno?.id}
            onSubmit={(familiar) => {
              console.log("Familiar actualizado:", familiar);
              // Aquí puedes manejar la lógica para guardar los cambios en el familiar
            }}
          />
          <InscripcionModal
            setFlag={setFlag}
            alumno_id={alumno?.id}
            show={showInscripcionModal}
            onClose={() => setShowInscripcionModal(false)}
          />
          <DocumentoModal
            onClose={() => setShowDocModal(false)}
            show={showDocModal}
            alumno_id={alumno?.id}
            setFlag={setFlag}
          />
        </>
      )}
    </>
  );
}
