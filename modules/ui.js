import { useHttp } from "./http.requests";
import { upload_img } from "./upload";

export function reloadLessons(arr, place) {
   place.innerHTML = ' ';
   let doc = document;
   let bu = true;
   for (let i of arr) {
      let divLessons = doc.createElement('div');
      let top = doc.createElement('div');
      let bottom = doc.createElement('div');
      let input = doc.createElement('input');
      //top part of lesson card with title and images
      let top_h2 = doc.createElement('h2');
      let top_img = doc.createElement('img');
      //bottom 
      let edit_box_1 = reloadEditMenu("black", "black-pencil", "trash");
      let edit_one = edit_box_1.edit;
      let edit_box_2 = reloadEditMenu("black", "black-pencil", "trash");
      let edit_two = edit_box_2.edit;
      let bottom_img = doc.createElement('img');
      /*style*/
      input.style.opacity = 0;
      input.style.display = 'none';
      divLessons.className = 'lessons__item item';
      divLessons.id = i.id;
      top.classList.add('item__top');
      bottom.classList.add('item__bottom');
      top_h2.classList.add('item__title');
      top_img.classList.add('item__img');
      bottom_img.classList.add("item__img-arrow");
      input.id = 'file_input'
      /* inner */
      top_h2.id = Math.random();
      top_h2.dataset.itemid = i.id
      top_h2.dataset.name = 'name';
      top_img.height = 200;
      top_img.width = 200;
      top_img.style.objectFit = 'contain'
      input.type = 'file';
      input.accept = ".jpg, .jpeg, .png";
      let nametext;
      top_h2.innerText = i.name.toLocaleLowerCase();
      let wrapperText = top_h2.innerText.toLocaleLowerCase().split(' ');
      if (!Array.isArray(i.blueEffects)) {
         i.blueEffects = [];
      }
      for (let text of i.blueEffects) {
         if (top_h2.innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
            let index = wrapperText.indexOf(text.toLocaleLowerCase());
            if (index !== -1) {
               wrapperText[index] = `<span class="blue-text">${text}</span>`;
            }
         }
      }
      wrapperText = wrapperText.join(' ')
      top_h2.innerHTML = wrapperText;
      nametext = i.name.toLocaleLowerCase();
      if (i.img) {
         top_img.src = i.img;
      } else {
         top_img.style.display = 'none'
         edit_box_2.span_one.className = 'edit__add';
      }
      bottom_img.src = '/images/arrow-bottom.svg';
      //append
      top.append(top_h2, top_img);
      bottom.append(edit_one, bottom_img, edit_two);
      if (bu) {
         document.body.append(input)
         bu = false
      }
      divLessons.append(top, bottom);
      place.append(divLessons);
      let b = true;
      //functions
      bottom_img.onclick = async () => {
         divLessons.style.justifyContent = 'flex-start';
         let num = divLessons.getBoundingClientRect().height;
         let n = num;
         await request('/lessons/' + i.id, 'get').then(res => i = res);
         let inter = setInterval(() => {
            if (n >= 770) {
               setTimeout(() => {
                  let title = Math.random();
                  let text = Math.random();
                  let btn1 = Math.random();
                  let btn2 = Math.random();
                  divLessons.innerHTML = `<div class="header-edit__container less-add" id="${i.id}" style="width:100%;border:0;padding:0; box-shadow:none; margin:50px 0 0 0;">
                  <div class="header-edit__left hd-left">
                     <div class="hd-left__top-box  less-add__top-box">
                        <div class="blue-edit edit" data-id="${title}">
                           <span class="black-pencil" id="title-dblclick"></span>
                           <span class="blue-pencil" id="title-blue-edit" data-progres="true"></span>
                        </div>
                        <p>Для выделения активным цветом выберите <br> текст и нажмите на синий карандашик</p>
                     </div>
                     <h1 class="hd-left__title less-add__title" data-link="${title}" data-name="name" data-itemId="${i.id}">
                     ${(function () {
                        let t = '';
                        nametext.length > 48 ? t = nametext.slice(0, 48) + '...' : t = nametext;
                        let wrapperText = t.toLocaleLowerCase().split(' ');
                        if (i.blueEffects) {
                           for (let text of i.blueEffects) {
                              if (t.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                                 let index = wrapperText.indexOf(text.toLocaleLowerCase());
                                 if (index !== -1) {
                                    wrapperText[index] = `<span class="blue-text">${text}</span>`;
                                 }
                              }
                           }
                        }
                        wrapperText = wrapperText.join(' ')
                        t = wrapperText;
                        return t;
                     })()}
                     </h1>
                     <div class="hd-left__text-box">
                        <p data-name="description" data-itemId="${i.id}" data-link="${text}">${i.description ? i.description : 'Текст'}
                        </p>
                        <div class="black-edit edit" data-id="${text}">
                           <span class="black-pencil"></span>
                           <span class="trash"></span>
                        </div>
                     </div>
                     <div class="hd-left__btn-box">
                        <button data-itemId="${i.id}" data-name="btn_1" class="hd-left__btn btn first-btn" data-link="${btn1}">${i.btn_1 ? i.btn_1 : 'Начать бесплатно'}</button>
                        <div class="black-edit edit" data-id="${btn1}">
                           <span class="black-pencil"></span>
                           <span class="trash"></span>
                        </div>
                     </div>
                     <div class="hd-left__btn-box">
                        <button data-itemId="${i.id}" data-name="btn_2" class="hd-left__btn btn --back --border" data-link="${btn2}">${i.btn_2 ? i.btn_2 : 'приобрести симуляцию'}</button>
                        <div class="black-edit edit" data-id="${btn2}">
                           <span class="black-pencil"></span>
                           <span class="trash"></span>
                        </div>
                     </div>
                  </div>
                  <div class="header-edit__right hd-right">
                     <img data-itemId="${i.id}" data-name="img" src="${i.img}" alt="img" data-img style="width:100%;height:100%; object-fit:contain;" />
                     <div class="black-edit edit hd-right__edit" data-img_edit>
                        <span class="black-pencil"></span>
                        <span class="trash"></span>
                     </div>
                  </div>
                  <a href="#" data-itemid="${i.id}" class="a_sim">Подробнее об этом <span>симуляторе</span></a>
                  </div>`
                  startReloadToEditbale(i.blueEffects);
                  let images = document.querySelectorAll('[data-img]');
                  let edits = document.querySelectorAll('[data-img_edit]');
                  for (let numder = 0; numder <= images.length - 1; numder++) {
                     if (images[numder].dataset.active !== 'true' && edits[numder].dataset.active !== 'true') {
                        reloadImg(images[numder], edits[numder], i);
                        images[numder].dataset.active = 'true';
                        edits[numder].dataset.active = 'true';
                     }
                  }
                  let as = document.querySelectorAll('.a_sim');
                  as.forEach(a => {
                     a.onclick = (e) => {
                        e.preventDefault();
                        location.assign('/pages/edit-lesson/?itemid=' + a.dataset.itemid)
                     }
                  })
                  divLessons.style.minHeight = `fit-content`;
                  let height = divLessons.getBoundingClientRect().height;
                  divLessons.style.minHeight = `${height + 50}px`
               }, 300);
               clearInterval(inter);
               return
            }
            n++;
            n++;
            n++;
            n++;
            divLessons.style.minHeight = `${n}px`;
            if (n === num + 200) {
               edit_one.remove();
               edit_two.remove();
               bottom.style.justifyContent = 'center'
            }
         }, 4

         )
      }
      let disposable = true;
      edit_box_1.span_one.onclick = function () {
         if (b) {
            $(`[id='${top_h2.id}']`).editable($(`[id='${this.id}']`));
            b = false;
         };
         let inter = setInterval(function () {
            if (top_h2.style.display !== 'none') {
               clearInterval(inter);
               nametext = top_h2.innerHTML;
            }
         }, 100)
      }
      edit_box_1.span_two.onclick = function () {
         top_h2.innerHTML = ' ';
         edit_box_1.span_one.click();
         if (disposable) {
            edit_box_1.span_one.click();
            disposable = false
         }
         let inter = setInterval(function () {
            if (top_h2.style.display !== 'none') {
               clearInterval(inter);
               nametext = top_h2.innerHTML;
            }
         }, 100)
      }
      //img
      edit_box_2.span_one.onclick = () => {
         input.click();
         input.onchange = () => {
            let f = input.files[0];
            if (f) {
               upload_img(f, top_img, i.id);
               if (edit_box_2.span_one.classList.contains('edit__add')) {
                  edit_box_2.span_one.className = 'black-pencil'
                  top_img.style.display = 'block'
               }
            }
         }
      }
      edit_box_2.span_two.onclick = () => {
         top_img.src = ' ';
         edit_box_2.span_one.className = 'edit__add';
         i.img = null;
         request('/lessons/' + i.id, 'patch', i).then(() => { top_img.style.display = 'none' });
      }
   }
}
function reloadEditMenu(color, classOne, classTwo) {
   let doc = document;
   let edit = doc.createElement('div');
   let span_one = doc.createElement('span');
   let span_two = doc.createElement('span');
   //style
   edit.className = `${color}-edit edit`
   span_one.className = classOne;
   span_two.className = classTwo;
   span_one.id = Math.random()
   span_two.id = Math.random()
   //append
   edit.append(span_one, span_two);

   return { edit: edit, span_one: span_one, span_two: span_two };
}
let { request } = useHttp();
//plugin to make any element text editable 
$.fn.extend({
   editable: function (edit) {
      $(this).each(async function () {
         var $el = $(this),
            fontSize = $el.css('font-size'),
            textTans = $el.css('text-transform'),
            item,
            arrBlueText,
            $edittextbox = $('<input type="text" class="temporary-input"></input>').css('min-width', $el.width()).css('min-height', $el.height()).css('font-size', fontSize).css('text-transform', textTans),
            submitChanges = function () {
               if ($edittextbox.val() !== '') {
                  $el.html($edittextbox.val().trim());
                  let att = {}
                  att[$el[0].dataset.name] = $edittextbox.val().trim().replaceAll(' ', ' ');
                  if (item !== undefined && item !== null) {
                     request('/lessons/' + item.id, 'patch', att)
                        .then(res => console.log(res))
                  }
                  if ($el[0].dataset.create_lesson === 'true') {
                     arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];
                     let wrapperText = $el[0].innerText.toLocaleLowerCase().split(' ');
                     for (let text of arrBlueText) {
                        if ($el[0].innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                           let index = wrapperText.indexOf(text.toLocaleLowerCase());
                           if (index !== -1) {
                              wrapperText[index] = `<span class="blue-text">${text}</span>`;
                           }
                        }
                     }
                     wrapperText = wrapperText.join(' ')
                     $el[0].innerHTML = wrapperText;
                  } else {
                     request('/lessons/' + $el[0].dataset.itemid, 'get')
                        .then(res => arrBlueText = res.blueEffects || [])
                        .then(() => {
                           let wrapperText = $el[0].innerText.toLocaleLowerCase().split(' ');
                           for (let text of arrBlueText) {
                              if ($el[0].innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                                 let index = wrapperText.indexOf(text.toLocaleLowerCase());
                                 if (index !== -1) {
                                    wrapperText[index] = `<span class="blue-text">${text}</span>`;
                                 }
                              }
                           }
                           wrapperText = wrapperText.join(' ')
                           $el[0].innerHTML = wrapperText;
                        })
                  }
                  $el.show();
                  $el.trigger('editsubmit', [$el.html()]);
                  $(document).unbind('click', submitChanges);
                  $edittextbox.detach();
               }
            },
            tempVal;
         $edittextbox.click(function (event) {
            event.stopPropagation();
         });
         edit.click(function (e) {
            let items = e.originalEvent.composedPath();
            items.forEach(el => {
               if (el.className === 'lessons__item item') {
                  item = el
               }
            })
            tempVal = $el.text().trim();
            $edittextbox.val(tempVal).insertBefore($el)
               .bind('keypress', function (e) {
                  var code = (e.keyCode ? e.keyCode : e.which);
                  if (code == 13) {
                     submitChanges();
                  }
               }).select();
            $el.hide();
            $(document).click(submitChanges);
            return false;
         });
      });
      return this;
   }
});
export function blueclick(edit, th, blueArr = null, color = "blue", data = null, id,) {
   let arr_bl = Object.assign([], blueArr);
   edit.onclick = () => {
      let $el;
      if (Array.isArray(th)) {
         th.forEach(element => {
            if (element.checked) {
               $el = element.nextElementSibling.nextElementSibling;
               let id = element.nextElementSibling.nextElementSibling.dataset.name.split('.').at(2);
               blueArr = arr_bl.find(i => i.id === id).blueEffects || [];
            }
         });
      } else
         $el = th;
      let arrBlueText;
      if ($el?.dataset?.create_lesson === 'true') {
         arrBlueText = JSON.parse(localStorage.getItem('lesson_create')) || [];
      } else {
         arrBlueText = JSON.parse(localStorage.getItem(`${$el.dataset.itemid}`)) || blueArr || [];
      }

      let innerSpan = Array.from($el.querySelectorAll('span')),
         arrText = $el.innerText.split(' '),
         div = document.createElement('div');
      innerSpan = innerSpan.filter(sp => sp.innerText);
      div.classList.add('temporary-choice-span-box');
      $el.innerHTML = ' ';
      let arr = [];
      for (let i of arrBlueText) {
         arr.push(i.toLocaleLowerCase());
      }
      arrBlueText = arr;
      for (let text of arrText) {
         let span_text = document.createElement('span');
         if (arrBlueText.includes(text.toLocaleLowerCase()) || innerSpan.includes(text.toLocaleLowerCase())) {
            span_text.classList.add('blue-text');
         }
         span_text.innerHTML = text;
         span_text.classList.add('temporary-choice-span')
         div.append(span_text);
      }
      $el.append(div);
      setTimeout(() => {
         for (let item of $('.temporary-choice-span')) {
            item.style.padding = '8px';
            if (item.classList.contains('blue-text')) {
               item.classList.add('temporary-choice-span-active');
               if (color === 'pink') {
                  item.style.border = '2px solid #e742a5';
               } else if (color === 'green') {
                  item.style.border = '2px solid #abe742';
               }
            }
         }
      }, 300)
      for (let item of $('.temporary-choice-span')) {
         item.onclick = () => {
            if (item.classList.contains('temporary-choice-span-active')) {
               item.classList.remove('temporary-choice-span-active', 'blue-text');
               item.style.border = '2px solid rgb(157, 157, 158)'
               arrBlueText = arrBlueText.filter(text => text !== item.innerText.toLocaleLowerCase());
            } else {
               item.classList.add('temporary-choice-span-active', 'blue-text');
               if (color === 'pink') {
                  item.style.border = '2px solid #e742a5';
               } else if (color === 'green') {
                  item.style.border = '2px solid #abe742';
               }
               if (!arrBlueText.includes(item.innerText)) {
                  arrBlueText.push(item.innerText.toLocaleLowerCase())
               }
            }
         }
      }
      document.onclick = (event) => {
         let spans = div.querySelectorAll('span');
         let click = event.composedPath().includes(div);
         let elClick = event.composedPath().includes($el);
         if (!click && edit.dataset.progres !== 'true' && !elClick && spans.length > 0) {
            edit.dataset.progres = 'true';
            let text = '';
            spans.forEach(span => {
               text += span.innerText + " ";
               span.remove();
            })
            div.remove();
            $el.innerText = text.trim().toLocaleLowerCase();
            let wrapperText = $el.innerText.toLocaleLowerCase().split(' ');
            for (let text of arrBlueText) {
               if ($el.innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                  let index = wrapperText.indexOf(text.toLocaleLowerCase());
                  if (index !== -1) {
                     wrapperText[index] = `<span class="blue-text">${text}</span>`;
                  }
               }
            }
            wrapperText = wrapperText.join(' ')
            $el.innerHTML = wrapperText;
            if ($el.dataset.create_lesson === 'true') {
               localStorage.setItem('lesson_create', JSON.stringify(arrBlueText));
            } else {
               if (data === null) {
                  request('/lessons/' + $el.dataset.itemid, 'patch', { blueEffects: arrBlueText });
               } else {
                  let obj_one = {};
                  request('/lessons/' + id, 'get')
                     .then(res => {
                        obj_one[data] = res[data];
                        if (Array.isArray(th)) {
                           obj_one[data].uls = arr_bl;
                           obj_one[data].uls.find(i => i.id === $el.dataset.name.split('.').at(2)).blueEffects = arrBlueText
                        }
                        else
                           obj_one[data].blueEffects = arrBlueText
                        request('/lessons/' + id, 'patch', obj_one)
                     })
               }
               localStorage.setItem(`${$el.dataset.itemid}`, JSON.stringify(arrBlueText))
            }
         } else {
            edit.dataset.progres = 'false'
         }
      }
      window.onunload = () => {
         localStorage.removeItem(`${$el.dataset.itemid}`);
      }
   }
}


//implement plugin
$('.text-content').editable($('#title-dblclick'))
let edit = document.getElementById('title-blue-edit');
let item = document.querySelector('.text-content');

blueclick(edit, item)

function reloadToEditbale(link, blueArr) {
   let l = $(`[data-link='${link}']`)
   l.editable($(`[data-id='${link}'] .black-pencil`));
   let tr = document.querySelector(`[data-id='${link}'] .trash`);
   let bl = document.querySelector(`[data-id='${link}'] .blue-pencil`);
   if (tr) {
      tr.onclick = () => {
         l[0].innerText = ' '
      }
   }
   if (bl) {
      blueclick(bl, l[0], blueArr)
   }
}
function startReloadToEditbale(blueArr) {
   let id = document.querySelectorAll('[data-id]');
   id.forEach(el => {
      if (el.dataset.active !== 'true') {
         reloadToEditbale(el.dataset.id, blueArr);
         el.dataset.active = 'true';
      }
   })
}

function reloadImg(top_img, edit, i) {
   let input = document.getElementById('file_input');
   let [span_one, span_two] = edit.querySelectorAll('span');
   if (top_img.src === ' ') {
      top_img.style.display = 'none';
      span_one.className = 'edit__add';
   }

   span_one.onclick = () => {
      input.click();
      input.onchange = () => {
         let f = input.files[0];
         if (f) {
            upload_img(f, top_img, i.id);
            if (span_one.classList.contains('edit__add')) {
               span_one.className = 'black-pencil'
               top_img.style.display = 'block'
            }
         }
      }
   }
   span_two.onclick = () => {
      top_img.src = ' ';
      span_one.className = 'edit__add';
      i.img = null;
      request('/lessons/' + i.id, 'patch', i).then(() => { top_img.style.display = 'none' });
   }
}
function makeid(length) {
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   let counter = 0;
   while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
   }
   return result;
}
export function uuidv4() {
   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
   );
}
export function reload_uls(place, arr, data) {
   place.innerHTML = '';
   let name = makeid(7);
   for (let item of arr) {
      let id = uuidv4() + '_' + uuidv4();
      let li = document.createElement('li');
      let input = document.createElement('input');
      let label = document.createElement('label');
      let p = document.createElement('p');
      let spn = document.createElement('span');
      //inner
      input.type = 'radio';
      input.name = name;
      input.id = id;
      label.setAttribute('for', id)
      li.dataset.elId = item.id;
      p.dataset.name = `${data}.uls.${item.id}`
      p.innerHTML = item.title;
      //append 
      label.appendChild(spn);
      li.append(input, label, p);
      place.append(li);
      let arrBlueText = item.blueEffects || [];
      let wrapperText = p.innerText.toLocaleLowerCase().split(' ');
      for (let text of arrBlueText) {
         if (p.innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
            let index = wrapperText.indexOf(text.toLocaleLowerCase());
            if (index !== -1) {
               wrapperText[index] = `<span class="blue-text">${text}</span>`;
            }
         }
      }
      wrapperText = wrapperText.join(' ')
      console.log(wrapperText);

      p.innerHTML = wrapperText;
   }
}