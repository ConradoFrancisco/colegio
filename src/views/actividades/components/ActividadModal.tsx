import { Modal, Form, Button } from "react-bootstrap"
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik"
import * as Yup from "yup"
import type { IActividad } from "../../alumnos/components/InscripcionModal"



interface Props {
  show: boolean
  onClose: () => void
  onSubmit: (actividad: IActividad) => Promise<void>,
  initialData?: IActividad | null
}

/* const initialValues: IActividad = {
  nombre: "",
  tipo: "Taller",
  descripcion: "",
  cupo: null,
  turno: "TM",
  fecha_inicio: "",
  fecha_fin: "",
  estado: "Activa",
} */

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  tipo: Yup.string().oneOf(["Grupo", "Taller"]).required(),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  cupo: Yup.number().nullable().min(0, "Debe ser un número positivo").typeError("Debe ser un número"),
  turno: Yup.string().oneOf(["TM", "TT", "TV", "J Comp."]).required(),
  fecha_inicio: Yup.string().required("La fecha de inicio es obligatoria"),
  fecha_fin: Yup.string().required("La fecha de fin es obligatoria"),
  estado: Yup.string().oneOf(["Activa", "Inactiva"]).required(),
})

export default function ActividadModal({ show, onClose, onSubmit,initialData }: Props) {
  const initialValues: IActividad = initialData || {
    nombre: '',
    tipo: 'Grupo',
    descripcion: '',
    cupo: null,
    turno: 'TM',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'Activa',
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar Actividad':'Nueva Actividad'} </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values)
          actions.resetForm()
        }}
      >
        {() => (
          <FormikForm>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Field as={Form.Control} name="nombre" />
                <ErrorMessage name="nombre" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Field as={Form.Select} name="tipo">
                  <option value="Grupo">Grupo</option>
                  <option value="Taller">Taller</option>
                </Field>
                <ErrorMessage name="tipo" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Field as={Form.Control} name="descripcion" />
                <ErrorMessage name="descripcion" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cupo (opcional)</Form.Label>
                <Field as={Form.Control} name="cupo" type="number" />
                <ErrorMessage name="cupo" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Turno</Form.Label>
                <Field as={Form.Select} name="turno">
                  <option value="TM">TM</option>
                  <option value="TT">TT</option>
                  <option value="TV">TV</option>
                  <option value="J Comp.">J Comp.</option>
                </Field>
                <ErrorMessage name="turno" component="div" className="text-danger" />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Field as={Form.Control} type="date" name="fecha_inicio" />
                    <ErrorMessage name="fecha_inicio" component="div" className="text-danger" />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de fin</Form.Label>
                    <Field as={Form.Control} type="date" name="fecha_fin" />
                    <ErrorMessage name="fecha_fin" component="div" className="text-danger" />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Field as={Form.Select} name="estado">
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </Field>
                <ErrorMessage name="estado" component="div" className="text-danger" />
              </Form.Group>
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
  )
}