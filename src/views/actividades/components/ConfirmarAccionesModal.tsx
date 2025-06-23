"use client";

import { Modal, Button } from "react-bootstrap";
import type { IActividad } from "../../alumnos/components/InscripcionModal";

// o donde tengas tu interfaz

interface Props {
  show: boolean;
  action: string;
  onHide: () => void;
  actividad: IActividad | null;
  onEliminar: () => void;
  onToggleEstado: () => void;
}

export default function ConfirmarAccionesModal({
  show,
  action,
  onHide,
  actividad,

  onEliminar,
  onToggleEstado,
}: Props) {
  if (!actividad) return null;
  const str =
    action === "estado"
      ? `Ustéd esta a punto de ${
          actividad.estado === "Activa"
            ? "pausar la actividad"
            : "activar la actividad"
        } ${actividad.nombre}`
      : `Ustéd esta a punto de eliminar la actividad ${actividad.nombre}`;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title> {str}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === "eliminar" && (
          <p className="text-danger">Esta acción no se puede deshacer.</p>
        )}
        <p>¿Desea proseguir?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {action === "eliminar" ? (
          <Button variant="success" onClick={onEliminar}>
            Eliminar
          </Button>
        ) : (
          <Button
            variant={actividad.estado === "Activa" ? "secondary" : "success"}
            onClick={onToggleEstado}
          >
            {actividad.estado === "Activa" ? "Pausar" : "Activar"}
          </Button>
        )}

        <Button variant="danger" onClick={onHide}>
          cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
