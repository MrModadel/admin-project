import { useHttp } from "../../modules/http.requests";
import { blueclick, reload_uls, uuidv4 } from "../../modules/ui";
import { upload_img } from "../../modules/upload";
let doc = document;

let lc = location.search.replace('?', '');
let add_img_input = document.getElementById('add_img_input');
let { request } = useHttp()
$.fn.extend({
   editable: function (edit, b, type = 'text', detal = 'options', data = 'edit_type', width = null, isElements = false) {
      $(this).each(async function () {
         let price = false;
         if (type === 'price') {
            type = 'text';
            price = true;
         }
         let inter = null;
         let w = 555
         if (width !== null) {
            w = width
         }
         var $el = $(this),
            fontSize = $el.css('font-size'),
            textTans = $el.css('text-transform'),
            arrBlueText,
            $edittextbox = $(`<input type="${type}" class="temporary-input"></input>`).css('max-width', w).css('width', '100%').css('min-height', $el.height()).css('font-size', fontSize).css('text-transform', textTans),
            submitChanges = function () {
               if ($edittextbox.val() !== '') {
                  $el.html($edittextbox.val().trim());
                  let att = {};
                  let item_type = $el[0].dataset[data];
                  let sp_item = item_type.split('.');
                  if (!item_type.includes('.')) {
                     att[item_type] = $edittextbox.val().trim().replaceAll(' ', ' ');
                     request('/lessons/' + b, 'patch', att)
                        .then(() => {
                           if ($el[0].className === 'inputs__output') {
                              update_variats(b);
                           }
                        })
                  } else
                     request('/lessons/' + b, 'get')
                        .then(res => {
                           att[sp_item.at(0)] = res[detal];
                           if (isElements)
                              att[sp_item.at(0)][sp_item.at(1)][sp_item.at(2)].title = $edittextbox.val().trim().replaceAll(' ', ' ');
                           else
                              att[sp_item.at(0)][sp_item.at(1)] = $edittextbox.val().trim().replaceAll(' ', ' ');

                           console.log(att)
                           request('/lessons/' + b, 'patch', att)
                              .then(() => {
                                 if ($el[0].className === 'inputs__output') {
                                    update_variats(b);
                                 }
                              })
                        })
                  //blue effect
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
                  } else if (item_type === "name") {
                     request('/lessons/' + b, 'get')
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
                  } else if (item_type === "before.title") {
                     request('/lessons/' + b, 'get')
                        .then(res => arrBlueText = res.before.title_effect || [])
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
                  } else if (sp_item.at(-1) === "name") {
                     request('/lessons/' + b, 'get')
                        .then(res => arrBlueText = res.before.blueEffects || [])
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
                  } else if (sp_item.at(1) === 'uls') {
                     request('/lessons/' + b, 'get')
                        .then(res => arrBlueText = res[sp_item.at(0)].uls[sp_item.at(-1)].blueEffects || [])
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
                  if (inter !== null) clearInterval(inter);
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
            if (price) {
               inter = setInterval(() => {
                  doGetCaretPosition($edittextbox[0])
                  if (!$edittextbox[0].value.includes('₽')) {
                     $edittextbox[0].value = $edittextbox[0].value + '₽'
                  }
               }, 12)
               onload = function () {
                  var ele = $edittextbox[0];
                  ele.onkeypress = function (e) {
                     let v = this.value.slice(0, this.value.indexOf('₽'));
                     if (isNaN(+v.replaceAll(' ', '') + "" + String.fromCharCode(e.charCode)))
                        return false;
                  }
                  ele.onpaste = function (e) {
                     e.preventDefault();
                  }
               }
               onload();
            }
            if (isElements) {
               isElements.forEach(input => {
                  if (input.checked) {
                     $el = $(input.nextElementSibling.nextElementSibling)
                  }
               })
            }
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
let op_items = document.querySelectorAll('.options__menu-item');
let op_menu_items = document.querySelectorAll('[data-options_menu]');
op_items.forEach(item => {
   item.onclick = () => {
      op_items.forEach(el => el.classList.remove('options__menu-item--active'));
      item.classList.add('options__menu-item--active');
      op_menu_items.forEach(el => {
         if (item.dataset.type === el.dataset.options_menu) {
            op_menu_items.forEach(e => e.classList.remove('options__active'));
            el.classList.add('options__active');
         }
      })
   }
})
function doGetCaretPosition(oField) {
   let iCaretPos = 0;

   if (document.selection) {

      oField.focus();
      var oSel = document.selection.createRange();

      oSel.moveStart('character', -oField.value.length);

      iCaretPos = oSel.text.length;
   }

   // Firefox 
   else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd;
   oField.selectionEnd = oField.value.indexOf('₽'), oField.selectionStart = oField.value.indexOf('₽')

   // Return 
   return iCaretPos;
}

let obj,
   items = doc.querySelectorAll('[data-edit_type_or]'),
   edits = doc.querySelectorAll('[data-edit_type_link]'),
   add_img = doc.querySelector('[data-add_img]'),
   outputs = doc.querySelectorAll('.inputs__output'),
   values = doc.querySelectorAll('.value__item'),
   detals = doc.querySelectorAll('.detals__item'),
   value_add = doc.querySelector('.value__add-img'),
   value__img = doc.querySelector('.value__img'),
   skills_items = doc.querySelectorAll('.skills__item'),
   before_edit = doc.querySelector('.before-after__edit'),
   after_edit = doc.querySelector('.after__edit'),
   header_box_bef = doc.querySelector('.header__edit-befor'),
   header__title_before = doc.querySelector('.header__title-before'),
   header__title_after = doc.querySelector('.header__title-after'),
   header__edit_after = doc.querySelector('.header__edit-after'),
   variats = doc.querySelectorAll('[data-variat]'),
   checkBoxs = doc.querySelectorAll('.before__ul input'),
   checkBoxs_ = doc.querySelectorAll('.after__ul input'),
   uls_edit = doc.querySelector('.uls-edit'),
   uls_edit_one = doc.querySelector('.uls-edit_one'),
   description__edit = doc.querySelector('.description__edit'),
   des_uls = doc.querySelectorAll('.description__ul input');
   function randomSet(arr) {
      arr.forEach(el => {
         el.nextElementSibling.nextElementSibling.dataset.itemid = Math.random();
      })
   }
const map = {
   "full": "Полное",
   'basic': "Базовый",
   'partial': "Частичный",
   true: 'Да',
   false: 'Нет'
};

function update_variats(id) {
   request('/lessons/' + id, 'get')
      .then(res => {
         let { options } = res;
         variats.forEach(variat => {
            let value = options[variat.dataset.variat]
            let span = variat.querySelector('span');
            if (variat.dataset.variat === 'price' || variat.dataset.variat === 'practical') {
               span.innerHTML = value;
            } else {
               span.innerHTML = map[value];
            }
         })
      })
}
(async function () {
   if (lc === 'create') {
      let i = JSON.parse(localStorage.getItem('create_lessons_save'))
      let d;
      if (i.blueEffects.length <= 0) {
         d = "nullBlueArr"
      } else {
         d = i.blueEffects
      }
      let obj_main = {
         name: i.name,
         blueEffects: d,
         img: i.img,
         description: "Lorem ipsut rfr ltkf",
         id: uuidv4(),
         "options": {
            "practical": "50",
            "cases": true,
            "portfolio": true,
            "certificate": true,
            "topic": "basic",
            "price": "2000₽",
            "exams": "5",
            "questions": "100"
         },
         "detals": {
            "one": "100 вопросов",
            "two": "50 практических кейсов",
            "tre": "5 экзаменов — итоговых работ"
         },
         "values": {
            "first": "ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ",
            "secon": "ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ",
            "thind": "ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ ЦЕННОСТЬ ТЕКСТ",
            "fourt": "Ценность текст Ценность текст Ценность текст Ценность текст Ценность текст Ценность текст",
            "fifth": "Ценность текст Ценность текст Ценность текст Ценность текст Ценность текст Ценность текст"
         },
         "skills": {
            "first": "СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ СКИЛЛЫ",
            "secon": "Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы",
            "thind": "Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы",
            "fourt": "Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы",
            "fifth": "Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы",
            "sixth": "Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы Скиллы"
         },
         "before": {
            "title": "До симулятора",
            "title_effect": [
               "До"
            ],
            "name": "нет достаточных знаний о продуктовом менеджменте и способах                                 анализа рынка",
            "blueEffects": [
               "знаний",
               "нет"
            ],
            "uls": [
               {
                  "id": uuidv4(),
                  "title": "Студенты не имели достаточных знаний о продуктовом менеджменте и анализе рынка",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было практических занятий, которые могли бы помочь студентам научиться разрабатывать продукт и продвигать его на рынке               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было возможности практически применять полученные знания и навыки               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было возможности научиться проводить SWOT-анализ и анализ рисков               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было возможности научиться проводить исследования пользователей, опросы и интервью               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было достаточной информации о конкурентах на рынке и способах конкуренции               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было знаний об оценке и анализе целевой аудитории и сегментации рынка               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было достаточно практического опыта в области продуктового менеджмента               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было подготовки студентов к работе в сфере продуктового менеджмента               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было возможности принимать обоснованные решения на основе анализа рынка               ",
                  "blueEffects": []
               }
            ]
         },
         "after": {
            "title": "после симулятора",
            "title_effect": [
               "после"
            ],
            "name": "практические знания и умения, необходимые для успешной работы в области продуктового менеджмента и анализа рынка",
            "blueEffects": [
               "практические",
               "знания"
            ],

            "uls": [
               {
                  "id": uuidv4(),
                  "title": "Не было возможности научиться проводить исследования пользователей, опросы и интервью               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было достаточной информации о конкурентах на рынке и способах конкуренции               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),
                  "title": "Не было знаний об оценке и анализе целевой аудитории и сегментации рынка               ",
                  "blueEffects": []
               }
            ]
         },
         "aboutUs": {
            "uls": [

               {
                  "id": uuidv4(),

                  "title": "Не было возможности практически применять полученные знания и навыки               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),

                  "title": "Не было возможности научиться проводить SWOT-анализ и анализ рисков               ",
                  "blueEffects": []
               },
               {
                  "id": uuidv4(),

                  "title": "Не было возможности научиться проводить исследования пользователей, опросы и интервью               ",
                  "blueEffects": []
               }
            ]
         },
         btn_1: "текст_кнопки_1",
         btn_2: "текст_кнопки_2"
      };
      await request('/lessons/' + obj_main.id, 'post', obj_main)
         .then(res => {
            obj = res;
            localStorage.removeItem('create_lessons_save');
            let l = location.href.split('?').at(0) + '?itemid=' + res.id;
            location.assign(l)
         })
   } else {
      let id = lc.split('=').at(-1);
      await request('/lessons/' + id, 'get').then(res => obj = res);
   }
   if (obj.blueEffects === undefined) obj.blueEffects = [];
})()
   .then(() => {
      reloadUpdaty(items, edits, obj.id)
      function reloadUpdaty(items, edits, b) {
         for (let item of items) {
            if (obj[item.dataset.edit_type_or] && item.dataset.edit_type_or !== 'img') {
               item.innerHTML = obj[item.dataset.edit_type_or];
               if (item.dataset.edit_type_or === 'name') {
                  let wrapperText = item.innerText.toLocaleLowerCase().split(' ');
                  for (let text of obj.blueEffects) {
                     if (item.innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                        let index = wrapperText.indexOf(text.toLocaleLowerCase());
                        if (index !== -1) {
                           wrapperText[index] = `<span class="blue-text">${text}</span>`;
                        }
                     }
                  }
                  wrapperText = wrapperText.join(' ')
                  item.innerHTML = wrapperText;
               }
            }
            for (let edit of edits) {
               if (item.dataset.edit_type_or === edit.dataset.edit_type_link) {
                  if (item.dataset.edit_type_or === 'name') {
                     item.dataset.itemid = obj.id;
                     blueclick(edit.querySelector('.blue-pencil'), item, obj.blueEffects)
                  }
                  let span = edit.querySelector('.black-pencil');
                  let tr = edit.querySelector('.trash');
                  if (item.dataset.edit_type_or === 'img') {
                     tr.onclick = () => {
                        item.src = '';
                        add_img.style.display = 'block';
                        item.style.display = 'none';
                        edit.style.display = 'none';
                        obj.img = null;
                        request('/lessons/' + obj.id, 'patch', obj);
                     }
                     span.onclick = () => {
                        add_img_input.click();
                        add_img_input.onchange = () => {
                           upload_img(add_img_input.files[0], item, obj.id)
                        }
                     }
                     add_img.onclick = () => {
                        add_img_input.click();
                        add_img_input.onchange = () => {
                           upload_img(add_img_input.files[0], item, obj.id)
                              .finally(() => {
                                 add_img.style.display = 'none';
                                 edit.style.display = 'flex';
                              })
                        }
                     }
                     if (obj.img !== undefined) {
                        item.src = obj.img;
                        add_img.style.display = 'none';
                     } else {
                        item.style.display = 'none';
                        edit.style.display = 'none';
                     }
                  } else {
                     if (item.dataset.edit_type_or !== 'img') {
                        $(item).editable($(span), b, 'text ', 'options', 'edit_type_or');
                     }
                     if (tr) {
                        tr.onclick = () => {
                           item.innerText = ' ';
                           span.click();
                        }
                     }
                  }
               }
            }
         }
      }
      request('/lessons/' + obj.id, 'get')
         .then(res => {
            let options = res.options;
            outputs.forEach(output => {
               let att = output.dataset.edit_type.split('.').at(-1);
               let value = options[att];
               let type = output.getAttribute('type');
               if (type === 'bulean') {
                  output.onclick = () => {
                     let st = true;
                     if (output.getAttribute("data-status_active") === 'true') {
                        output.removeAttribute("data-status_active")
                        output.innerHTML = 'Нет';
                        st = false;
                     } else {
                        output.setAttribute("data-status_active", 'true')
                        output.innerHTML = 'Да';
                        st = true;
                     }
                     let obj_one = {}
                     request('/lessons/' + obj.id, 'get')
                        .then(res => {
                           obj_one[output.dataset.edit_type.split('.').at(0)] = res.options;
                           obj_one[output.dataset.edit_type.split('.').at(0)][output.dataset.edit_type.split('.').at(1)] = st;
                           request('/lessons/' + obj.id, 'patch', obj_one).then(() => {
                              update_variats(obj.id);
                           })
                        })
                  }
               } else if (type === 'number') {
                  $(output).editable($(output), obj.id, 'number');
               } else if (type === 'price') {
                  $(output).editable($(output), obj.id, 'price');
               } else {
                  output.onclick = () => {
                     let st = output.dataset.status;
                     let inner = ' ';
                     if (st === 'full') {
                        st = 'partial';
                        inner = "Частичный";
                     } else if (st === 'partial') {
                        st = 'basic';
                        inner = "Базовый";
                     } else if (st === 'basic') {
                        st = 'full';
                        inner = "Полное";
                     }
                     output.dataset.status = st;
                     output.innerHTML = inner;
                     let obj_one = {}
                     obj_one[output.dataset.edit_type.split('.').at(0)] = obj.options;
                     obj_one[output.dataset.edit_type.split('.').at(0)][output.dataset.edit_type.split('.').at(1)] = st;
                     request('/lessons/' + obj.id, 'patch', obj_one).then(() => {
                        update_variats(obj.id);
                     })
                  }
               }

               if (type === 'bulean') {
                  if (value) {
                     output.setAttribute("data-status_active", 'true')
                     output.innerHTML = 'Да'
                  } else {
                     output.removeAttribute("data-status_active")
                     output.innerHTML = 'Нет'
                  }
               } else if (type === 'number') {
                  output.innerHTML = value;
               } else if (type === 'price') {
                  output.innerHTML = value;
               } else {
                  output.dataset.status = value;
                  output.innerHTML = map[value];
               }
            })
            detals.forEach(detal => {
               let text = detal.querySelector('.detals__text');
               text.innerHTML = obj.detals[detal.dataset.count]
            })
            values.forEach(el => {
               let p = el.querySelector('p');
               let v = el.dataset.num_value.split('.').at(-1)
               p.innerText = obj.values[v]
            })
            skills_items.forEach(elem => {
               let p = elem.querySelector('p');
               let v = elem.dataset.num_skill.split('.').at(-1)
               p.innerText = obj.skills[v]
            })
         })
      detals.forEach(async detal => {
         let edit = detal.querySelector('.black-pencil');
         let text = detal.querySelector('.detals__text');
         await $(text).editable($(edit), obj.id, 'text', 'detals');
         let tr = detal.querySelector('.trash');
         tr.onclick = () => {
            text.innerHTML = '';
            edit.click();
         }
      })
      values.forEach(async value => {
         let edit = value.querySelector('.black-pencil');
         let p = value.querySelector('p');
         let tr = value.querySelector('.trash');
         p.dataset.num_value = value.dataset.num_value;
         await $(p).editable($(edit), obj.id, 'text ', 'values', 'num_value', '346px');
         tr.onclick = () => {
            p.innerHTML = ' ';
            edit.click();
         }
      })
      skills_items.forEach(async item => {
         let edit = item.querySelector('.black-pencil');
         let p = item.querySelector('p');
         let tr = item.querySelector('.trash');
         p.dataset.num_skill = item.dataset.num_skill;
         await $(p).editable($(edit), obj.id, 'text', 'skills', 'num_skill', '735px');
         tr.onclick = () => {
            p.innerHTML = ' ';
            edit.click();
         }
      })
      async function reload_editable(tag, edit_box, id, data, width, eff, beforearr, color, tag2 = null) {
         let edit = edit_box.querySelector('.black-pencil');
         let t = edit_box.querySelector('.trash');
         await $(tag).editable($(edit), id, "text", data, data, width)
         if (t) {
            t.onclick = () => {
               $(tag)[0].innerHTML = ' ';
               edit.click();
            }
         }
         if (tag2 !== null) {
            let spn = edit_box.querySelector(tag2)
            if (spn) {
               tag.dataset.itemid = Math.random();
               blueclick(spn, tag, obj[beforearr].blueEffects, color, beforearr, id);
            }
         };
         if (eff === 'title_effect') {
            $(tag)[0].innerText = obj[beforearr].title;
         } else {
            $(tag)[0].innerText = obj[beforearr].name;
         }
         let wrapperText = $(tag)[0].innerText.toLocaleLowerCase().split(' ');
         for (let text of obj[beforearr][eff]) {
            if ($(tag)[0].innerText.toLowerCase().includes(text.toLowerCase())) {
               let index = wrapperText.indexOf(text.toLocaleLowerCase());
               if (index !== -1) {
                  wrapperText[index] = `<span class="blue-text">${text}</span>`;
               }
            }
         }
         wrapperText = wrapperText.join(' ')
         $(tag)[0].innerHTML = wrapperText;
      }
      update_variats(obj.id)
      value_add.onclick = () => {
         add_img_input.click();
         add_img_input.onchange = () => {
            upload_img(add_img_input.files[0], value__img, obj.id, false, true);
         }
      }
      if (obj.values.img !== undefined)
         value__img.src = obj.values.img;
      reload_editable('.before__title', before_edit, obj.id, 'before', "384px", 'title_effect', 'before', 'pink');
      reload_editable(header__title_before, header_box_bef, obj.id, 'before', "584px", 'blueEffects', 'before', 'pink', '.pink-pencil');
      reload_editable('.after__title', after_edit, obj.id, 'after', "384px", 'title_effect', 'after', 'green');
      reload_editable(header__title_after, header__edit_after, obj.id, 'after', "584px", 'blueEffects', 'after', 'green', '.green-pencil');

      reload_uls(checkBoxs[0].parentNode.parentNode, obj.before.uls , 'before');
      reload_uls(checkBoxs_[0].parentNode.parentNode, obj.after.uls, 'after');
      reload_uls(des_uls[0].parentNode.parentNode, obj.aboutUs.uls , 'aboutUs');

      let all = doc.querySelectorAll('input[type="radio"]');
      all.forEach(el => {
         let item = el.nextElementSibling.childNodes[0];
         let div = doc.createElement('div');
         div.classList.add('inner-circ');
         item.append(div);
      })
      checkBoxs = doc.querySelectorAll('.before__ul input')
      checkBoxs_ = doc.querySelectorAll('.after__ul input')
      des_uls = doc.querySelectorAll('.description__ul input');

      checkBoxs[0].checked = true;
      checkBoxs_[0].checked = true;
      des_uls[0].checked = true;
      console.log(des_uls[0].nextElementSibling);

      checkBoxs[0].nextElementSibling.childNodes[0].childNodes[0].style.opacity = '1'
      checkBoxs_[0].nextElementSibling.childNodes[0].childNodes[0].style.opacity = '1'
      des_uls[0].nextElementSibling.childNodes[0].childNodes[0].style.opacity = '1'
      randomSet(checkBoxs);
      randomSet(checkBoxs_);
      randomSet(des_uls);
      let [span_edit, span_effect] = uls_edit.querySelectorAll('span');
      let [span_edit_one, span_effect_one] = uls_edit_one.querySelectorAll('span');
      let [span_des, spn_des_two] = description__edit.querySelectorAll('span');
      blueclick(span_effect_one, Array.from(checkBoxs_), obj.after.uls, 'green', 'after', obj.id)
      $(checkBoxs_[0].nextElementSibling.nextElementSibling).editable($(span_edit_one), obj.id, 'text', 'after', 'name', null, checkBoxs_)
      blueclick(span_effect, Array.from(checkBoxs), obj.before.uls, 'pink', 'before', obj.id)
      $(checkBoxs[0].nextElementSibling.nextElementSibling).editable($(span_edit), obj.id, 'text', 'before', 'name', null, checkBoxs)
      blueclick(spn_des_two, Array.from(des_uls), obj.aboutUs.uls, 'green', 'aboutUs', obj.id)
      $(des_uls[0].nextElementSibling.nextElementSibling).editable($(span_des), obj.id, 'text', 'aboutUs', 'name', null, des_uls)
      function inputsWorm(arr, input) {
         arr.forEach(el => {
            el.onclick = () => {
               let item = el.nextElementSibling.childNodes[0].childNodes[0];
               console.log(item);
               arr.forEach(i => i.nextElementSibling.childNodes[0].childNodes[0].style.opacity = '0');
               setTimeout(() => {
                  item.style.opacity = '1'
                  input.dataset.progres = 'true';
               }, 4);
            }
         })
      }
      inputsWorm(checkBoxs, span_effect);
      inputsWorm(checkBoxs_, span_effect_one);
      inputsWorm(des_uls, spn_des_two);
   })
