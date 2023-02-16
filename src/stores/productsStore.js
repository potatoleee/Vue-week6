import { defineStore } from "pinia";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default defineStore("productsStore", {
  state: () => ({
    productList: [],
    page: {},
  }),
  actions: {
    getProductList(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/?page=${page}`)
        .then((res) => {
          console.log(res.data);
          this.productList = res.data.products;
          this.page = res.data.pagination;
          console.log(this.page);
        })
        .catch((error) => {
          alert(error.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  getters: {
    sortProducts: ({ productList }) => {
      return productList;
    },
  },
});
