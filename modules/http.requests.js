
import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
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
import { ref, getDatabase, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const db = getDatabase();
const dbref = ref(db);

export const useHttp = () => {
   const request = async (url, method, body = null) => {
      try {
         let rt = [];
         if (method === 'get') {
            await get(child(dbref, url))
               .then((res) => {
                  if (res.exists()) {
                     let v = res.val();
                     if (v.name === undefined) {
                        for (let key in v) {
                           let item = v[key];
                           rt.push(item)
                        }
                     } else {
                        rt = v;
                     }
                  } else {
                     console.log('element is nod defined')
                  }
               })
         } else if (method === "post") {
            await set(ref(db, url), body)
               .then(() => {
                  rt = body;
               })
         } else if (method === "patch") {
            await update(ref(db, url), body)
               .then(() => {
                  rt = body;
               })
         } else if (method === "delete") {
            await remove(ref(db, url))
               .then(() => {
                  rt = body;
               })
         }

         return rt
      } catch (e) {
         return e
      }
   }
   return { request }
}

export function getRandomColor() {
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}



