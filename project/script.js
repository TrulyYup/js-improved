const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL_BASKET = `${API_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
};

window.onload = () => {
  Vue.component('search', {
    template: `
    <label>
      <input class="goods-search" type="text" @input="$emit('input', $event.target.value)">
    </label>
    `
  });

  Vue.component('busket', {
    template: `
    <div class="busketLayout">
            <div class="busket">
               <div class="busket_header">
                  <h2 class="title">My cart</h2>
                  <i class="fas fa-thin fa-xmark" @click="$emit('close')"></i>
               </div>
               <div class="busket_content"></div>
            </div>
         </div>
    `
  });

  Vue.component('custom-button', {
    template: `
  <button class="cart-button" type="button" @click="$emit('click')">
  <slot></slot>
  </button>`
  });

  Vue.component('good', {
    props: [
      "item"
    ],
    template: `
    <div class="goods-item">
    <img src="images/macbook.png" alt="photo">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}</p>
    </div>`
  });

  const app = new Vue({
    el: "#root",
    data: {
      isVisibleCart: false,
      goods: [],
      searchValue: "",
    },
    methods: {
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart
      }
    },
    computed: {
      result() {
        let result = this.goods.reduce((previous, sum) => previous + sum.price, 0);
        console.log(`Общая цена товаров составила: ${result} рублей.`);
      },
      filteredGoods() {
        return this.goods.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, "gui"));
        })
      }
    },
    mounted() {
      service(`${API_URL}/catalogData.json`).then((goods) => {
        this.goods = goods;
        return goods;
      });
    }
  });
};