 const mode = document.querySelector("#modalnewtarea"),

  btn_closed=document.getElementById('closed')

   btn_task.addEventListener("click", function () {
    mode.classList.toggle("mostrar-form");
    mode.classList.toggle("ocultar-form");
  });

        btn_closed.addEventListener('click',(e)=>{
            e.preventDefault();
            mode.classList.toggle("ocultar-form");
        })