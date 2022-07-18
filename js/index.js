import {
  savetask,
  getTasks,
  onGetTasks,
  deleteTask,
  getTask,
  updatetask,
} from "./database.js";
//Import de los procedimientos de firebase
const btn_task = document.querySelector("#btn_button"),
myform=document.getElementById('task-form'),
clear=document.getElementById('reset'),
  mode = document.querySelector("#modalnewtarea");

btn_task.addEventListener("click", function () {
  mode.classList.toggle("mostrar-form");
  mode.classList.toggle("ocultar-form");
});
//Constantes para el evento del boton para llamar al aside mode, limpiar formulario myform
const containertask = document.getElementById("task-tarea");
let editStatus = false;
let id = "";
window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const data = doc.data();
      let fechauno = data.tiempo;
      let fechados = data.tiempofinal;
      fechauno = new Date(fechauno);
      fechados = new Date(fechados);
      let rest = Math.abs(fechauno - fechados);
      let days = rest / (1000 * 3600 * 24);
      days--;
   
      console.log(days);
      html += `
  <div class="card" draggable="true" ondragstart="onDragStart(event);" id="${doc.id}">
  <h3>${data.title}</h3>
  <h4>Responsable : ${data.responsable}</h4>
  <p class="nuevatarea">${data.nuevatarea}</p>
  <p class="tiempoentrega"> Inicio: ${data.tiempo} Tiempo de Entrega: ${data.tiempofinal}</p>
  <p class="limite">Faltan ${days} dias para la entrega</p>
  <button class='button btn-delete' data-id="${doc.id}">Delete</button>
  <button class='button btn-update' id="update" data-id="${doc.id}">Update</button>
  </div>
  `;
    });
    //function para recorrer la base de datos tasks y listarlas , se agrega la draggable true para realizar los eventos de arrastre 
    containertask.innerHTML = html; //se pintan los resultados de la consulta en el div contarinertask
    const btn_delete = containertask.querySelectorAll(".btn-delete");
    btn_delete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });
//function para eliminar una tarea utilizando u foreEach para recorrer los id correspondientes
    const btnedit = containertask.querySelectorAll(".btn-update")
         

    btnedit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();
        taskform["task-title"].value = task.title;
        taskform["responsable"].value= task.responsable;
        taskform["nuevatarea"].value = task.nuevatarea;
        taskform["tiempo"].value = task.tiempo;
        taskform["tiempofinal"].value = task.tiempofinal;
        editStatus = true;
        id = e.target.dataset.id;
        taskform["agregar"].innerText = "Update";
        mode.classList.toggle("ocultar-form");
      });
    });
  });
});
// function para seleccionar el id para realizar la actualizacion, al igual que btn-delete recorre los id con el forEch
const taskform = document.getElementById("task-form")
taskform.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskform["task-title"],
    responsable=taskform["responsable"],
    nuevatarea = taskform["nuevatarea"],
    tiempo = taskform["tiempo"],
    tiempofinal = taskform["tiempofinal"];
  if (!editStatus) {
    savetask(
      title.value,
      responsable.value,
      nuevatarea.value,
      tiempo.value,
      tiempofinal.value
    );
  } else {
    updatetask(id, {
      title: title.value,
      responsable: responsable.value,
      nuevatarea: nuevatarea.value,
      tiempo: tiempo.value,
      tiempofinal: tiempofinal.value,

      
    });
    editStatus = false;
    title.value = "";
    responsable.value="";
    nuevatarea.value = "";
    tiempo.value =" ";
    tiempofinal.value =" ";
    mode.classList.toggle("ocultar-form");
  }
  title.value = "";
  responsable.value="";
  nuevatarea.value = "";
  tiempo.value =" ";
  tiempofinal.value =" ";
});
// se crea la funcion agregar del formulario tareas y con un if se establece si es nueva tarea o se va a realizar un actualizacion, cuando desde la tarjeta se preciona el evento botn actualuzar (update) ytilizando el mism boton

const title = myform["task-title"],
    responsable = myform["responsable"],
    nuevatarea = myform["nuevatarea"],
    tiempo = myform["tiempo"],
    tiempofinal = myform["tiempofinal"];
clear.addEventListener('click',(e)=>{
    e.preventDefault()
    title.value = "";
    responsable.value = "";
    nuevatarea.value = "";
    tiempo.value = " ";
    tiempofinal.value = " ";
})
//creo el evento boton para el formulario nueva tarea para limpiar los inputs..