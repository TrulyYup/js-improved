const API_URL = 'http://localhost:8000';
const API_CATALOG = `${API_URL}/goods.json`;
const API_URL_BUSKET = `${API_URL}/busket`;

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
    props: [
      "item"
    ],
    data() {
      return {
        busketGoodsItem: []
      }
    },
    template: `
    <div class="busketLayout">
            <div class="busket">
               <div class="busket_header">
                  <h2 class="title">Cart</h2>
                  <i class="fas fa-thin fa-xmark" @click="$emit('close')"></i>
               </div>
               <div class="busket_content">
               <busket-good v-for="item in busketGoodsItem" :item="item"></busket-good>
               </div>
               </div>
            </div>
         </div>
    `,
    mounted() {
      service(API_URL_BUSKET).then((data) => {
        this.busketGoodsItem = data
      })
    }
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
    <p>{{ item.price }}$</p>
    </div>`
  });

  Vue.component('busket-good', {
    props: [
      "item"
    ],
    template: `
    <div class="busket-good">
    <img src="images/macbook.png" alt="photo">
    <div class="busket-good_disc">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}$</p>
    <div class="busket-amount">
    <button>+</button>
    <p>{{ item.amount }}</p>
    <button>-</button>
    </div>
    </div>
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
      service(API_CATALOG).then((goods) => {
        this.goods = goods;
        return goods;
      });
    }
  });
};