<template>
  <div class="container">
    <VueLoading v-model:active="isLoading"></VueLoading>
    <!-- 購物車列表 -->
    <div class="text-end" v-if="cartList.carts?.length > 0">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteAllCartItem()"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>品項</th>
          <th class="text-center">單價</th>
          <th class="text-center">數量</th>
          <th class="text-center">小計</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="cartList.carts?.length > 0">
        <tr v-for="cartItem in cartList.carts" :key="cartItem.id">
          <td class="d-flex align-items-center gap-2">
            <div
              alt=""
              style="
                width: 100px;
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${cartItem.product.imageUrl})` }"
            ></div>
            <div>
              <p class="mb-0">
                {{ cartItem.product.title }}
              </p>
              <p class="mb-0">NT$ {{ cartItem.product.price }}</p>
            </div>
          </td>
          <td class="text-center">NT$ {{ cartItem.product.price }}</td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="cartItem.qty"
                  @change="updateCartItem(cartItem)"
                  :disabled="cartItem.id === loadingItem"
                >
                  <option :value="i" v-for="i in 25" :key="i + `123`">
                    {{ i }}
                  </option>
                </select>
              </div>
            </div>
          </td>
          <td class="text-center">NT$ {{ cartItem.total }}</td>

          <td class="text-end">
            <button
              type="button"
              class="btn"
              @click="deleteCartItem(cartItem)"
              :disabled="cartItem.id === loadingItem"
            >
              <i
                v-if="cartItem.id === loadingItem"
                class="fas fa-spinner fa-pulse"
              ></i>
              x
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5" class="text-center">目前購物車沒有商品</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end">NT$ {{ cartList.total }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">NT$ {{ cartList.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <!-- 資料表單 start-->
  <div class="my-5 row justify-content-center">
    <VForm
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="createOrder"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="orderData.user.email"
        ></VField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="orderData.user.name"
        ></VField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          :rules="isPhone"
          v-model="orderData.user.tel"
        ></VField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="orderData.user.address"
        ></VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="orderData.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VForm>
  </div>
  <!-- 資料表單 start-->
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import cartStore from "../../stores/cartStore.js";
import { mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      productListData: [],
      productId: "",
      cart: [],
      loadingItem: "", //loading效果項目暫存區
      orderData: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      isLoading: false,
    };
  },
  methods: {
    // addToCart(product_id, qty = 1) {
    //   const data = {
    //     product_id,
    //     qty,
    //   };
    //   this.loadingItem = product_id;
    //   this.isLoading = true;
    //   this.$http
    //     .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data }) //{data:data}同名可以縮寫
    //     .then((res) => {
    //       alert(res.data.message);
    //       console.log(res.data);
    //       this.getCartList();
    //       this.loadingItem = ""; //清空loading暫存
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
    // getCartList() {
    //   this.isLoading = true;
    //   this.$http
    //     .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
    //     .then((res) => {
    //       this.cart = res.data.data;
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
    // updateCartItem(cartItem) {
    //   //購物車的id 產品的id
    //   const data = {
    //     product_id: cartItem.product_id,
    //     qty: cartItem.qty,
    //   };
    //   this.loadingItem = cartItem.id;
    //   this.$http
    //     .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartItem.id}`, {
    //       data,
    //     }) //{data:data}同名可以縮寫
    //     .then((res) => {
    //       console.log(res);
    //       this.getCartList();
    //       this.loadingItem = "";
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
    // deleteCartItem(cartItem) {
    //   this.isLoading = true;
    //   this.loadingItem = cartItem.id;
    //   this.$http
    //     .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartItem.id}`) //{data:data}同名可以縮寫
    //     .then((res) => {
    //       alert(res.data.message);
    //       this.getCartList();
    //       this.loadingItem = "";
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
    // deleteAllCartItem() {
    //   this.isLoading = true;
    //   this.$http
    //     .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
    //     .then((res) => {
    //       alert(res.data.message);
    //       this.getCartList();
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請填寫正確的手機號碼格式";
    },
    createOrder() {
      this.isLoading = true;
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/order`, {
          data: this.orderData,
        })
        .then((res) => {
          console.log(res);
          this.$refs.form.resetForm(); //清空表單
          this.orderData.message = "";
          this.getCartList();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        // 無論成功失敗都執行
        .finally(() => {
          this.isLoading = false;
        });
    },
    ...mapActions(cartStore, [
      "getCartList",
      "deleteCartItem",
      "updateCartItem",
      "deleteAllCartItem",
    ]),
  },
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  mounted() {
    this.getCartList();
  },
};
</script>
