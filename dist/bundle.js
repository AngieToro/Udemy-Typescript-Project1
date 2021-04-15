!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class r{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function s(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}function i(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLength),null!=e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),null!=e.minNumber&&"number"==typeof e.value&&(t=t&&e.value>=e.minNumber),null!=e.maxNumber&&"number"==typeof e.value&&(t=t&&e.value<=e.maxNumber),t}var o;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(o||(o={}));class l{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class a extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new a),this.instance}addProject(e,t,n){const r=Math.random.toString(),s=new l(r,e,t,n,o.Active);this.projects.push(s),this.updateListerners()}moveProjectAndChangeState(e,t){const n=this.projects.find(t=>t.id===e);n&&n.status!==t&&(n.status=t,this.updateListerners())}updateListerners(){for(const e of this.listeners)e(this.projects.slice())}}const c=a.getInstance();var u=function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};class d extends r{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}collectUserInput(){const e=this.titleInputElement.value,t=this.descriptionInputElement.value,n=this.peopleInputElement.value,r={value:t,required:!0,minLength:5},s={value:+n,required:!0,minNumber:1,maxNumber:5};return i({value:e,required:!0})&&i(r)&&i(s)?[e,t,+n]:void alert("Invalid input. Try again")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.collectUserInput();if(Array.isArray(t)){const[e,n,r]=t;console.log("title= "+e),console.log("Description= "+n),console.log("People= ",r),c.addProject(e,n,r),this.clearInputs()}}}u([s],d.prototype,"submitHandler",null);var p=function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};class h extends r{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get persons(){return 1===this.project.people?"1 person":this.project.people+"  persons"}dragStartHandler(e){console.log("DragStart"),console.log(e),e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("DragEnd")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons+" assigned",this.element.querySelector("p").textContent=this.project.description}}p([s],h.prototype,"dragStartHandler",null);var f=function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};class m extends r{constructor(e){super("project-list","app",!1,e+"-projects"),this.typeProyect=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){if(e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]){e.preventDefault();this.element.querySelector("ul").classList.add("droppable")}}dropHandler(e){const t=e.dataTransfer.getData("text/plain");c.moveProjectAndChangeState(t,"active"===this.typeProyect?o.Active:o.Finished)}dragLeaveHander(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHander),this.element.addEventListener("drop",this.dropHandler),c.addListener(e=>{const t=e.filter(e=>"active"===this.typeProyect?e.status===o.Active:e.status===o.Finished);this.assignedProjects=t,this.renderProjects()})}renderContent(){const e=this.typeProyect+"-projects-list";this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.typeProyect.toUpperCase()+" PROJECTS"}renderProjects(){document.getElementById(this.typeProyect+"-projects-list").innerHTML="";for(const e of this.assignedProjects)new h(this.element.querySelector("ul").id,e)}}f([s],m.prototype,"dragOverHandler",null),f([s],m.prototype,"dropHandler",null),f([s],m.prototype,"dragLeaveHander",null),console.log("Hello"),new d,new m("active"),new m("finished")}]);