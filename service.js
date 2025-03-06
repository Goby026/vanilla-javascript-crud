  // URL base de la API
  const API_URL = "http://localhost:8082/api/v1/horarios";

  // Función para obtener todos los registros (GET)
  export async function obtenerRegistros() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(
          `Error al obtener los registros: ${response.statusText}`
        );
      }
      const {horarios} = await response.json();
      return horarios;
    } catch (error) {
      console.error("Error en obtenerRegistros:", error);
      throw error;
    }
  }

  // Función para crear un nuevo registro (POST)
  export async function crearRegistro(nuevoRegistro) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoRegistro),
      });
      if (!response.ok) {
        throw new Error(`Error al crear el registro: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en crearRegistro:", error);
      throw error;
    }
  }

  // Función para actualizar un registro existente (PUT)
  export async function actualizarRegistro(id, datosActualizados) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });
      if (!response.ok) {
        throw new Error(
          `Error al actualizar el registro: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en actualizarRegistro:", error);
      throw error;
    }
  }

  // Función para eliminar un registro (DELETE)
  export async function eliminarRegistro(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Error al eliminar el registro: ${response.statusText}`
        );
      }
      return { message: "Registro eliminado correctamente" };
    } catch (error) {
      console.error("Error en eliminarRegistro:", error);
      throw error;
    }
  }

// export {obtenerRegistros}