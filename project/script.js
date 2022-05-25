class GoodsItem {
  constructor({ title = '', price = 0 }) {
    this.title = title;
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
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  result() {
    let result = this.goods.reduce((previous, sum) => previous + sum.price, 0);
    console.log(`Общая цена товаров составила: ${result} рублей.`);
  }

  render() {
    let listHtml = '';
    this.goods.map(list => {
      const goodItem = new GoodsItem(list);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.result();