"use strict";(self.webpackChunkTPClinica=self.webpackChunkTPClinica||[]).push([[84],{6084:(O,f,t)=>{t.d(f,{d:()=>h});var a=t(5861),u=t(4036),c=t(15),d=t(3182),p=t(9413),_=t(9468),v=t(3384),P=t(388);let h=(()=>{class o{constructor(r,e){this.firebaseStoreProvider=r,this.firebaseStorageProvider=e,this.specialitys=[]}getAllSpecialities(){var r=this;return(0,a.Z)(function*(){let e=yield(0,u.z)(r.firebaseStoreProvider.getCollection("specialities"));return e=yield Promise.all(e.map(function(){var i=(0,a.Z)(function*(s){return{...s,image:yield r.getSpecialityPhoto(s)}});return function(s){return i.apply(this,arguments)}}())),e})()}getSpecialities(){var r=this;return(0,a.Z)(function*(){const e=(0,c.IO)((0,c.hJ)(g,"specialities"));(0,c.cf)(e,i=>(r.specialitys=[],i.forEach(function(){var s=(0,a.Z)(function*(n){var l=n.data();r.specialitys.push({...l,image:yield r.getSpecialityPhoto(l)})});return function(n){return s.apply(this,arguments)}}()),r.specialitys))})()}addSpeciality(r){var e=this;return(0,a.Z)(function*(){let i=!1;if((yield e.getAllSpecialities()).forEach(n=>{n.description==r.description&&(i=!0)}),!i){const n=e.firebaseStoreProvider.createDoc("specialities");return e.firebaseStoreProvider.saveDoc(n,JSON.parse(JSON.stringify(r)))}})()}getSpecialityPhoto(r){var e=this;return(0,a.Z)(function*(){try{const i=e.firebaseStorageProvider.referenceCloudStorage(r.image);return yield e.firebaseStorageProvider.getUrlFromFile(i)}catch{}})()}static#e=this.\u0275fac=function(e){return new(e||o)(_.LFG(v.f),_.LFG(P.O))};static#r=this.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();const E=(0,d.ZF)(p.N.firebaseConfig),g=(0,c.ad)(E)}}]);