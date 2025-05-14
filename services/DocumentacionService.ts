import axios from "axios";

class DocumentacionService {
  private static instance: DocumentacionService;
  
  public async getDocumentacion(id:number): Promise<unknown> {
    const response = await axios.get(
      `${process.env.VITE_API_URL}/documentacion/${id}`
    );
    return response.data;
  }

  public async uploadDocumentacion({file, id,tipo}:{file:unknown,id:number,tipo:string}): Promise<unknown> {
   
    const response = await axios.post(
      `${process.env.VITE_API_URL}/documentacion/subir`,
      {archivo:file,tipo,id_alumno:id},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;

  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DocumentacionService();