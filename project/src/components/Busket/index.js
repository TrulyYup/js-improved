import { service, serviceWithBody } from "../../services";
import { GOODS, API_URL_BUSKET } from "../../constants"

export default Vue.component('busket', {
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
               <div class="busket_content" v-if="busketGoodsItem.length">
               <busket-good 
               v-for="item in busketGoodsItem" 
               :item="item"
               @add="addGood"
               @delete="deleteGood"></busket-good>
               </div>
               <span v-else>Корзина пуста</span>
               </div>
            </div>
         </div>
    `,
    mounted() {
        service(API_URL_BUSKET).then((data) => {
            this.busketGoodsItem = data
        })
    },
    methods: {
        addGood(id) {
            serviceWithBody(GOODS, "POST", {
                id
            }).then((data) => {
                this.busketGoodsItem = data;
            })
        },
        deleteGood(id) {
            serviceWithBody(GOODS, "DELETE", {
                id
            }).then((data) => {
                this.busketGoodsItem = data;
            })
        }
    }
});