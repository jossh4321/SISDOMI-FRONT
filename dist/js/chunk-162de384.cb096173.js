(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-162de384"],{4274:function(t,i,a){"use strict";var e=a("ebfd"),n=a.n(e);n.a},7101:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-app",{staticClass:"primary",attrs:{id:"login"}},[e("v-main",[e("v-container",{attrs:{fluid:"","fill-height":""}},[e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{xl:"12",sm:"8",md:"4",lg:"4"}},[e("v-card",{staticClass:"elevation-1 pa-3"},[e("v-card-text",[e("div",{staticClass:"d-flex column align-center"},[e("img",{attrs:{src:a("ebc6"),alt:"SISDOMI",width:"120",height:"120"}}),e("h1",{staticClass:"flex my-4 text--primary"},[t._v("SISDOMI")])]),e("v-form",[e("v-text-field",{attrs:{"append-icon":"person",label:"Usuario",type:"text"},model:{value:t.model.username,callback:function(i){t.$set(t.model,"username",i)},expression:"model.username"}}),e("v-text-field",{attrs:{"append-icon":"lock",label:"Contraseña",id:"password",type:"password"},model:{value:t.model.password,callback:function(i){t.$set(t.model,"password",i)},expression:"model.password"}})],1)],1),e("v-card-actions",[e("v-btn",{attrs:{block:"",color:"primary",loading:t.loading},on:{click:t.login}},[t._v("Iniciar Sesión")])],1)],1)],1)],1)],1)],1)],1)},n=[],r={name:"login",data:function(){return{loading:!1,model:{username:"josue_colombo@gmail.com",password:"password"}}},methods:{login:function(){var t=this;this.loading=!0,setTimeout((function(){t.$router.push("/dashboard")}),1e3)}}},s=r,o=(a("4274"),a("2877")),u=a("6544"),d=a.n(u),l=a("7496"),c=a("8336"),f=a("b0af"),h=a("99d9"),p=a("62ad"),m=a("a523"),v=(a("4de4"),a("7db0"),a("4160"),a("caad"),a("07ac"),a("2532"),a("159b"),a("5530")),g=a("58df"),w=a("7e2b"),b=a("3206"),V=Object(g["a"])(w["a"],Object(b["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var i=Object.values(t).includes(!0);this.$emit("input",!i)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var i=this,a=function(t){return t.$watch("hasError",(function(a){i.$set(i.errorBag,t._uid,a)}),{immediate:!0})},e={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?e.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(i.errorBag.hasOwnProperty(t._uid)||(e.valid=a(t)))})):e.valid=a(t),e},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var i=this.inputs.find((function(i){return i._uid===t._uid}));if(i){var a=this.watchers.find((function(t){return t._uid===i._uid}));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==i._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==i._uid})),this.$delete(this.errorBag,i._uid)}}},render:function(t){var i=this;return t("form",{staticClass:"v-form",attrs:Object(v["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return i.$emit("submit",t)}}},this.$slots.default)}}),_=a("f6c4"),x=a("0fd9"),B=a("8654"),y=Object(o["a"])(s,e,n,!1,null,null,null);i["default"]=y.exports;d()(y,{VApp:l["a"],VBtn:c["a"],VCard:f["a"],VCardActions:h["a"],VCardText:h["c"],VCol:p["a"],VContainer:m["a"],VForm:V,VMain:_["a"],VRow:x["a"],VTextField:B["a"]})},ebfd:function(t,i,a){}}]);
//# sourceMappingURL=chunk-162de384.cb096173.js.map