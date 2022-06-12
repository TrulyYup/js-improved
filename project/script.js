const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL_BASKET = `${API_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
};

window.onload = () => {
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