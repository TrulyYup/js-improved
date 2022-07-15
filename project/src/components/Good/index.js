import { serviceWithBody } from "../../services";
import { GOODS } from "../../constants";
import img from "../../images/macbook.png";

export default Vue.component('good', {
    props: [
        "item"
    ],
    template: `
    <div class="goods-item">
    <img src="${img}" alt="photo">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}$</p>
    <custom-button @click="addGood">Добавить в корзину</custom-button>
    </div>`,
    methods: {
        addGood() {
            serviceWithBody(GOODS, "POST", {
                id: this.item.id
            })
        }
    }
});