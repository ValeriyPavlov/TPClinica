"use strict";(self.webpackChunkTPClinica=self.webpackChunkTPClinica||[]).push([[763],{8763:(y,u,r)=>{r.r(u),r.d(u,{LoginModule:()=>Z});var l=r(6814),a=r(6024),m=r(5861),s=r(95),e=r(9468),_=r(3251),h=r(9547),g=r(8672);function f(o,p){1&o&&(e.TgZ(0,"span",14),e._uU(1,"E-mail es requerido"),e.qZA())}function x(o,p){1&o&&(e.TgZ(0,"span",14),e._uU(1,"E-mail debe ser valido"),e.qZA())}function b(o,p){if(1&o){const n=e.EpF();e.TgZ(0,"div",28)(1,"button",29),e.NdJ("click",function(){const c=e.CHM(n).$implicit,d=e.oxw();return e.KtG(d.autolog(c))}),e.TgZ(2,"div",30),e._UZ(3,"img",31),e.TgZ(4,"div",28)(5,"div"),e._uU(6),e.qZA(),e.TgZ(7,"div"),e._uU(8),e.qZA()()()()()}if(2&o){const n=p.$implicit;e.xp6(3),e.s9C("src",n.profilePhoto,e.LSH),e.xp6(3),e.AsE("",n.lastName,", ",n.name,""),e.xp6(2),e.hij("(",n.userRole,")")}}const v=[{path:"",component:(()=>{class o{constructor(n,t,i,c,d){this.alertService=n,this.userService=t,this.router=i,this.formBuilder=c,this.sService=d,this.setUserForQuickAccess(),this.formLogin=this.formBuilder.group({email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required]]})}ngOnInit(){}loginWithMailAndPassword(){var n=this;return(0,m.Z)(function*(){try{n.sService.show();const t=yield n.userService.loginWithEmailAndPassword(n.formLogin.value.email,n.formLogin.value.password);n.sService.hide(),yield n.alertService.showAlert({icon:"success",message:`Bienvenido ${t?.name} ${t?.lastName}`,timer:2e3}),yield n.router.navigateByUrl("/bienvenida")}catch(t){yield n.userService.logout(),n.sService.hide(),yield n.alertService.showAlert({icon:"error",message:t.message,timer:2e3})}n.sService.hide(),n.formLogin.reset()})()}autolog(n){this.formLogin.setValue({email:n.email,password:n.password})}setUserForQuickAccess(){var n=this;return(0,m.Z)(function*(){yield n.userService.getUsersForQuickAccess()})()}static#e=this.\u0275fac=function(t){return new(t||o)(e.Y36(_.c),e.Y36(h.K),e.Y36(a.F0),e.Y36(s.qu),e.Y36(g.t2))};static#n=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-login"]],decls:34,vars:6,consts:[["type","ball-scale-multiple"],["src","../../../assets/img/loader.gif","alt",""],[1,"login","w-100","m-0","p-0"],[1,"w-100","m-0","p-3","h-100","d-flex","flex-row","justify-content-center"],[1,"screen"],[1,"screen__content","row","justify-content-center","align-items-center"],[3,"formGroup","ngSubmit"],[1,"login__field","row"],["src","../../../assets/img/user.png","alt","E-mail",2,"height","50px","width","50px"],["type","text","placeholder","E-mail","name","email","formControlName","email",1,"login__input","form-control"],[3,"hidden"],["class","mt-2 p-0 shadow text-center form-control alert alert-danger",4,"ngIf"],["src","../../../assets/img/lock.png","alt","Contrase\xf1a",2,"height","50px","width","50px"],["type","password","placeholder","Contrase\xf1a","formControlName","password","name","password",1,"login__input","form-control"],[1,"mt-2","p-0","shadow","text-center","form-control","alert","alert-danger"],["type","submit",1,"button","login__submit","d-flex","flex-row","align-items-between","justify-content-between"],[1,"button__text"],["src","../../../assets/img/arrow.png","alt","Iniciar sesion",2,"height","25px","width","25px"],[1,"d-flex","flex-column","align-items-center","justify-content-center"],["type","button","value","Registrarse","routerLink","/registrarse",1,"button","login__submit","d-flex","flex-row","align-items-between","justify-content-between"],[1,"text-white"],[1,"screen__background"],[1,"screen__background__shape","screen__background__shape4"],[1,"screen__background__shape","screen__background__shape3"],[1,"screen__background__shape","screen__background__shape2"],[1,"screen__background__shape","screen__background__shape1"],[1,"p-2"],["class","col",4,"ngFor","ngForOf"],[1,"col"],[1,"autolog","btn","m-1","p-2",2,"height","80px","width","250px",3,"click"],[1,"row"],["alt","foto User",2,"height","50px","width","50px",3,"src"]],template:function(t,i){1&t&&(e.TgZ(0,"ngx-spinner",0),e._UZ(1,"img",1),e.qZA(),e.TgZ(2,"section",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"form",6),e.NdJ("ngSubmit",function(){return i.loginWithMailAndPassword()}),e.TgZ(7,"div",7),e._UZ(8,"img",8)(9,"input",9),e.qZA(),e.TgZ(10,"div",10),e.YNc(11,f,2,0,"span",11),e.YNc(12,x,2,0,"span",11),e.qZA(),e.TgZ(13,"div",7),e._UZ(14,"img",12)(15,"input",13),e.qZA(),e.TgZ(16,"div",10)(17,"span",14),e._uU(18,"Contrase\xf1a es requerida"),e.qZA()(),e.TgZ(19,"button",15)(20,"span",16),e._uU(21,"Iniciar Sesion"),e.qZA(),e._UZ(22,"img",17),e.qZA(),e.TgZ(23,"div",18),e._UZ(24,"input",19),e.TgZ(25,"span",20),e._uU(26,"\xbfAun no tienes cuenta?"),e.qZA()()()(),e.TgZ(27,"div",21),e._UZ(28,"span",22)(29,"span",23)(30,"span",24)(31,"span",25),e.qZA()(),e.TgZ(32,"div",26),e.YNc(33,b,9,4,"div",27),e.qZA()()()),2&t&&(e.xp6(6),e.Q6J("formGroup",i.formLogin),e.xp6(4),e.Q6J("hidden",i.formLogin.controls.email.pristine||!i.formLogin.controls.email.errors),e.xp6(1),e.Q6J("ngIf",null==i.formLogin.controls.email.errors?null:i.formLogin.controls.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==i.formLogin.controls.email.errors?null:i.formLogin.controls.email.errors.email),e.xp6(4),e.Q6J("hidden",i.formLogin.controls.password.pristine||!i.formLogin.controls.password.errors),e.xp6(17),e.Q6J("ngForOf",i.userService.usersQuickAccess))},dependencies:[l.sg,l.O5,a.rH,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,g.Ro],styles:['@import"https://fonts.googleapis.com/css?family=Raleway:400,700";*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0;font-family:Raleway,sans-serif}body[_ngcontent-%COMP%]{background:linear-gradient(90deg,#d5c5f4,#836bcc)}.container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;min-height:100vh}.screen[_ngcontent-%COMP%]{background:linear-gradient(90deg,#6554a4,#9a78b8);position:relative;height:600px;width:360px;box-shadow:0 0 24px #665696}.screen__content[_ngcontent-%COMP%]{z-index:1;position:relative;height:100%}.screen__background[_ngcontent-%COMP%]{position:absolute;inset:0;z-index:0;clip-path:inset(0 0 0 0)}.screen__background__shape[_ngcontent-%COMP%]{transform:rotate(45deg);position:absolute}.screen__background__shape1[_ngcontent-%COMP%]{height:520px;width:520px;background:#FFF;top:-50px;right:120px;border-radius:0 72px 0 0}.screen__background__shape2[_ngcontent-%COMP%]{height:220px;width:220px;background:#6C63AC;top:-172px;right:0;border-radius:32px}.screen__background__shape3[_ngcontent-%COMP%]{height:540px;width:190px;background:linear-gradient(270deg,#5D54A4,#6A679E);top:-24px;right:0;border-radius:32px}.screen__background__shape4[_ngcontent-%COMP%]{height:400px;width:200px;background:#7E7BB9;top:420px;right:50px;border-radius:60px}.login[_ngcontent-%COMP%]{width:320px;padding:156px 30px 30px}.login__field[_ngcontent-%COMP%]{padding:20px 0;position:relative}.login__icon[_ngcontent-%COMP%]{position:absolute;top:30px;color:#7875b5}.login__input[_ngcontent-%COMP%]{border:none;border-bottom:2px solid #D1D1D4;background:none;padding:10px 10px 10px 24px;font-weight:700;width:75%;transition:.2s}.login__input[_ngcontent-%COMP%]:active, .login__input[_ngcontent-%COMP%]:focus, .login__input[_ngcontent-%COMP%]:hover{outline:none;border-bottom-color:#6a679e}.login__submit[_ngcontent-%COMP%]{background:#fff;font-size:14px;margin-top:30px;padding:16px 20px;border-radius:26px;border:1px solid #D4D3E8;text-transform:uppercase;font-weight:700;display:flex;align-items:center;width:100%;color:#4c489d;box-shadow:0 2px 2px #5c5696;cursor:pointer;transition:.2s}.login__submit[_ngcontent-%COMP%]:active, .login__submit[_ngcontent-%COMP%]:focus, .login__submit[_ngcontent-%COMP%]:hover{border-color:#6a679e;outline:none}.button__icon[_ngcontent-%COMP%]{font-size:24px;margin-left:auto;color:#7875b5}.social-login[_ngcontent-%COMP%]{position:absolute;height:140px;width:160px;text-align:center;bottom:0;right:0;color:#fff}.social-icons[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.social-login__icon[_ngcontent-%COMP%]{padding:20px 10px;color:#fff;text-decoration:none;text-shadow:0px 0px 8px #7875B5}.social-login__icon[_ngcontent-%COMP%]:hover{transform:scale(1.5)}.autolog[_ngcontent-%COMP%]{border:2px solid black;border-radius:10px;background-color:#64f0f0}.autolog[_ngcontent-%COMP%]:hover{background-color:#258eff;border:2px solid blue;color:#fff}']})}return o})()}];let C=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#n=this.\u0275mod=e.oAB({type:o});static#o=this.\u0275inj=e.cJS({imports:[a.Bz.forChild(v),a.Bz]})}return o})();var w=r(8416);let Z=(()=>{class o{static#e=this.\u0275fac=function(t){return new(t||o)};static#n=this.\u0275mod=e.oAB({type:o});static#o=this.\u0275inj=e.cJS({imports:[l.ez,C,w.q,s.UX,g.ef]})}return o})()}}]);