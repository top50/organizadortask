        const containerTask=document.querySelector('.task-tarea'),
       btn_task = document.querySelector("#btn_button") ,
     
       clear=document.getElementById('reset'),
       columnEsperando=document.getElementById('esperando'),
       columnProgreso=document.getElementById('progreso'),
        taskform = document.getElementById("myform"),
       columnFinal=document.getElementById('finalizado'),
       card_zone=document.getElementById('card_zone')
       let editStatus = false;
       let id = "";
    
        window.addEventListener('DOMContentLoaded', async()=>{
           onGetTasks((querySnapshot)=>{
                querySnapshot.forEach(doc=>{
                    let id=doc.id;
                    console.log(id)
                    let task=doc.data();                      
                    createTask(task,id);
                
                })
                function createTask(task,id){
                    let fechauno = task.tiempo;
                    let fechados = task.tiempofinal;
                    fechauno = new Date(fechauno);
                    fechados = new Date(fechados);
                    let rest = Math.abs(fechauno - fechados);
                    let days = rest / (1000 * 3600 * 24);
                    days--;
                    let newsTask=document.createElement("articule");
                        newsTask.classList.add("card");

                    let taskTitle=document.createElement('h3');
                        taskTitle.classList.add('card_title');
                        taskTitle.innerText=task.title;

                    let taskResponsable=document.createElement('h4');
                        taskResponsable.classList.add('nuevatarea');
                        taskResponsable.innerText=task.responsable;

                    let taskNewtask=document.createElement('p');
                        taskNewtask.classList.add('card_task');
                        taskNewtask.innerText=task.nuevatarea;
                    let taskDateIni=document.createElement('p');
                    taskDateIni.classList.add('tiempoentrega');
                    taskDateIni.innerHTML=`Fecha de Inicio: ${task.tiempo}`;

                    let taskDateFin=document.createElement('p');
                    taskDateFin.classList.add('tiempoentrega');
                    taskDateFin.innerHTML=`Fecha Limite de Entrega: ${task.tiempofinal}`;

                    let tasTiempo=document.createElement('p');
                        tasTiempo.classList.add('limite');
                        tasTiempo.innerHTML=`Tiempo Para la Entrega: ${days}`;


                    let taskestado=document.createElement('p');
                        taskestado.classList.add('card_estdo');
                        taskestado.innerHTML=`Estado de la tarea: ${task.estado}`;

                    let grup_btn=document.createElement('div');
                        grup_btn.classList.add('button');
                        grup_btn.innerHTML=
                        `
                        <button class='button btn-delete' data-id="${id}">Delete</button>
                        <button class='button btn-update' id="update" data-id="${id}">Update</button>
                        `
;
                        newsTask.appendChild(taskTitle);
                        newsTask.appendChild(taskResponsable);
                        newsTask.appendChild(taskNewtask);
                        newsTask.appendChild(taskDateIni);
                        newsTask.appendChild(taskDateFin);
                        newsTask.appendChild(taskestado);
                        newsTask.appendChild(tasTiempo);
                        newsTask.appendChild(grup_btn);
                       

                        if (task.estado === "esperando") {
                            columnEsperando.appendChild(newsTask);
                        }
                        if(task.estado === "progreso"){
                            columnProgreso.appendChild(newsTask);
                        }
                        if (task.estado === "finalizado") {
                            columnFinal.appendChild(newsTask);
                        }

                }//function createtask//
                       const btn_delete = document.querySelectorAll(".btn-delete");
                btn_delete.forEach(btn=>{
                btn.addEventListener('click', async (e)=>{
                    await deleteTask(e.target.dataset.id)  

                })
                })
                const btnedit = document.querySelectorAll(".btn-update")
                btnedit.forEach((btn)=>{
                btn.addEventListener('click',async(e)=>{
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data(); 
                    taskform["task-title"].value = task.title;
                    taskform["responsable"].value= task.responsable;
                    taskform["nuevatarea"].value = task.nuevatarea;
                    taskform["estado"].value = task.estado;
                    taskform["tiempo"].value = task.tiempo;
                    taskform["tiempofinal"].value = task.tiempofinal;
                    editStatus = true;
                    id = e.target.dataset.id;
                    taskform["agregar"].innerText = "Update";
                    mode.classList.toggle("ocultar-form"); 
                })   
                })

                })
         
                taskform.addEventListener("submit", async (e) => {
                e.preventDefault();
                const title = taskform["task-title"],
                responsable=taskform["responsable"],
                nuevatarea = taskform["nuevatarea"],
                    estado = taskform["estado"],
                tiempo = taskform["tiempo"],
                tiempofinal = taskform["tiempofinal"];

                    if (!editStatus) {
                await savetask(
                    title.value,
                    responsable.value,
                    nuevatarea.value,
                    estado.value,
                    tiempo.value,
                tiempofinal.value
                );
        
                } else {
                await updatetask(id, {
                title: title.value,
                responsable: responsable.value,
                nuevatarea: nuevatarea.value,
                estado: estado.value,
                tiempo: tiempo.value,
                tiempofinal: tiempofinal.value,
                
                }
                );
                editStatus = false;
                id="";
                /*title.value=" ";
                responsable.value=" ";
                nuevatarea.value=" ";
                estado.value= " ";
                tiempo.value= " ";
                tiempofinal.value = " ";  */  
             
                 }
                 mode.classList.toggle("ocultar-form"); 
                 taskform.reset();
                await getTareas();
            });
        });