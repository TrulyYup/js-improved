import express, { json } from 'express';
import cors from 'cors';
import { writeFile, readFile } from 'fs/promises';

const BUSKET = './public/busket-goods.json';
const GOODS = './public/goods.json'

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readBusket = () =>
    readFile(BUSKET, 'utf-8')
        .then((busketFile) => {
            return JSON.parse(busketFile)
        });

const readGoods = () =>
    readFile(GOODS, 'utf-8')
        .then((busketFile) => {
            return JSON.parse(busketFile)
        });

function getReformBusket() {
    return Promise.all([
        readBusket(),
        readGoods()
    ]).then(([busketList, goodsList]) => {
        return busketList.map((busketItem) => {
            const goodsItem = goodsList.find(({ id: _goodsId }) => {
                return _goodsId === busketItem.id;
            });
            return {
                ...busketItem,
                ...goodsItem
            }
        })
    })
    return result
};

app.get('/busket', (req, res) => {
    getReformBusket().then((result) => {
        res.send(JSON.stringify(result))
    })
});

app.post("/busket", (req, res) => {
    readBusket().then((busket) => {
        const busketItem = busket.find(({ id: _id }) => _id === req.body.id);
        if (!busketItem) {
            busket.push({
                id: req.body.id,
                amount: 1,
            })
        } else {
            busket = busket.map((busketItem) => {
                if (busketItem.id === req.body.id) {
                    return {
                        ...busketItem,
                        amount: busketItem.amount + 1
                    }
                } else {
                    return busketItem;
                }
            })
        }
        console.log(busket);

        return writeFile(BUSKET, JSON.stringify(busket)).then(() => {
            return getReformBusket()

        }).then((result) => {
            res.send(result)
        })
    })
});

app.delete("/busket", (req, res) => {
    readBusket().then((busket) => {
        const busketItem = busket.find(({ id: _id }) => _id === req.body.id);
        if (busketItem.amount === 1) {
            busket.splice(busket.indexOf(busketItem), 1)
        } else {
            busket = busket.map((busketItem) => {
                if (busketItem.id === req.body.id) {
                    return {
                        ...busketItem,
                        amount: busketItem.amount - 1
                    }
                } else {
                    return busketItem;
                }
            })
        }
        console.log(busket);

        return writeFile(BUSKET, JSON.stringify(busket)).then(() => {
            return getReformBusket()

        }).then((result) => {
            res.send(result)
        })
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
});