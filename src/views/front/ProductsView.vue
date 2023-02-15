<template>
  <VueLoading v-model:active="isLoading"></VueLoading>

  <div class="col-12 col-md-10">
    <ul class="row gy-6">
      <li
        class="col-6 col-lg-4 px-md-6"
        v-for="product in productList"
        :key="product.id"
      >
        <RouterLink :to="`/product/${product.id}`">
          <img class="rounded-2 img-fluid" :src="product.imageUrl" alt="" />
        </RouterLink>
        <h3 class="font-serifTc fs-6 fs-md-5 mb-4 text-center letterSpace-2">
          {{ product.title }}
        </h3>
        <p class="font-serifTc mb-4 text-center letterSpace-4">
          NT$ {{ product.price }}
        </p>
        <button
          type="button"
          class="btn btn-primary"
          @click="addToCart(product.id)"
        >
          加入購物車
        </button>
        <!-- <RouterLink
          :to="`/product/${product.id}`"
          class="btn btn-outline-secondary"
          >更多細節
        </RouterLink> -->
      </li>
    </ul>
  </div>
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
