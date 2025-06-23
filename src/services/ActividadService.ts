import axios from "axios";
import { toast } from "react-toastify";
import type { IActividad } from "../views/alumnos/components/InscripcionModal";
const API_URL = "https://c2830044.ferozo.com/colegioApi/";

export interface IInscripto {
  id: number;
  actividad_id: number;
  alumno_id: number;
  alumno_nombre: string;
  fecha_inscripcion: string; // o Date si lo convertís
  en_lista_espera: number; // 0 o 1
  observaciones: string | null;
}

interface GetActividadesParams {
  limit?: number;
  offset?: number;
  estado?: string;
}

class ActividadService {
  public async getAll(
    params: GetActividadesParams = {}
  ): Promise<{ data: IActividad[]; cant: number }> {
    const query = new URLSearchParams();
    if (params.limit !== undefined)
      query.append("limit", params.limit.toString());
    if (params.offset !== undefined)
      query.append("offset", params.offset.toString());
    if (params.estado) query.append("estado", params.estado.toString());
    try {
      const response = await axios.get(
        `${API_URL}?endpoint=actividad/getAll&${query.toString()}`
      );
      return {
        data: response.data.data,
        cant: response.data.total, // o 'cant' si cambiaste eso en el backend
      };
    } catch (e) {
      console.log(e);
      toast.error("Error al obtener las actividades");
      return {
        cant: 0,
        data: [
          {
            nombre: "",
            tipo: "Grupo",
            descripcion: "",
            cupo: 0,
            fecha_fin: "",
            fecha_inicio: "",
            estado: "Activa",
            turno: "TM",
          },
        ],
      };
    }
  }
  public async createActividad(data: IActividad): Promise<[]> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=actividad/create`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear la actividad");
      return [];
    }
  }
  public async createInscripcion(data: unknown): Promise<[]> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=inscripcion/create`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear la inscripcion");
      return [];
    }
  }

  public async toggleInscripcion(
    id: number,
    estado: number | string
  ): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=inscripcion/toggleState&id=${id}`,
        { estado }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al modificar la inscripcion");
      return [];
    }
  }

  public async getInscriptos(id: number): Promise<IInscripto[]> {
    try {
      const response = await axios.get(
        `${API_URL}?endpoint=inscripcion/getInscriptos&id=${id}`
      );
      return response.data.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al obtener los inscriptos");
      return [];
    }
  }
  public async updateActividad(id: number, data: IActividad): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=actividad/update&id=${id}`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al modificar la actividad");
      return [];
    }
  }
  public async updateEstado(id: number, estado: string): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=actividad/updateEstado&id=${id}`,
        { estado }
      );
      console.log("estado", estado);
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al modificar la actividad");
      return [];
    }
  }
}

export default new ActividadService();
