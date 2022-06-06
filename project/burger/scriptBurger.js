/*
* Некая сеть фастфуда предлагает несколько видов гамбургеров:
a. Маленький (50 рублей, 20 калорий).
b. Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
a. С сыром (+10 рублей, +20 калорий).
b. С салатом (+20 рублей, +5 калорий).
c. С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить
майонезом (+20 рублей, +5 калорий).
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно
использовать примерную архитектуру класса со следующей страницы, но можно использовать
и свою.
*/

const smallBurger = { price: 50, calories: 20 };
const bigBurger = { price: 100, calories: 40 };
const stuffingCheese = { price: 10, calories: 20 };
const stuffingSalad = { price: 20, calories: 5 };
const stuffingPotato = { price: 15, calories: 10 };
const toppingSeed = { param: 'Топпинг с приправой', price: 15, calories: 0 };
const toppingMayonnaise = { param: 'Топпинг с майонезом', price: 20, calories: 5 };

class Hamburger {
    constructor(size, stuffing, topping = 0) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = topping;
    }
    addTopping(topping) { // Добавить добавку 

    }
    removeTopping(topping) { // Убрать добавку 
    }
    getToppings(topping) { // Получить список добавок 
        const listToppings = [].concat(toppingSeed, toppingMayonnaise)
        console.log(listToppings);
    }
    getSize() { // Узнать размер гамбургера 
        if (this.size.price === 50) {
            console.log('Это маленький бургер');
        } else {
            console.log('Это большой бургер');
        };
    }
    getStuffing() { // Узнать начинку гамбургера 
        console.log(`Начинка гамбургера`);
    };
    calculatePrice() { // Узнать цену 
        const price = this.size.price + this.stuffing.price;
        console.log(`Цена бургера ${price}`);
    };
    calculateCalories() { // Узнать калорийность
        const calories = this.size.calories + this.stuffing.calories;
        console.log(`Калорийность бургера ${calories}`);
    };
};
const burger = new Hamburger(smallBurger, stuffingCheese);
burger.calculateCalories();
burger.calculatePrice();
burger.getToppings();
burger.getSize();
burger.getStuffing();