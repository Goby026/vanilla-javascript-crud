import { obtenerRegistros, crearRegistro, obtenerRegistroPorId } from "./service.js";

// URL base de la API
// const API_URL = "http://localhost:8082/api/v1/carga-masiva";

document.addEventListener("DOMContentLoaded", () => {

// Elementos del DOM
const tablaRegistros = document.getElementById("tablaRegistros").getElementsByTagName("tbody")[0];
const abrirFormularioBtn = document.getElementById("abrirFormularioBtn");
const formularioModal = document.getElementById("formularioModal");
const cerrarModalBtn = document.getElementById("cerrarModalBtn");
const horarioForm = document.getElementById("horarioForm");
const tituloFormulario = document.getElementById("tituloFormulario");
// const guardarBtn = document.getElementById("guardarBtn");
const cancelarBtn = document.getElementById("cancelarBtn");

let registroEditando = null; // Almacena el ID del registro que se está editando

// Función para cargar los registros en la tabla
async function cargarRegistros() {
  try {
    const registros = await obtenerRegistros();
    tablaRegistros.innerHTML = ""; // Limpiar la tabla antes de cargar los registros

    // console.log('registros: ----> ',registros);

    registros.forEach((registro) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${registro.id}</td>
        <td>${registro.descripcion}</td>
        <td>${registro.ingreso}</td>
        <td>${registro.salida}</td>
        <td>${registro.programacion}</td>
        <td>${registro.cargamasiva}</td>
        <td>${registro.estado}</td>
        <td class="acciones">
          <button class="editar" onclick="editarRegistro(${registro.id})">Editar</button>
          <button class="eliminar" onclick="eliminarRegistro(${registro.id})">Eliminar</button>
        </td>
      `;
      tablaRegistros.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar registros:", error);
  }
}

// Función para abrir el formulario de registro/edición
function abrirFormulario(editar = false, registro = null) {
  if (editar) {
    tituloFormulario.textContent = "Editar Horario";
    registroEditando = registro.id;
    document.getElementById("nombreHorario").value = registro.nombreHorario;
    document.getElementById("descripcion").value = registro.descripcion;
    document.getElementById("cargaMasiva").value = registro.cargaMasiva;
  } else {
    tituloFormulario.textContent = "Registrar Nuevo Horario";
    registroEditando = null;
    horarioForm.reset();
  }
  formularioModal.style.display = "block";
}

// Función para cerrar el formulario
function cerrarFormulario() {
  formularioModal.style.display = "none";
}

// Función para manejar el envío del formulario [REGISTRAR]
horarioForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const descripcion = document.getElementById("nombreHorario").value;
  const ingreso = document.getElementById("ingreso").value;
  const salida = document.getElementById("salida").value;
  const programacion = document.getElementById("programacion").value;
  const cargamasiva = document.getElementById("cargaMasiva").value;
  const estado = document.getElementById("estado").value;

  const registro = {
    descripcion,
    ingreso,
    salida,
    programacion,
    cargamasiva,
    estado
  }

  try {
    if (registroEditando) {
      await actualizarRegistro(registroEditando, registro);
    } else {
      await crearRegistro(registro);
    }
    
    cerrarFormulario();
    cargarRegistros();
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
});

// Función para editar un registro
async function editarRegistro(id) {
  try {
    const registro = await obtenerRegistroPorId(id);
    abrirFormulario(true, registro);
  } catch (error) {
    console.error("Error al obtener el registro para editar:", error);
  }
}

// Función para eliminar un registro
async function eliminarRegistro(id) {
  try {
    await eliminarRegistro(id);
    cargarRegistros();
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
  }
}

// Eventos
abrirFormularioBtn.addEventListener("click", () => abrirFormulario());
cerrarModalBtn.addEventListener("click", cerrarFormulario);
cancelarBtn.addEventListener("click", cerrarFormulario);

// Cargar los registros al iniciar la página
cargarRegistros();

});