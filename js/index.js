const btn_task=document.querySelector('#btn_button'),
    mode=document.querySelector('#modalnewtarea')


btn_task.addEventListener('click',function(){

 mode.classList.toggle('mostrar-form');
 mode.classList.toggle('ocultar-form');
})