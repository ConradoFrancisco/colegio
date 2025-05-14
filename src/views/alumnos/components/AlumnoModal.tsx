import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";


interface AlumnoFormValues {
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  direccion: string;
  barrio: string;
  socio_educativo: boolean;
  escuela: string;
  anio_escolar: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (values: AlumnoFormValues) => void;
}

const initialValues: AlumnoFormValues = {
  nombre: "",
  apellido: "",
  dni: "",
  fecha_nacimiento: "",
  direccion: "",
  barrio: "",
  socio_educativo: false,
  escuela: "",
  anio_escolar: "",
};

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  dni: Yup.string().required("El DNI es obligatorio"),
  fecha_nacimiento: Yup.string().required("La fecha de nacimiento es obligatoria"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  barrio: Yup.string().required("El barrio es obligatorio"),
  escuela: Yup.string().required("La escuela es obligatoria"),
  anio_escolar: Yup.string().required("El año escolar es obligatorio"),
});
const anioEscolarOptions = [
  "1er grado", "2do grado", "3er grado", "4to grado", "5to grado", "6to grado",
  "1er año", "2do año", "3er año", "4to año", "5to año", "6to año",
];

export default function AlumnoModal({ show, onClose, onSubmit }: Props) {
  return (
    <Modal size="xl" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Alumno</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ async (values) => {
          onSubmit(values);
        }}
      >
        {({ handleChange, values }) => (
          <FormikForm>
            <Modal.Body>
                <div className="row">

              {[
                { name: "nombre", label: "Nombre" },
                { name: "apellido", label: "Apellido" },
                { name: "dni", label: "DNI" },
                { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },
                { name: "direccion", label: "Dirección" },
                { name: "barrio", label: "Barrio" },
                { name: "escuela", label: "Escuela" },
               
              ].map(({ name, label, type = "text" }) => (
                <div className="col-md-6"  key={name}>

                <Form.Group className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <Field
                    as={Form.Control}
                    type={type}
                    name={name}
                    isInvalid={!ErrorMessage}
                  />
                  <ErrorMessage name={name} component="div" className="text-danger" />
                </Form.Group>
                </div>
              ))}
              <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Año escolar</Form.Label>
                    <Field as={Form.Select} name="anio_escolar">
                      <option value="">Seleccionar año escolar</option>
                      {anioEscolarOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="anio_escolar" component="div" className="text-danger" />
                  </Form.Group>
                </div>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Condición SocioEducativa"
                  name="socio_educativo"
                  checked={values.socio_educativo}
                  onChange={handleChange}
                />
              </Form.Group>
                </div>

              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </Modal.Footer>
            
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}