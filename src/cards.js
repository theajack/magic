import $ from 'easy-dom-util';
import image from './image';
import {reportStyle, delay, random} from './tool';
// import {type, delay, hide, show, btnClick} from './tool';

let cards = [];

reportStyle(initStyle);

export default async function generateCards (cardList) {
    let cardsData = generateCardsData();
    for (let i = 0; i < 98; i++) {
        let card = $.create('div').cls('card');
        let cardData = cardsData[i];
        let number = $.create('div').cls('number').text(cardData.letter);
        card.append(
            $.create('img').cls('type').src(image.type(cardData.type)),
            number,
            $.create('div').cls('index').text(fixNum(i + 1)),
        );
        if (cardData.type === 1 || cardData.type === 3) {
            number.style({
                color: 'rgb(221,1,3)'
            });
        }
        cards.push(card);
    }
    cardList.append(...cards);
    await delay(200);
    return cardsData[8];
}

// 扑克计算逻辑
function generateCardsData () {
    let target = randomCard(); // 预测结果

    let allCards = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 14; j++) {
            if (i !== target.type || j !== target.number) {
                allCards.push(card(i, j));
            }
        }
    }

    let data = [];
    for (let i = 0; i < 98; i++) {
        if ((i + 1) % 9 === 0) {
            data.push(target);
        } else {
            if (allCards.length > 0) {
                let index = random(0, allCards.length - 1);
                data.push(allCards[index]);
                allCards.splice(index, 1);
            } else {
                let card = randomCard();
                while (card.type === target.type && card.number === target.number) {
                    card = randomCard();
                }
                data.push(card);
            }
        }
    }
    return data;
}

function randomCard () {
    return card(random(0, 3), random(1, 13));
}

function fixNum (num) {
    return num < 10 ? ('0' + num) : num;
}

const LETTER = [
    '0', 'A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

function card (type, number) {
    return {type, number, letter: LETTER[number]};
}

function initStyle () {
    return /* css */ `
        .card{
            width: 9%;
            float: left;
            height: 40px;
            background-color: #fff;
            margin: 2px 0;
            color: #000;
            border-radius: 2px;
            position: relative;
            margin-left: 5%;
            margin-right: 0.286%;
        }
        .card .index{
            position: absolute;
            font-size: 12px;
            font-weight: bold;
            top: 0;
            left: -17px;
            color: #fff;
        }
        .card .type{
            height: 20px;
            width: 20px;
            margin-top: 2px;
        }
        .card .number{
            position: relative;
            top: -7px;
        }
    `;
}