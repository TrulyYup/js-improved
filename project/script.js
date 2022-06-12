const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL_BASKET = `${API_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
};

class GoodsItem {
  constructor({ product_name = '', price = 0 }) {
    this.title = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <img src="https://picsum.photos/200/300?grayscale" alt="photo">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
};

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  };

  filterGoods(value) {
    this.filteredGoods = this.goods.filter(({ product_name }) => {
      return product_name.match(new RegExp(value, "gui"));
    })
  }

  fetchGoods() {
    return service(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
      return goods;
    });
  };

  result() {
    let result = this.goods.reduce((previous, sum) => previous + sum.price, 0);
    console.log(`Общая цена товаров составила: ${result} рублей.`);
  };

  render() {
    let listHtml = '';
    this.filteredGoods.map(list => {
      const goodItem = new GoodsItem(list);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  };
};
class GoodsBusket {
  goods = [];
  fetchGoods(callback = () => { }) {
    service(API_URL_BASKET, (goods) => {
      this.goods = goods;
      callback();
    })
  }
};

const busket = new GoodsBusket();
busket.fetchGoods();

const list = new GoodsList();
list.fetchGoods().then(() => {
  list.render();
  list.result();
})

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', (e) => {
  let value = document.querySelector('.goods-search').value;
  list.filterGoods(value);
  list.render();
});