import{c as n}from"./cartStore-878a754c.js";import{_ as u,m as l,a as _,r,o as m,c as p,b as c,d as e,w as a,e as t,F as f,t as h}from"./index-85c3f670.js";const g={methods:{...l(n,["getCartList"])},computed:{..._(n,["cartList"])},mounted(){this.getCartList()}},L={class:"d-flex align-items-center justify-content-center"},x=c("h1",null,"這是前台頁面",-1);function V(i,k,w,C,R,$){const o=r("RouterLink"),d=r("RouterView");return m(),p(f,null,[c("div",L,[x,e(o,{to:"/home"},{default:a(()=>[t("home")]),_:1}),t("| "),e(o,{to:"/about"},{default:a(()=>[t("about")]),_:1}),t("| "),e(o,{to:"/products"},{default:a(()=>[t("產品一覽")]),_:1}),t("| "),e(o,{to:"/cart"},{default:a(()=>{var s;return[t("購物車 "+h((s=i.cartList.carts)==null?void 0:s.length),1)]}),_:1}),t("| "),e(o,{to:"/login"},{default:a(()=>[t("login")]),_:1}),t("| "),e(o,{to:"/admin/products"},{default:a(()=>[t("後台產品頁面")]),_:1}),t("| ")]),e(d)],64)}const B=u(g,[["render",V]]);export{B as default};
