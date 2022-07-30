// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM0mUBhXSMlAUc87Nmu2EgLWyzteg-7VQ",
  authDomain: "task-tello.firebaseapp.com",
  projectId: "task-tello",
  storageBucket: "task-tello.appspot.com",
  messagingSenderId: "971241884658",
  appId: "1:971241884658:web:3ca7b69a6900530524796b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
/*
variables y constatantes
*/
 const savetask=(title,responsable,nuevatarea,estado,tiempo,tiempofinal)=>
  db.collection('tasks').doc().set({title,responsable,nuevatarea,estado,tiempo,tiempofinal}).then(()=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Creo La tarea Correptamente.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(function() {
      location.reload();
  }, 1500);
  }).catch((error)=>{
    alert('Error al Crear la Tarea tarea');
  })
 const onGetTasks =(callback)=>db.collection('tasks').onSnapshot(callback);
 const getTareas = () => db.collection('tasks').get();
 const deleteTask= id =>db.collection('tasks').doc(id).delete().then(()=>{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se elimino la Tarea.',
    showConfirmButton: false,
    timer: 1500
  })
  setTimeout(function() {
    location.reload();
}, 1500);

 }).catch((error)=>{
  alert('Error al elimnar la tarea');
 });

 const  getTask=(id)=>db.collection('tasks').doc(id).get();
 const updatetask=(id,updatetask)=>db.collection('tasks').doc(id).update(updatetask).then(()=>{
  let timerInterval
  Swal.fire({
    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  setTimeout(function() {
    location.reload();
}, 2500);

<<<<<<< HEAD
 }).catch((error)=>{
  alert('Error al actualizar la tarea');
 });
  
    
=======
export const savetask=(title,responsable,nuevatarea,estado,tiempo,tiempofinal)=>
addDoc(collection(db,'tasks'), {title,responsable,nuevatarea,estado,tiempo,tiempofinal})
export const getTasks=()=>getDocs(collection(db,'tasks'));

export const onGetTasks =(callback)=>onSnapshot(collection(db,'tasks'),callback)

export const deleteTask= (id) =>deleteDoc(doc(db,'tasks',id))

export const  getTask=id=>getDoc(doc(db,'tasks',id))
export const updatetask=(id,newFields)=>updateDoc(doc(db,'tasks',id),newFields)
>>>>>>> 174bc04f425435381e9149b6b6410d2fb103c3d9
