import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import AlumnosService from "../../../services/AlumnosService";


interface Props {
  show: boolean;
  onClose: () => void;
  alumno_id: number;
  setFlag: (flag: number) => void;
}

export default function DocumentoModal({ show, onClose,alumno_id,setFlag }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("DNI");

  const handleSubmit = async () => {
    if (file) {
      await AlumnosService.subirDocumento(file, tipo, alumno_id);
      setFlag(alumno_id + 1);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adjuntar Documentación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="DNI">DNI</option>
              <option value="Partida de nacimiento">Partida de nacimiento</option>
              <option value="Vacunas">Calendario de vacunas</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Seleccionar archivo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!file}>
          Subir documento
        </Button>
      </Modal.Footer>
    </Modal>
  );
}