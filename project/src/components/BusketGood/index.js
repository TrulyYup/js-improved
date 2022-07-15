import img from "../../images/macbook.png";
export default Vue.component('busket-good', {
    props: [
        "item"
    ],
    template: `
    <div class="busket-good">
    <img src="${img}" alt="photo">
    <div class="busket-good_disc">
    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}$</p>
    <div class="busket-amount">
    <button @click="$emit('add', item.id)">+</button>
    <p>{{ item.amount }}</p>
    <button @click="$emit('delete', item.id)">-</button>
    </div>
    </div>
    </div>`
});