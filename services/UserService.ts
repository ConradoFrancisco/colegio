import axios from "axios";
import { toast } from "react-toastify";

class UserService {
  async getUsers() {
    const response = await axios.get("http://localhost/ColegioApi/index.php", {
      params: { endpoint: "users" },
    });
    return response.data;
  }

  async setStates(id: number, state: number) {
    try {
      const response = await axios.put(
        "http://localhost/ColegioApi/index.php?endpoint=updateStatus",
        {
          id: id,
          estado: state,
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      toast.error("Error al actualizar el estado");
      console.log(e);
    }
  }
  async deleteUser(id: number) {
    try {
      const response = await axios.put(
        "http://localhost/ColegioApi/index.php?endpoint=updateDelete",
        {
          id: id,
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      toast.error("Error al actualizar el eliminar el usuario");
      console.log(e);
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
