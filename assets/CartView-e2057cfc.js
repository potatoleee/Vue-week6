import{c as f}from"./cartStore-878a754c.js";import{_ as L,m as C,a as D,r as m,o as d,c as i,b as e,d as n,j as v,F as p,h as V,t as r,w as P,k as T,l as y,v as E,e as U,n as _,p as N}from"./index-85c3f670.js";const{VITE_APP_URL:A,VITE_APP_PATH:w}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"week3dean",BASE_URL:"/vue-week6/",MODE:"production",DEV:!1,PROD:!0},S={data(){return{productListData:[],productId:"",cart:[],loadingItem:"",orderData:{user:{name:"",email:"",tel:"",address:""},message:""},isLoading:!1}},methods:{isPhone(a){return/^(09)[0-9]{8}$/.test(a)?!0:"請填寫正確的手機號碼格式"},createOrder(){this.isLoading=!0,this.$http.post(`${A}/api/${w}/order`,{data:this.orderData}).then(a=>{console.log(a),this.$refs.form.resetForm(),this.orderData.message="",this.getCartList()}).catch(a=>{alert(a.response.data.message)}).finally(()=>{this.isLoading=!1})},...C(f,["getCartList","deleteCartItem","updateCartItem","deleteAllCartItem"])},computed:{...D(f,["cartList"])},mounted(){this.getCartList()}},F={class:"container"},q={key:0,class:"text-end"},M={class:"table align-middle"},B=e("thead",null,[e("tr",null,[e("th",null,"品項"),e("th",{class:"text-center"},"單價"),e("th",{class:"text-center"},"數量"),e("th",{class:"text-center"},"小計"),e("th")])],-1),I={key:0},O={class:"d-flex align-items-center gap-2"},R={class:"mb-0"},z={class:"mb-0"},j={class:"text-center"},H={class:"input-group input-group-sm"},$={class:"input-group mb-3"},G=["onUpdate:modelValue","onChange","disabled"],J=["value"],K={class:"text-center"},Q={class:"text-end"},W=["onClick","disabled"],X={key:0,class:"fas fa-spinner fa-pulse"},Y={key:1},Z=e("tr",null,[e("td",{colspan:"5",class:"text-center"},"目前購物車沒有商品")],-1),ee=[Z],te=e("td",{colspan:"4",class:"text-end"},"總計",-1),se={class:"text-end"},oe=e("td",{colspan:"4",class:"text-end text-success"},"折扣價",-1),le={class:"text-end text-success"},ae={class:"my-5 row justify-content-center"},ne={class:"mb-3"},de=e("label",{for:"email",class:"form-label"},"Email",-1),ie={class:"mb-3"},re=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),ce={class:"mb-3"},ue=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),me={class:"mb-3"},_e=e("label",{for:"address",class:"form-label"},"收件人地址",-1),pe={class:"mb-3"},he=e("label",{for:"message",class:"form-label"},"留言",-1),be=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function ge(a,o,fe,ve,l,h){var b,g;const k=m("VueLoading"),c=m("VField"),u=m("ErrorMessage"),x=m("VForm");return d(),i(p,null,[e("div",F,[n(k,{active:l.isLoading,"onUpdate:active":o[0]||(o[0]=t=>l.isLoading=t)},null,8,["active"]),((b=a.cartList.carts)==null?void 0:b.length)>0?(d(),i("div",q,[e("button",{class:"btn btn-outline-danger",type:"button",onClick:o[1]||(o[1]=t=>a.deleteAllCartItem())}," 清空購物車 ")])):v("",!0),e("table",M,[B,((g=a.cartList.carts)==null?void 0:g.length)>0?(d(),i("tbody",I,[(d(!0),i(p,null,V(a.cartList.carts,t=>(d(),i("tr",{key:t.id},[e("td",O,[e("div",{alt:"",style:T([{width:"100px",height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${t.product.imageUrl})`}])},null,4),e("div",null,[e("p",R,r(t.product.title),1),e("p",z,"NT$ "+r(t.product.price),1)])]),e("td",j,"NT$ "+r(t.product.price),1),e("td",null,[e("div",H,[e("div",$,[y(e("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":s=>t.qty=s,onChange:s=>a.updateCartItem(t),disabled:t.id===l.loadingItem},[(d(),i(p,null,V(25,s=>e("option",{value:s,key:s+"123"},r(s),9,J)),64))],40,G),[[E,t.qty]])])])]),e("td",K,"NT$ "+r(t.total),1),e("td",Q,[e("button",{type:"button",class:"btn",onClick:s=>a.deleteCartItem(t),disabled:t.id===l.loadingItem},[t.id===l.loadingItem?(d(),i("i",X)):v("",!0),U(" x ")],8,W)])]))),128))])):(d(),i("tbody",Y,ee)),e("tfoot",null,[e("tr",null,[te,e("td",se,"NT$ "+r(a.cartList.total),1)]),e("tr",null,[oe,e("td",le,"NT$ "+r(a.cartList.final_total),1)])])])]),e("div",ae,[n(x,{ref:"form",class:"col-md-6",onSubmit:h.createOrder},{default:P(({errors:t})=>[e("div",ne,[de,n(c,{id:"email",name:"email",type:"email",class:_(["form-control",{"is-invalid":t.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:l.orderData.user.email,"onUpdate:modelValue":o[2]||(o[2]=s=>l.orderData.user.email=s)},null,8,["class","modelValue"]),n(u,{name:"email",class:"invalid-feedback"})]),e("div",ie,[re,n(c,{id:"name",name:"姓名",type:"text",class:_(["form-control",{"is-invalid":t.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:l.orderData.user.name,"onUpdate:modelValue":o[3]||(o[3]=s=>l.orderData.user.name=s)},null,8,["class","modelValue"]),n(u,{name:"姓名",class:"invalid-feedback"})]),e("div",ce,[ue,n(c,{id:"tel",name:"電話",type:"tel",class:_(["form-control",{"is-invalid":t.電話}]),placeholder:"請輸入電話",rules:h.isPhone,modelValue:l.orderData.user.tel,"onUpdate:modelValue":o[4]||(o[4]=s=>l.orderData.user.tel=s)},null,8,["class","rules","modelValue"]),n(u,{name:"電話",class:"invalid-feedback"})]),e("div",me,[_e,n(c,{id:"address",name:"地址",type:"text",class:_(["form-control",{"is-invalid":t.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:l.orderData.user.address,"onUpdate:modelValue":o[5]||(o[5]=s=>l.orderData.user.address=s)},null,8,["class","modelValue"]),n(u,{name:"地址",class:"invalid-feedback"})]),e("div",pe,[he,y(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":o[6]||(o[6]=s=>l.orderData.message=s)},null,512),[[N,l.orderData.message]])]),be]),_:1},8,["onSubmit"])])],64)}const ke=L(S,[["render",ge]]);export{ke as default};
