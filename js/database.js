
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
  import { getFirestore,collection,addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDhctmZXQByBeRT4DuIwbOzNVRXRDcEh-E",
    authDomain: "fir-tello-b31fc.firebaseapp.com",
    projectId: "fir-tello-b31fc",
    storageBucket: "fir-tello-b31fc.appspot.com",
    messagingSenderId: "368730402469",
    appId: "1:368730402469:web:05afb55d951cd71151a74c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db=getFirestore()


export const savetask=(title,responsable,nuevatarea,estado,tiempo,tiempofinal)=>
addDoc(collection(db,'tasks'), {title,responsable,nuevatarea,estado,tiempo,tiempofinal})
export const getTasks=()=>getDocs(collection(db,'tasks'));

export const onGetTasks =(callback)=>onSnapshot(collection(db,'tasks'),callback)

export const deleteTask= (id) =>deleteDoc(doc(db,'tasks',id))

export const  getTask=id=>getDoc(doc(db,'tasks',id))
export const updatetask=(id,newFields)=>updateDoc(doc(db,'tasks',id),newFields)