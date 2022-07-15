import "./styles/style.css";
import "./components/Search"
import "./components/Busket"
import "./components/CustomButton"
import "./components/Good"
import "./components/BusketGood"
import { API_URL, API_CATALOG, API_URL_BUSKET, GOODS } from "./constants"
import { service, serviceWithBody } from "./services"

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
      service(API_CATALOG).then((goods) => {
        this.goods = goods;
        return goods;
      });
    }
  });
};