// Importa funciones y variables auxiliares para manejo de datos en localStorage
import { valor, guardar, recuperar } from "./auxiliar.js";

// Elementos del DOM
const btnGuardar = document.querySelector("[data-name='btn-guardar']"); // Botón para guardar tarea
const textoTarea = document.querySelector("input[name='nueva-tarea']"); // Input de nueva tarea
const listadoTareas = document.querySelector("ul"); // Lista de tareas
const btnLimpiar = document.querySelector("#btn-limpiar") // Botón para limpiar todas las tareas

// Array que almacena el histórico de tareas, recuperado de localStorage o vacío
let historicoTareas = recuperar("estados") ?? []

// Función para guardar una nueva tarea
export function guardarTarea(evento){
    console.log(textoTarea.value); // Muestra en consola el valor ingresado
    historicoTareas.push(textoTarea.value) // Agrega la tarea al array

    // Crea el HTML de la nueva tarea y la agrega a la lista
    const tarea = `<li class="flex justify-between items-center">
                <span> ${textoTarea.value} </span>
                <button class="bg-red-900 px-3 rounded-lg eliminar">x</button>
    </li>`
    listadoTareas.insertAdjacentHTML("beforeend", tarea)

    // Muestra notificación tipo toast al crear la tarea
    Toastify({
        text: `Nueva tarea: ${textoTarea.value}`,
        duration: 2500,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, crimson, black)",
            color: "white"
        }
    }).showToast();

    // Guarda el array actualizado en localStorage
    guardar("estados", historicoTareas)
}

// Evento click para guardar tarea
btnGuardar.addEventListener("click", guardarTarea);

// Evento click para limpiar todas las tareas con confirmación SweetAlert2
btnLimpiar.addEventListener("click", async function(evento){
    const objeto = await Swal.fire({
        title: "¿Deseas eliminar las tareas?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Borrar",
        denyButtonText: `No borrar`
    });
    // Si el usuario confirma o niega, muestra notificación y limpia si corresponde
    if (objeto.isConfirmed || objeto.isDenied) {
        Swal.fire({
            title: "Borrado total",
            text: objeto.isConfirmed ? "Hemos eliminado todo el contenido" : "Hemos mantenido todos los datos",
            icon: objeto.isConfirmed ? "success" : "error"
        });
        if (objeto.isConfirmed) {
            listadoTareas.innerHTML = "";
            guardar("estados", []);
        }
    }
    // Si se cancela, no hace nada
})

// Función para recuperar todas las tareas guardadas y mostrarlas en la lista
function recuperarTodo() {
    const mostrar = historicoTareas.map(
        function (elemento) {
            return `<li class="flex justify-between items-center">
                        <span>${elemento}</span>
                        <button class="bg-red-900 px-3 rounded-lg eliminar">x</button>
                    </li>`
        }
    )
    
    listadoTareas.insertAdjacentHTML("beforeend" , mostrar.join(""))
}

// Delegación de eventos para eliminar tareas individuales y mostrar alertas al hacer click en el texto
listadoTareas.addEventListener("click", function(evento){
    /* Delegación de eventos:
       Llega al hijo a través del padre (elemento HTML)
    */
    console.log("Evento: ", evento.target);

    // Si se hace click en el botón de eliminar
    if (evento.target.tagName == "BUTTON") {
        const texto = evento.target.closest("li").querySelector("span").textContent
        console.log("revisar: ",texto);
        
        evento.target.closest("li").remove()
        historicoTareas = historicoTareas.filter(function(tarea){
            return tarea != texto
        })
        
        guardar("estados", historicoTareas)

    }

    // Si se hace click en el texto de la tarea
    if (evento.target.tagName == "SPAN") {
        alert(evento.target.textContent)
    }
    
})

// Inicializa la lista de tareas al cargar la página
recuperarTodo()

/*
// Ejemplo de eliminación periódica de tareas (no utilizado actualmente)
setInterval(
    function () {
        btnsEliminar =  document.querySelectorAll(".eliminar")

        btnsEliminar.forEach(
            function(elemento){
                elemento.addEventListener("click", function (evento) {
                    evento.target.closest("li").outerHTML = ""
                })
            }
        )
    }
    , 3000)
*/


