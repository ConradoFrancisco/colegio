import axios from "axios";
const API_URL = "https://c2830044.ferozo.com/colegioApi/";
class DocumentacionService {
  public async getDocumentacion(id: number): Promise<unknown> {
    const response = await axios.get(`${API_URL}/documentacion/${id}`);
    return response.data;
  }

  public async uploadDocumentacion({
    file,
    id,
    tipo,
  }: {
    file: unknown;
    id: number;
    tipo: string;
  }): Promise<unknown> {
    const response = await axios.post(
      `${API_URL}/documentacion/subir`,
      { archivo: file, tipo, id_alumno: id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
}

export default new DocumentacionService();
