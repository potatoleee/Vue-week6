import { defineStore } from "pinia";
import axios from "axios";
import loadingStore from "./loadingStore.js";
const loading = loadingStore();

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default defineStore("cartStore", {
  state: () => ({
    cart: {},
    // productId: "",
  }),
  actions: {
    addToCart(product_id) {
      const data = {
        product_id,
        qty: 1,
      };
      //   this.loadingItem = product_id;
      loading.isLoading = true;
      //   this.$http 不能用這種方式？
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data }) //{data:data}同名可以縮寫
        .then((res) => {
          alert(res.data.message);
          console.log(res.data);
          this.getCartList();
          //   this.loadingItem = ""; //清空loading暫存
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => {
          loading.isLoading = false;
        });
    },
    getCartList() {
      //   this.isLoading = true;
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          console.log(res.data);
          console.log(this.cart);
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateCartItem(cartItem) {
      //購物車的id 產品的id
      const data = {
        product_id: cartItem.product_id,
        qty: cartItem.qty,
      };
      this.loadingItem = cartItem.id;
      axios
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartItem.id}`, {
          data,
        }) //{data:data}同名可以縮寫
        .then((res) => {
          console.log(res);
          this.getCartList();
          this.loadingItem = "";
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteCartItem(cartItem) {
      this.isLoading = true;
      this.loadingItem = cartItem.id;
      axios
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartItem.id}`) //{data:data}同名可以縮寫
        .then((res) => {
          alert(res.data.message);
          this.getCartList();
          this.loadingItem = "";
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteAllCartItem() {
      this.isLoading = true;
      axios
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.getCartList();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  getters: {
    cartList: ({ cart }) => {
      return cart;
    },
  },
});
