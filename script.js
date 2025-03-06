import { obtenerRegistros, crearRegistro } from "./service.js";

// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Seteando elementos del DOM
    const form = document.getElementById("horarioForm");
    const nombreHorario = document.getElementById("nombreHorario");
    const descripcion = document.getElementById("descripcion");
    const cargaMasiva = document.getElementById("cargaMasiva");
    const nombreError = document.getElementById("nombreError");
    const descripcionError = document.getElementById("descripcionError");
    const cargaMasivaError = document.getElementById("cargaMasivaError");
    const limpiarBtn = document.getElementById("limpiarBtn");
    const pruebaBtn = document.getElementById("prueba");
  
    // Función para validar el campo de nombre de horario
    function validarNombreHorario() {
      if (nombreHorario.value.trim() === "") {
        nombreError.textContent = "El nombre de horario es requerido.";
        nombreError.style.display = "block";
        return false;
      } else if (nombreHorario.value.trim().length < 2) {
        nombreError.textContent = "El nombre debe tener al menos 2 letras.";
        nombreError.style.display = "block";
        return false;
      } else {
        nombreError.style.display = "none";
        return true;
      }
    }
  
    // Función para validar el campo de descripción
    function validarDescripcion() {
      if (descripcion.value.trim() === "") {
        descripcionError.textContent = "La descripción es requerida.";
        descripcionError.style.display = "block";
        return false;
      } else if (descripcion.value.trim().length < 2) {
        descripcionError.textContent = "La descripción debe tener al menos 2 letras.";
        descripcionError.style.display = "block";
        return false;
      } else {
        descripcionError.style.display = "none";
        return true;
      }
    }
  
    // Función para validar el campo de carga masiva
    function validarCargaMasiva() {
      if (cargaMasiva.value.trim() === "") {
        cargaMasivaError.textContent = "La carga masiva es requerida.";
        cargaMasivaError.style.display = "block";
        return false;
      } else if (cargaMasiva.value.trim().length < 2) {
        cargaMasivaError.textContent = "La carga masiva debe tener al menos 2 letras.";
        cargaMasivaError.style.display = "block";
        return false;
      } else {
        cargaMasivaError.style.display = "none";
        return true;
      }
    }
  
    // Validar el formulario al enviar
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const isNombreValido = validarNombreHorario();
      const isDescripcionValida = validarDescripcion();
      const isCargaMasivaValida = validarCargaMasiva();
  
      if (isNombreValido && isDescripcionValida && isCargaMasivaValida) {
        alert("Formulario enviado correctamente.");
        agregarRegistro();
        form.reset();
      }
    });
  
    // Limpiar campos del formulario
    limpiarBtn.addEventListener("click", function () {
      form.reset();
      nombreError.style.display = "none";
      descripcionError.style.display = "none";
      cargaMasivaError.style.display = "none";
    });


    // Obtener todos los registros
    async function mostrarRegistros() {
      try {
        const registros = await obtenerRegistros();
        console.log("Registros obtenidos:", registros);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    }

    // Crear un nuevo registro
    async function agregarRegistro() {
      const nuevoRegistro = {
        nombreHorario: nombreHorario.value,
        descripcion: descripcion.value,
        cargaMasiva: cargaMasiva.value,
      };
    
      try {
        // const registroCreado = await crearRegistro(nuevoRegistro);
        console.log(nuevoRegistro);
      } catch (error) {
        console.error("Error al crear registro:", error);
      }
    }

    // Actualizar un registro existente
    async function modificarRegistro() {
      const id = 1; // ID del registro a actualizar
      const datosActualizados = {
        nombreHorario: "Horario Tarde",
        descripcion: "Horario de trabajo de 1pm a 5pm",
        cargaMasiva: "archivo_actualizado.csv",
      };
    
      try {
        const registroActualizado = await actualizarRegistro(id, datosActualizados);
        console.log("Registro actualizado:", registroActualizado);
      } catch (error) {
        console.error("Error al actualizar registro:", error);
      }
    }

    // modificarRegistro();

    // Eliminar un registro
    async function borrarRegistro() {
      const id = 1; // ID del registro a eliminar
    
      try {
        const resultado = await eliminarRegistro(id);
        console.log(resultado.message);
      } catch (error) {
        console.error("Error al eliminar registro:", error);
      }
    }

    // borrarRegistro();    

    pruebaBtn.addEventListener("click", ()=>{
      mostrarRegistros();
    });

    
  });