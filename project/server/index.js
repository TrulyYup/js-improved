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

app.get('/busket', (req, res) => {
    // readBusket().then((busketList) => {
    //     console.log(busketList);
    // });
    // readGoods().then((goodsList) => {
    //     console.log(goodsList);
    // })

    Promise.all([
        readBusket(),
        readGoods()
    ]).then(([busketList, goodsList]) => {
        return busketList.map((busketItem) => {
            const goodsItem = goodsList.find(({ id_product: _goodsId }) => {
                return _goodsId === busketItem.id_product;
            });
            return {
                ...busketItem,
                ...goodsItem
            }
        })
    }).then((result) => {
        res.send(JSON.stringify(result))
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
});