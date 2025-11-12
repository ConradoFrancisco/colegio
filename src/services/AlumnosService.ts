import axios from "axios";
import { toast } from "react-toastify";
import type { IAlumno } from "../views/alumnos/AlumnoDetail";
import type { IAlumnoListado } from "../views/alumnos/ListAlumnos";

/* interface IFamiliar {
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
} */
const API_URL = "https://c2830044.ferozo.com/colegioApi/";
/* const API_URL = "http://localhost/colegioApi/"; */
interface GetAlumnosParams {
  busqueda?: string;
  barrio?: string;
  limit?: number;
  offset?: number;
  actividad?: number;
  orderCampo?: keyof IAlumnoListado;
  orderDireccion?: "ASC" | "DESC";
}
class AlumnosService {
  public async getAlumnos(
    params: GetAlumnosParams = {}
  ): Promise<{ data: IAlumnoListado[]; cant: number }> {
    const query = new URLSearchParams();

    if (params.busqueda) query.append("busqueda", params.busqueda);
    if (params.actividad)
      query.append("actividad", params.actividad.toString());
    if (params.barrio) query.append("barrio", params.barrio);
    if (params.orderCampo) query.append("orden", params.orderCampo);
    if (params.orderDireccion)
      query.append("orderDirection", params.orderDireccion);
    if (params.limit !== undefined)
      query.append("limit", params.limit.toString());
    if (params.offset !== undefined)
      query.append("offset", params.offset.toString());

    const response = await axios.get(
      `${API_URL}?endpoint=alumnos/getAll&${query.toString()}`
    );

    return {
      data: response.data.data,
      cant: response.data.total, // o 'cant' si cambiaste eso en el backend
    };
  }
  public async createAlumno(data: unknown): Promise<[]> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=alumnos/create`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
  public async updateAlumno(id: number, data: unknown): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=alumnos/update&id=${id}`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
  public async updateFamiliar(id: number, data: unknown): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=familiares/update&id=${id}`,
        data
      );
      toast.success("Familiar modificado correctamente");
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
  public async getById(id: string): Promise<IAlumno> {
    try {
      const response = await axios.get(
        `${API_URL}?endpoint=alumnos/get&id=${id}`
      );

      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear obtener el alumno");
      return {} as IAlumno;
    }
  }
  public async createFamiliarYvincular(data: unknown): Promise<IAlumno> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=alumnos/createFamiliar`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear obtener el alumno");
      return {} as IAlumno;
    }
  }

  public async subirDocumento(file: File, tipo: string, alumno_id: number) {
    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("tipo", tipo);
    formData.append("alumno_id", alumno_id.toString());

    try {
      const response = await axios.post(
        `${API_URL}?endpoint=documentacion/subir`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al subir el documento");
      return;
    }
  }
  public async updatePrioridad({
    alumno_id,
    canastaBasica,
    repitencia,
    ingresosHogar,
    frecuenciaEscuela,
  }: {
    alumno_id: number;
    canastaBasica: number;
    repitencia: number;
    ingresosHogar: number;
    frecuenciaEscuela: number;
  }): Promise<[]> {
    const data = {
      canastaBasica,
      repitencia,
      ingresosHogar,
      frecuenciaEscuela,
    };
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=alumnos/updatePrioridad&id=${alumno_id}`,
        data
      );
      toast.success("Respuestas guardadas correctamente");
      console.log(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
}

export default new AlumnosService();
