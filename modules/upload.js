
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
const firebaseConfig = {
   apiKey: "AIzaSyAEx504k-4Jhk-OSLlAo83SMpCPOEghIac",
   authDomain: "admin-menu-server.firebaseapp.com",
   databaseURL: "https://admin-menu-server-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "admin-menu-server",
   storageBucket: "admin-menu-server.appspot.com",
   messagingSenderId: "707341510522",
   appId: "1:707341510522:web:4c3bbd5a9fdf56e3a658c3"
};
const app = initializeApp(firebaseConfig);

let { request } = useHttp();

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { useHttp } from "./http.requests";
const storage = getStorage();

export async function upload_img(file, item, id, b = false, isValue) {
   const storageRef = ref(storage, 'images/' + file.name);
   const uploadTask = uploadBytesResumable(storageRef, file);
   uploadTask.on('state_changed',
      async (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
            case 'paused':
               console.log('Upload is paused');
               break;
            case 'running':
               console.log('Upload is running');
               break;
         }
      },
      (error) => {
         console.log('Что-то пошло не так ошибка:' + error);
      },
      () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (item !== null) {
               item.src = downloadURL;
               item.style.display = 'block';
            }
            if (id !== null)
               request('lessons/' + id, "get").then((res) => {
                  if (isValue)
                     res.values.img = downloadURL;
                  else
                     res.img = downloadURL;
                  request('lessons/' + id, 'patch', res)
               })
            if (b) {
               localStorage.setItem('img_give', downloadURL)
            }
         });
      }
   )
}