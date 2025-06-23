/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Badge, Modal, Table } from "react-bootstrap";
import ActividadService from "../../../services/ActividadService";

export interface IInscripto {
  id: number;
  alumno_id: number;
  alumno_nombre: string; // nombre completo
  actividad_id: number;
  fecha_inscripcion: string; // o Date si lo convertís
  observaciones: string | null;
  en_lista_espera: number | string; // asumí que estos son los posibles
}




export default function InscriptosModal({
  idActividad,
  show,
  onHide,
}: {
  idActividad: number;
  show: boolean;
  onHide: () => void;
}) {
  const [inscriptos, setInscriptos] = useState<IInscripto[]>([]);
  const fetchInscriptos = async () => {
    const res = await ActividadService.getInscriptos(idActividad);
    console.log(res);
    setInscriptos(res);
  };

  useEffect(() => {
    // fetch inscriptos
    // set inscriptos
    fetchInscriptos();
  }, [idActividad]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inscriptos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lista de inscriptos</p>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del alumno</th>
                <th>Fecha de inscripción</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inscriptos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No hay inscriptos
                  </td>
                </tr>
              ) : (
                inscriptos?.map((inscripto, index) => (
                  <tr key={inscripto.id}>
                    <td>{index + 1}</td>
                    <td>{inscripto.alumno_nombre}</td>
                    <td>
                      {new Date(
                        inscripto.fecha_inscripcion
                      ).toLocaleDateString()}
                    </td>
                    <td>{inscripto.observaciones || "-"}</td>
                    <td>
                      <Badge
                        bg={
                          inscripto.en_lista_espera === 0
                            ? "success"
                            : "warning"
                        }
                      >
                        {inscripto.en_lista_espera === 0
                          ? "Inscripto"
                          : "Lista de espera"}
                      </Badge>
                    </td>
                    <td>
                        <button className={`btn btn-${inscripto.en_lista_espera === 1 ? 'success' : 'warning'}`} onClick={async () => {
                          await ActividadService.toggleInscripcion(inscripto.id,inscripto.en_lista_espera === 0 ? 1 : 0);
                          fetchInscriptos();
                            
                        }
                        }>
                          {inscripto.en_lista_espera === 1 ? 'Alta inscripcion' : 'Baja inscripcion'}
                        </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onHide}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
