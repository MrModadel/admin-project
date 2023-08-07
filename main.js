import { useHttp } from "./modules/http.requests";
import { reloadLessons } from "./modules/ui";
import { upload_img } from "./modules/upload";
let container = document.querySelector('.lessons__container');
let label = document.querySelector('.less-add__back-img');
let img_box = document.querySelector('.img-box');
let input = document.getElementById('image_uploads');
let span = document.querySelector('.less-add__plus');
let fl = false;
input.onchange = () => {
   let fileList = input.files[0];
   if (fileList) {
      let img = document.createElement('img');
      img.src = URL.createObjectURL(fileList);
      fl = fileList
      img_box.append(img);
      label.style.display = 'none';
   }
}
let { request } = useHttp();


request('/lessons', 'get')
   .then(res => reloadLessons(res, container))

let arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];

let item = document.querySelector('.text-content');

let item_text = item.innerText.split(' ');
for (let el of item_text) {
   arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];
   el = el.toLocaleLowerCase()
   if (arrBlueText.includes(el)) {
      item.innerHTML = item.innerHTML.replace(el, `<span class="blue-text">${el}</span>`)
   }
}
span.onclick = () => {
   let main_text = item.innerText;
   let img_src = fl || null;
   if (img_src !== null) {
      upload_img(img_src, null, null, true);
      let inter = setInterval(() => {
         let img = localStorage.getItem('img_give') || null;
         if (img !== null) {
            clearInterval(inter);
            arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];
            let obj = {
               name: main_text,
               blueEffects: arrBlueText,
               img: img
            }
            localStorage.setItem('create_lessons_save', JSON.stringify(obj))
            location.assign('pages/edit-lesson/?create')
         }
      }, 4)
   } else {
      arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];
      let obj = {
         name: main_text,
         blueEffects: arrBlueText,
         img: img_src
      }
      localStorage.setItem('create_lessons_save', JSON.stringify(obj))
      location.assign('pages/edit-lesson/?create')
   }
}
