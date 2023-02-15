<template>
  <VueLoading v-model:active="isLoading"></VueLoading>
  <table>
    <tbody>
      <tr v-for="product in productList" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.price }}</td>
        <td><img :src="product.imageUrl" width="200" alt="" /></td>
        <td>
          <RouterLink
            :to="`/product/${product.id}`"
            class="btn btn-outline-secondary"
            >更多細節
          </RouterLink>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addToCart(product.id)"
          >
            加入購物車
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      productList: [],
      isLoading: false,
    };
  },
  methods: {
    getProductList() {
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res.data.products);
          this.productList = res.data.products;
        })
        .catch((error) => {
          alert(error.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    addToCart(product_id) {
      const data = {
        product_id,
        qty: 1,
      };
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          console.log(res.data);
        });
    },
  },
  mounted() {
    this.getProductList();
  },
  components: {
    RouterLink,
  },
};
</script>
