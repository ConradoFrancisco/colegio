import { Modal, Form, Button, Accordion } from "react-bootstrap";
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
  telefono: string;
  turno: string;
  ingresosHogar?: number;
  canastaBasica?: number;
  repitencia?: number;
  frecuenciaEscuela?: number;
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
  telefono: "",
  turno: "",
  ingresosHogar: 0,
  canastaBasica: 0,
  repitencia: 0,
  frecuenciaEscuela: 1,
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
  telefono: Yup.string()
    .matches(/^[0-9+\s()-]*$/, "Solo se permiten números y símbolos válidos")
    .required("El teléfono es obligatorio"),
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
        onSubmit={(values) => onSubmit(values)}
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
                  { name: "telefono", label: "Teléfono" },
                ].map(({ name, label, type = "text" }) => (
                  <div className="col-md-6" key={name}>
                    <Form.Group className="mb-3">
                      <Form.Label>{label}</Form.Label>
                      <Field
                        as={Form.Control}
                        type={type}
                        name={name}
                        onChange={handleChange}
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

                <Form.Group className="mb-3">
                  <Form.Label>Turno</Form.Label>
                  <Field as={Form.Select} name="turno">
                    <option value="">Seleccionar turno</option>
                    {["TM", "TT", "TV"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="turno" component="div" className="text-danger" />
                </Form.Group>
              </div>

              {/* Accordion con datos adicionales */}
              
                    <div className="col-md-12 mb-3">
                      <Form.Label>¿De dónde provienen los principales ingresos económicos del hogar?</Form.Label>
                      <Field as={Form.Select} name="ingresosHogar" className="form-select">
                        <option value={0}>Trabajo estable en relación de dependencia</option>
                        <option value={1}>Trabajo informal estable</option>
                        <option value={2}>Trabajo informal esporádico (changas)</option>
                        <option value={3}>Asignaciones/pensiones/planes sociales</option>
                        <option value={4}>Otros</option>
                      </Field>
                    </div>

                    <div className="col-md-12 mb-3">
                      <Form.Label>¿Considerás que los ingresos familiares alcanzan para cubrir la canasta básica?</Form.Label>
                      <Field as={Form.Select} name="canastaBasica" className="form-select">
                        <option value={0}>Sí</option>
                        <option value={1}>No</option>
                        <option value={2}>Parcialmente</option>
                        <option value={3}>Muy poco</option>
                      </Field>
                    </div>

                    <div className="col-md-12 mb-3">
                      <Form.Label>Trayectoria escolar</Form.Label>
                      <Field as={Form.Select} name="frecuenciaEscuela" className="form-select">
                        <option value={1}>Regular</option>
                        <option value={2}>Discontinua</option>
                        <option value={3}>Dificultades pedagógicas</option>
                        <option value={4}>Discontinua/dificultades pedagógicas</option>
                        <option value={5}>Desvinculación</option>
                      </Field>
                    </div>

                    <div className="col-md-12 mb-3">
                      <Form.Label>¿Tuvo que hacer permanencia en algún año escolar (repitencia)?</Form.Label>
                      <Field as={Form.Select} name="repitencia" className="form-select">
                        <option value={0}>No</option>
                        <option value={1}>Sí</option>
                      </Field>
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
