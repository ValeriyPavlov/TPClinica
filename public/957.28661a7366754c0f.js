"use strict";(self.webpackChunkTPClinica=self.webpackChunkTPClinica||[]).push([[957],{9897:(x,S,s)=>{s.d(S,{Jc:()=>p,Pf:()=>u,n7:()=>v});class u{constructor(){this.duration=0}}var v=function(r){return r.Lunes="lunes",r.Martes="martes",r.Miercoles="mi\xe9rcoles",r.Jueves="jueves",r.Viernes="viernes",r.Sabado="s\xe1bado",r.Domingo="domingo",r}(v||{});class p{constructor(m){this.dayOfWeek=m?.dayOfWeek,this.date=m?.date,this.timeStart=m?.timeStart,this.timeEnd=m?.timeEnd}}},4957:(x,S,s)=>{s.r(S),s.d(S,{MyProfileModule:()=>H});var u=s(6814),v=s(6024),p=s(5861),r=s(6825),m=s(8642),h=s(9897),e=s(9468),Z=s(9547),f=s(5710),a=s(6084),c=s(95),_=s(3251);function y(i,d){if(1&i){const t=e.EpF();e.TgZ(0,"div",26)(1,"label",27),e._uU(2),e.qZA(),e.TgZ(3,"input",28),e.NdJ("change",function(n){e.CHM(t);const l=e.oxw();return e.KtG(l.selectDay(n))}),e.qZA()()}if(2&i){const t=d.$implicit;e.xp6(1),e.s9C("for",t),e.xp6(1),e.Oqu(t),e.xp6(1),e.s9C("id",t),e.s9C("value",t)}}function b(i,d){if(1&i&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&i){const t=d.$implicit;e.xp6(1),e.Oqu(t)}}function w(i,d){if(1&i&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&i){const t=d.$implicit;e.xp6(1),e.Oqu(t)}}let T=(()=>{class i{constructor(t,o,n){this.formBuilder=t,this.uService=o,this.aService=n,this.eventShowSchedule=new e.vpe,this.selectedDays=[],this.showSchedule=!1,this.schedule=new h.Pf,this.possibleDaysOfWeek=[h.n7.Lunes,h.n7.Martes,h.n7.Miercoles,h.n7.Jueves,h.n7.Viernes,h.n7.Sabado],this.possibleTimes=[8,9,10,11,12,13,14,15,16,17,18,19],this.formSchedule=this.formBuilder.group({days:["",c.kI.required],timeStart:["",c.kI.required],timeEnd:["",c.kI.required],duration:["",c.kI.required]})}return(){this.showSchedule=!this.showSchedule,this.eventShowSchedule.emit(this.showSchedule)}selectDay(t){const o=t.target;if(o.checked)this.selectedDays.push(o.value);else{const n=this.selectedDays.findIndex(l=>l===o.value);n>-1&&this.selectedDays.splice(n,1)}0===this.selectedDays.length&&this.formSchedule.controls.days.reset()}register(){var t=this;return(0,p.Z)(function*(){if(t.formSchedule.valid)try{t.timeValidator();const o=t.uService.userLogged;t.createSchedule(o.speciality),o.speciality.schedule=t.schedule,yield t.uService.saveUserWithIdInStore(o.userId,o),yield t.aService.showAlert({icon:"success",message:"Horarios cargados exitosamente.",timer:2e3}),t.selectedDays=[],t.formSchedule.reset({timeStart:"Elija una opcion",timeEnd:"Elija una opcion"})}catch(o){yield t.aService.showAlert({icon:"error",message:o.message,timer:2e3})}else yield t.aService.showAlert({icon:"error",message:"Complete todos los campos!",timer:2e3})})()}timeValidator(){if(parseInt(this.formSchedule.value.timeStart)>=parseInt(this.formSchedule.value.timeEnd))throw new Error("El horario de inicio no puede ser mayor o igual que el de finalizacion.");if(this.selectedDays.includes(h.n7.Sabado)&&parseInt(this.formSchedule.value.timeEnd)>14)throw new Error("El horario laboral para los dias sabados es hasta las 14 hs.")}createSchedule(t){let o=[];null!=t.schedule.days&&t.schedule.days.forEach(n=>{o.push(n)}),this.selectedDays.forEach(n=>{let l=o?.find(g=>g.dayOfWeek===n);if(null!=l)l.timeStart=this.formSchedule.value.timeStart,l.timeEnd=this.formSchedule.value.timeEnd;else{let g=new h.Jc;g.dayOfWeek=n,g.timeStart=this.formSchedule.value.timeStart,g.timeEnd=this.formSchedule.value.timeEnd,o.push(g)}}),this.schedule.days=o,this.schedule.duration=parseFloat(this.formSchedule.value.duration)}resetSchedule(){var t=this;return(0,p.Z)(function*(){let o=new h.Pf;const n=t.uService.userLogged;yield t.aService.showAlert({icon:"warning",message:"Esta seguro que desea reestablecer su disponibilidad? Cancelara todos sus turnos.",showCancelButton:!0,showConfirmButton:!0}).then(function(){var l=(0,p.Z)(function*(g){g.isConfirmed&&(n.speciality.schedule=o,yield t.uService.saveUserWithIdInStore(n.userId,n),yield t.aService.showAlert({icon:"success",message:"Horarios reestablecidos exitosamente.",timer:2e3}))});return function(g){return l.apply(this,arguments)}}())})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(c.qu),e.Y36(Z.K),e.Y36(_.c))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-schedule"]],inputs:{showSchedule:"showSchedule"},outputs:{eventShowSchedule:"eventShowSchedule"},decls:46,vars:4,consts:[[1,"w-100","m-0","p-1","h-100","row","justify-content-center","align-items-center"],[1,"bg-light","shadow","p-1","rounded","col-lg-4","col-md-5","col-sm-8"],[1,"w-100","row","justify-content-center","justify-content-sm-start","p-2"],["title","Volver",1,"col-md-3","col-2","btn","btn-warning",3,"click"],[1,"fa-solid","fa-circle-arrow-left"],[1,"row","w-100","justify-content-center","align-items-center"],[1,"text-center"],["src","../../../../assets/img/icono.png","alt","register_paciente",1,"col-3","mt-1"],[1,"p-3",3,"formGroup","ngSubmit"],[1,"row","mt-4","g-3","justify-content-center"],[1,"col-12"],[1,"fw-bold"],["class","form-check form-switch",4,"ngFor","ngForOf"],[1,"row","mt-1","g-3","justify-content-center"],[1,"col-sm-6"],["for","horainicio",1,"form-label"],["formControlName","timeStart","id","horafin",1,"form-select"],["value","","disabled","","selected",""],[4,"ngFor","ngForOf"],["for","horafin",1,"form-label"],["formControlName","timeEnd","id","horafin",1,"form-select"],["formControlName","duration","id","duration",1,"form-select"],["value","0.5"],["value","1"],[1,"mt-3","w-100","btn","btn-lg","btn-outline-success","btn-block"],["type","button","value","Reestablecer disponibilidad",1,"mt-3","w-100","btn","btn-lg","btn-outline-danger","btn-block",3,"click"],[1,"form-check","form-switch"],[1,"form-check-label",3,"for"],["type","checkbox","formControlName","days",1,"form-check-input",3,"id","value","change"]],template:function(o,n){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"button",3),e.NdJ("click",function(){return n.return()}),e._UZ(4,"i",4),e.qZA()(),e.TgZ(5,"div",5)(6,"h2",6),e._uU(7,"Disponibilidad Horaria"),e.qZA(),e._UZ(8,"img",7),e.qZA(),e.TgZ(9,"form",8),e.NdJ("ngSubmit",function(){return n.register()}),e.TgZ(10,"div",9)(11,"div",10)(12,"p",11),e._uU(13,"Elija los dias disponibles:"),e.qZA(),e.YNc(14,y,4,4,"div",12),e.qZA()(),e.TgZ(15,"div",13)(16,"p",11),e._uU(17,"Elija el rango de horarios:"),e.qZA(),e.TgZ(18,"div",14)(19,"label",15),e._uU(20,"Hora de Inicio:"),e.qZA(),e.TgZ(21,"select",16)(22,"option",17),e._uU(23,"Elija una opcion"),e.qZA(),e.YNc(24,b,2,1,"option",18),e.qZA()(),e.TgZ(25,"div",14)(26,"label",19),e._uU(27,"Hora de Fin:"),e.qZA(),e.TgZ(28,"select",20)(29,"option",17),e._uU(30,"Elija una opcion"),e.qZA(),e.YNc(31,w,2,1,"option",18),e.qZA()()(),e.TgZ(32,"div",9)(33,"div",10)(34,"p",11),e._uU(35,"Elija la duracion de los turnos:"),e.qZA(),e.TgZ(36,"select",21)(37,"option",17),e._uU(38,"Elija una opcion"),e.qZA(),e.TgZ(39,"option",22),e._uU(40,"30 Minutos"),e.qZA(),e.TgZ(41,"option",23),e._uU(42,"60 Minutos"),e.qZA()()()(),e.TgZ(43,"button",24),e._uU(44,"Registrar disponibilidad"),e.qZA(),e.TgZ(45,"input",25),e.NdJ("click",function(){return n.resetSchedule()}),e.qZA()()()()),2&o&&(e.xp6(9),e.Q6J("formGroup",n.formSchedule),e.xp6(5),e.Q6J("ngForOf",n.possibleDaysOfWeek),e.xp6(10),e.Q6J("ngForOf",n.possibleTimes),e.xp6(7),e.Q6J("ngForOf",n.possibleTimes))},dependencies:[u.sg,c._Y,c.YN,c.Kr,c.Wl,c.EJ,c.JJ,c.JL,c.sg,c.u]})}return i})();var C=s(4212),P=s(3175),A=s(4553);function E(i,d){if(1&i&&e._UZ(0,"img",19),2&i){const t=e.oxw(3);e.s9C("src",t.uService.patientPhotoTwo,e.LSH)}}function M(i,d){if(1&i&&(e.TgZ(0,"h5",22),e._uU(1),e.ALo(2,"keysToSpanish"),e.ALo(3,"booleans"),e.ALo(4,"speciality"),e.qZA()),2&i){const t=e.oxw().$implicit;e.xp6(1),e.AsE(" ",e.lcZ(2,2,t.key),": ",e.lcZ(3,4,e.lcZ(4,6,t.value))," ")}}function U(i,d){if(1&i&&(e.TgZ(0,"div",20),e.YNc(1,M,5,8,"h5",21),e.qZA()),2&i){const t=d.$implicit;e.xp6(1),e.Q6J("ngIf",!t.key.startsWith("profilePhoto")&&"name"!=t.key&&"lastName"!=t.key&&"userRole"!=t.key)}}function I(i,d){if(1&i&&(e.TgZ(0,"h5"),e._uU(1),e.qZA()),2&i){const t=d.$implicit;e.xp6(1),e.lnq(" ",t.dayOfWeek,": ",t.timeStart," a ",t.timeEnd," hs ")}}function J(i,d){if(1&i&&(e.TgZ(0,"div",23)(1,"h5",24),e._uU(2,"Horarios:"),e.qZA(),e.TgZ(3,"div",25),e.YNc(4,I,2,3,"h5",26),e.qZA()()),2&i){const t=e.oxw(3);e.xp6(4),e.Q6J("ngForOf",t.schedule.days)}}function O(i,d){if(1&i&&(e.TgZ(0,"div",12)(1,"div",13),e._UZ(2,"img",14),e.YNc(3,E,1,1,"img",15),e.TgZ(4,"div",16)(5,"h3"),e._uU(6),e.qZA(),e.TgZ(7,"h4"),e._uU(8),e.ALo(9,"uppercase"),e.qZA()()(),e.YNc(10,U,2,1,"div",17),e.ALo(11,"keyvalue"),e.YNc(12,J,5,1,"div",18),e.qZA()),2&i){const t=e.oxw(2);e.xp6(2),e.s9C("src",t.uService.userLogged.profilePhoto,e.LSH),e.xp6(1),e.Q6J("ngIf","paciente"==t.uService.userLogged.userRole),e.xp6(3),e.AsE(" ",t.uService.userLogged.lastName,", ",t.uService.userLogged.name," "),e.xp6(2),e.hij(" (",e.lcZ(9,7,t.uService.userLogged.userRole),") "),e.xp6(2),e.Q6J("ngForOf",e.lcZ(11,9,t.uService.userLogged)),e.xp6(2),e.Q6J("ngIf","especialista"==t.uService.userLogged.userRole)}}function j(i,d){if(1&i){const t=e.EpF();e.TgZ(0,"div",27)(1,"button",28),e.NdJ("click",function(){e.CHM(t);const n=e.oxw(2);return e.KtG(n.getMedicalRecord())}),e._uU(2,"Historia Cl\xednica"),e.qZA()()}}function L(i,d){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"div",29)(2,"button",30),e.NdJ("click",function(){e.CHM(t);const n=e.oxw(2);return e.KtG(n.showFormSchedule())}),e._uU(3,"Establecer Disponibilidad Horaria"),e.qZA()(),e.TgZ(4,"div",1)(5,"app-schedule",31),e.NdJ("eventShowSchedule",function(n){e.CHM(t);const l=e.oxw(2);return e.KtG(l.handlerUpdateScheduleView(n))}),e.qZA()()()}if(2&i){const t=e.oxw(2);e.xp6(2),e.Q6J("hidden",t.showSchedule),e.xp6(2),e.Q6J("hidden",!t.showSchedule),e.xp6(1),e.Q6J("showSchedule",t.showSchedule)}}function N(i,d){if(1&i&&(e.TgZ(0,"section",6)(1,"article",7)(2,"div",8),e.YNc(3,O,13,11,"div",9),e.qZA(),e.YNc(4,j,3,0,"div",10),e.YNc(5,L,6,3,"div",11),e.qZA()()),2&i){const t=e.oxw();e.Q6J("@fadeIn",void 0),e.xp6(3),e.Q6J("ngIf",t.uService.userLogged),e.xp6(1),e.Q6J("ngIf","paciente"==(null==t.uService.userLogged?null:t.uService.userLogged.userRole)),e.xp6(1),e.Q6J("ngIf","especialista"==(null==t.uService.userLogged?null:t.uService.userLogged.userRole))}}const F=(0,r.eR)(":enter",[(0,r.oB)({opacity:0}),(0,r.jt)("1s ease-in",(0,r.oB)({opacity:1}))]),q=(0,r.eR)(":leave",[(0,r.oB)({opacity:1}),(0,r.jt)("500ms ease-out",(0,r.oB)({opacity:0}))]),D=(0,r.X$)("fadeIn",[F]),k=(0,r.X$)("fadeOut",[q]),Q=[{path:"",component:(()=>{class i{constructor(t,o,n){this.uService=t,this.aService=o,this.sService=n,this.schedule=new h.Pf,this.showSchedule=!1,this.hiddenProfile=!1,this.myAppointments=[],this.listOfSpecialities=[],this.setSpecialities(),this.selectedUser=this.uService.userLogged}ngOnInit(){this.uService.getPatientPhotoTwo(),"especialista"==this.uService.userLogged?.userRole&&(this.specialist=this.uService.userLogged,null!=this.specialist.speciality.schedule&&(this.schedule=this.specialist.speciality.schedule)),this.aService.getAppointments()}showFormSchedule(){this.showSchedule=!0}handlerUpdateScheduleView(t){this.showSchedule=t}getMedicalRecord(){this.hijoComponent.getMedicalRecord(this.selectedUser),this.hiddenProfile=!0}return(){this.hiddenProfile=!1}setSpecialities(){var t=this;return(0,p.Z)(function*(){t.listOfSpecialities=yield t.sService.getAllSpecialities()})()}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(Z.K),e.Y36(f.H),e.Y36(a.d))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-my-profile"]],viewQuery:function(o,n){if(1&o&&e.Gf(m.u,5),2&o){let l;e.iGM(l=e.CRH())&&(n.hijoComponent=l.first)}},decls:7,vars:3,consts:[["class","profile",4,"ngIf"],[3,"hidden"],[1,"d-flex","flex-row","align-items-center","justify-content-center","m-2","p-2"],["title","Volver",1,"col-sm-1","col-md-2","col-8","btn","btn-warning",3,"click"],[1,"fa-solid","fa-circle-arrow-left"],[3,"selectedUser"],[1,"profile"],[1,"row","justify-content-center","h-100","m-5","p-2","align-items-center"],[1,"bg-light","shadow","p-1","rounded","col-lg-5","col-md-6","col-sm-8","card","mb-3",2,"max-width","800px"],["class","col g-0 align-items-center bg-beige",4,"ngIf"],["class","d-flex justify-content-center",4,"ngIf"],[4,"ngIf"],[1,"col","g-0","align-items-center","bg-beige"],[1,"d-flex","flex-row","align-items-center","justify-content-center"],["alt","fotoPerfil",1,"img-fluid","rounded-start","m-1","p-1",2,"height","200px","width","200px",3,"src"],["alt","fotoPerfil2","class","img-fluid rounded-start m-1 p-1","style","height: 200px; width: 200px;",3,"src",4,"ngIf"],[1,"d-flex","align-items-center","justify-content-center","flex-column","m-2","p-1"],["class","d-flex flex-column justify-content-center align-items-center",4,"ngFor","ngForOf"],["class","d-flex flex-row justify-content-center align-items-center card bg-beige",4,"ngIf"],["alt","fotoPerfil2",1,"img-fluid","rounded-start","m-1","p-1",2,"height","200px","width","200px",3,"src"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],["class","m-1 p-1",4,"ngIf"],[1,"m-1","p-1"],[1,"d-flex","flex-row","justify-content-center","align-items-center","card","bg-beige"],[1,"m-4"],[1,"d-flex","flex-column","justify-content-center"],[4,"ngFor","ngForOf"],[1,"d-flex","justify-content-center"],[1,"btn","boton",2,"width","200px",3,"click"],[1,"d-flex","align-items-center","justify-content-center"],[1,"btn","btn-warning",3,"hidden","click"],[3,"showSchedule","eventShowSchedule"]],template:function(o,n){1&o&&(e.YNc(0,N,6,4,"section",0),e.TgZ(1,"div",1)(2,"div",2)(3,"button",3),e.NdJ("click",function(){return n.return()}),e._UZ(4,"i",4),e._uU(5,"Volver "),e.qZA()(),e._UZ(6,"app-history",5),e.qZA()),2&o&&(e.Q6J("ngIf",!n.hiddenProfile),e.xp6(1),e.Q6J("hidden",!n.hiddenProfile),e.xp6(5),e.Q6J("selectedUser",n.selectedUser))},dependencies:[u.sg,u.O5,m.u,T,u.gd,u.Nd,C.x,P.U,A.t],styles:[".bg-beige[_ngcontent-%COMP%]{background-color:beige}.boton[_ngcontent-%COMP%]{border:2px solid black;background-color:#0ff}.boton[_ngcontent-%COMP%]:hover{background-color:#4e4ef1;color:#fff}.texto-limitado[_ngcontent-%COMP%]{overflow:visible;white-space:pre-wrap;text-overflow:clip;width:400px}.titles[_ngcontent-%COMP%]{font-weight:700;text-decoration:underline}.padL[_ngcontent-%COMP%]{padding-left:10%}"],data:{animation:[D,k]}})}return i})()}];let R=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#i=this.\u0275inj=e.cJS({imports:[v.Bz.forChild(Q),v.Bz]})}return i})();var Y=s(103),B=s(6710);let H=(()=>{class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.oAB({type:i});static#i=this.\u0275inj=e.cJS({imports:[u.ez,c.UX,R,Y.D,B.H]})}return i})()},6084:(x,S,s)=>{s.d(S,{d:()=>h});var u=s(5861),v=s(4036),p=s(9468),r=s(3384),m=s(388);let h=(()=>{class e{constructor(f,a){this.firebaseStoreProvider=f,this.firebaseStorageProvider=a}getAllSpecialities(){var f=this;return(0,u.Z)(function*(){let a=yield(0,v.z)(f.firebaseStoreProvider.getCollection("specialities"));return a=yield Promise.all(a.map(function(){var c=(0,u.Z)(function*(_){return{..._,image:yield f.getSpecialityPhoto(_)}});return function(_){return c.apply(this,arguments)}}())),a})()}addSpeciality(f){var a=this;return(0,u.Z)(function*(){let c=!1;if((yield a.getAllSpecialities()).forEach(y=>{y.description==f.description&&(c=!0)}),!c){const y=a.firebaseStoreProvider.createDoc("specialities");return a.firebaseStoreProvider.saveDoc(y,JSON.parse(JSON.stringify(f)))}})()}getSpecialityPhoto(f){var a=this;return(0,u.Z)(function*(){try{const c=a.firebaseStorageProvider.referenceCloudStorage(f.image);return yield a.firebaseStorageProvider.getUrlFromFile(c)}catch{}})()}static#e=this.\u0275fac=function(a){return new(a||e)(p.LFG(r.f),p.LFG(m.O))};static#t=this.\u0275prov=p.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})()}}]);