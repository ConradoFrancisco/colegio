"use client";

import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ActividadService from "../../../services/ActividadService";

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

interface Props {
  show: boolean;
  onClose: () => void;
  setFlag: (flag: number) => void
  alumno_id: number;
}

export default function InscripcionModal({ show, onClose, alumno_id,setFlag }: Props) {
  const [actividades, setActividades] = useState<IActividad[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (show) {
      const fetchActividades = async () => {
        const res = await ActividadService.getAll({ limit: 100, offset: 0,estado: "Activa" });
        const { data } = res;
        setActividades(data);
      };
      fetchActividades();
    }
  }, [show]);

  const handleSubmit = async () => {
    if (selectedId) {
      await ActividadService.createInscripcion({
        actividad_id: selectedId,
        alumno_id: alumno_id,
      });
    }
    onClose();
    setSelectedId(null);
    setFlag(alumno_id + 1);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Actividad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select onChange={(e) => setSelectedId(Number(e.target.value))}>
          <option value="">Seleccioná una actividad</option>
          {actividades?.map((act) => (
            <option key={act.id} value={act.id}>
              {act.nombre} - ({act.turno}) - {act.tipo}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!selectedId}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
