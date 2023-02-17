<template>
  <VueLoading v-model:active="isLoading"></VueLoading>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        <ul class="row gy-6">
          <li
            class="col-6 col-lg-4 px-md-6 d-flex flex-column align-items-center"
            v-for="product in sortProducts"
            :key="product.id"
          >
            <RouterLink :to="`/product/${product.id}`">
              <img class="rounded-2 img-fluid" :src="product.imageUrl" alt="" />
            </RouterLink>
            <h3
              class="font-serifTc fs-6 fs-md-5 mb-4 text-center letterSpace-2"
            >
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
    </div>
  </div>
  <div class="container d-flex justify-content-center">
    <!-- <PaginationComponent
      :pageIn="page"
      :getProductList="getProductList"
    ></PaginationComponent> -->
    <PaginationComponent></PaginationComponent>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import PaginationComponent from "../../components/PaginationComponent.vue";
import cartStore from "../../stores/cartStore.js";
import productsStore from "../../stores/productsStore.js";
import loadingStore from "../../stores/loadingStore.js";
// import loadingStore from "../../stores/loadingStore.js";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      productList: [],
      page: {},
    };
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
    ...mapActions(productsStore, ["getProductList"]),
  },
  computed: {
    ...mapState(loadingStore, ["isLoading"]),
    ...mapState(productsStore, ["sortProducts"]),
  },
  mounted() {
    this.getProductList();
  },
  components: {
    RouterLink,
    PaginationComponent,
  },
};
</script>
