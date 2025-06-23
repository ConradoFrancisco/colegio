"use client";

import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


interface Alumno {
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
}

interface AlumnoEditModalProps {
  alumno: Alumno;
  show: boolean;
  onClose: () => void;
  saveAlumnno : (id: number, data: unknown) => Promise<[]>,
  setFlag: (flag: number) => void;
}

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  dni: Yup.string().required("El DNI es obligatorio"),
  fechaNac: Yup.string().required("La fecha de nacimiento es obligatoria"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  barrio: Yup.string().required("El barrio es obligatorio"),
  escuela: Yup.string().required("La escuela es obligatoria"),
  anioEscolar: Yup.string().required("El año escolar es obligatorio"),
});

export default function AlumnoEditModal({
  alumno,
  show,
  onClose,
  saveAlumnno,
  setFlag,
}: AlumnoEditModalProps) {

  
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Alumno</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={alumno}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await saveAlumnno(alumno.id,values);
          setFlag(alumno.id + 1);
          onClose();
        }}
      >
        {({ values, handleChange }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Field as={Form.Control} name="nombre" />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Field as={Form.Control} name="apellido" />
                <ErrorMessage
                  name="apellido"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>DNI</Form.Label>
                <Field as={Form.Control} name="dni" />
                <ErrorMessage
                  name="dni"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Field as={Form.Control} type="date" name="fechaNac" />
                <ErrorMessage
                  name="fechaNac"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Field as={Form.Control} name="direccion" />
                <ErrorMessage
                  name="direccion"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Barrio</Form.Label>
                <Field as={Form.Control} name="barrio" />
                <ErrorMessage
                  name="barrio"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <hr />
              <h5>Datos Académicos</h5>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Condición SocioEducativa"
                  name="socioEducativo"
                  checked={values.socioEducativo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Escuela</Form.Label>
                <Field as={Form.Control} name="escuela" />
                <ErrorMessage
                  name="escuela"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Año escolar</Form.Label>
                  <Field as={Form.Select} name="anioEscolar">
                    <option value="">Seleccionar año</option>
                    <option value="1° grado">1° grado</option>
                    <option value="2° grado">2° grado</option>
                    <option value="3° grado">3° grado</option>
                    <option value="4° grado">4° grado</option>
                    <option value="5° grado">5° grado</option>
                    <option value="6° grado">6° grado</option>
                    <option value="1° año">1° año</option>
                    <option value="2° año">2° año</option>
                    <option value="3° año">3° año</option>
                    <option value="4° año">4° año</option>
                    <option value="5° año">5° año</option>
                    <option value="6° año">6° año</option>
                  </Field>
                  <ErrorMessage
                    name="anioEscolar"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <ErrorMessage
                  name="anioEscolar"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}
