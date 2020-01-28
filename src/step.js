import $ from 'easy-dom-util';
import image from './image';
import generateCards from './cards';
import textPool from './textPool';
import {reportStyle, transition, transform, isIos} from './tool';
import {type, delay, hide, show, btnClick} from './tool';

reportStyle(initStyle);

let el = {};

async function init (container) {
    el.container = container;
    el.face = $.create('img').cls('face hide').src(image.face);
    el.textDiv = $.create('div').cls('text-w');
    textPool.init(el.textDiv);
    el.btn = $.create('button').cls('button hide').text('乐意奉陪');
    container.append(el.face, el.textDiv, el.btn);

}

async function first () {
    
    await delay(100);
    await show(el.face);
    await type(await textPool.pop(), '嘿，你好！咱们玩个游戏吧!');

    show(el.btn);

    await btnClick(el.btn);
    textPool.reset();
    hide(el.btn);

    await type(await textPool.pop(), '非常感谢你的参与');


    await type(await textPool.pop(), '首先请在脑海中想一个两位数');
    el.btn.text('想好了');

    show(el.btn);

    await btnClick(el.btn);
    textPool.reset();
    hide(el.btn);

    await type(await textPool.pop(), '然后把这个两位数减去');
    await type(await textPool.pop(), '它的十位数和个位数之和');
    await type(await textPool.pop(), '例: 如果你想的是 12');
    await type(await textPool.pop(), '结果就是 12 - (1 + 2)');
    await type(await textPool.pop(), '请按照这个算式计算出你的结果');
    await type(await textPool.pop(), '并记住最终的结果');

    el.btn.text('算好了');
    show(el.btn);

    await btnClick(el.btn);

    textPool.reset();
    hide(el.btn);
    await delay(100);
    await textPool.clear();

    await type(await textPool.pop(), '接下来我会为你准备一些扑克牌');
    await type(await textPool.pop(), '你需要找到你的');
    await type(await textPool.pop(), '最终结果对应的扑克牌并记住它');

    el.btn.text('明白 给我看牌吧');

    show(el.btn);

    await btnClick(el.btn);
    textPool.reset();
    hide(el.btn);
    await hide(el.face);
}

async function card () {
    let cardList = $.create('div').cls('card-list hide');
    let next = $.create('button').cls('button hide card').text('我找到并记好牌了');
    let top = (document.documentElement.offsetHeight - 616 - 50) / 2;
    if (top < 0) {top = 0;}
    cardList.style({
        top: top + 'px'
    });
    el.container.append(cardList, next);
    let card = await generateCards(cardList);
    await show(cardList);
    show(next);
    await btnClick(next);

    hide(cardList);
    await hide(next);
    el.container.remove(cardList);
    el.container.remove(next);
    return card;
}

async function result (cardData) {
    await show(el.face);
    await type(await textPool.pop(), '现在你记住了一张扑克牌');
    await type(await textPool.pop(), '我需要通过读心术');
    await type(await textPool.pop(), '猜出你心中的扑克牌');
    await type(await textPool.pop(), '请保持注意力想着你的扑克牌');
    await type(await textPool.pop(), '我需要一点点时间...');
    await delay(1000);
    await type(await textPool.pop(), '有了!');

    await delay(1000);
    textPool.reset();
    await delay(100);
    await textPool.clear();

    let resultDiv = $.create('div').cls('result-div hide');
    el.resultDiv = resultDiv;
    let card = $.create('div').cls('card'), number, front;
    let wrap = null;
    resultDiv.append(
        wrap = $.create('div').cls('flip_wrap').append(
            $.create('div').cls('flip').append(
                front = $.create('div').cls('side front').append( // 扑克背面
                    $.create('img').cls('card-back').src(image.back)
                ),
                $.create('div').cls('side back').append( // 扑克背面
                    card
                ),
            )
        )
    );
    el.wrap = wrap;
    wrap.click(() => {
        card.append(
            $.create('img').cls('type').src(image.type(cardData.type)),
            number = $.create('div').cls('number').text(cardData.letter)
        );
        if (cardData.type === 1 || cardData.type === 3) {
            number.style('color', 'rgb(221,1,3)');
        }
        if (isIos()) {
            front.addClass('fadeout');
        } else {
            wrap.addClass('rotate');
        }

        el.btn.text('分享给朋友装X');
    
        show(el.btn);

    });
    el.container.el.insertBefore(resultDiv.el, el.textDiv.el);
    await delay(500);
    wrap.style('height', '315px');
    await show(resultDiv);
    await type(await textPool.pop(), '点击扑克看我猜的对不对吧');
    await btnClick(el.btn);


}

export async function share () {
    hide(el.btn);
    await hide(el.resultDiv);
    el.wrap.style('height', '0px');
    await delay(1000);
    el.container.remove(el.resultDiv);
    textPool.reset();
    await delay(100);
    await type(await textPool.pop(), '非常感谢你的参与');
    await type(await textPool.pop(), '点击右上角 ... 分享到朋友圈');
    await delay(1500);

    textPool.reset();
    await delay(100);
    await textPool.clear();

    hide(el.face);
    
}

export default {
    init,
    first,
    card,
    result,
    share
};

function initStyle () {
    return /* css */ `
        .face{
            width: 200px;
            margin-bottom: 20px;
        }
        .hide{
            transform: scale(3);
            opacity: 0;
            ${transition()}
        }
        .show{
            transform: scale(1);
            opacity: 1;
        }
        .text{
            font-size: 20px;
            font-weight: bold;
            min-height: 0px;
            margin-bottom: 10px;
            ${transition('min-height .5s ease')}
        }
        .text.height{
            min-height: 26.4px;
        }
        .button{
            background-color: #0005;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 5px;
            font-size: 20px;
            margin-top: 30px;
            padding: 5px 30px;
            outline: none;
        }
        .button.card{
            margin: 0;
            position: fixed;
            bottom: 5px;
            width: 300px;
            left: 50%;
            margin-left: -150px;
        }
        .card-list{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 616px;
            max-height: 100%;
            overflow-y: auto;
        }
        .flip_wrap {
          width: 210px;
          height: 0px;
          margin: 0 auto;
          perspective: 800px;
          ${transition('height .5s ease')}
          /*perspective属性定义3D元素距视图的距离,以像素计。该属性允许您改变 3D
        元素查看 3D 元素的视图。*/
          -webkit-perspective: 800px;
          -moz-perspective: 800px;
          -ms-perspective: 800px;
          -o-perspective: 800px;
          border-radius: 5px;
            overflow: hidden;
        }
      
        .flip {
          width: 210px;
          height: 315px;
          backface-visibility: hidden;
          /*背对屏幕时隐藏*/
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          -ms-backface-visibility: hidden;
          -o-backface-visibility: hidden;
          ${transition()}
          transform-style: preserve-3d;
          /*子元素将保留其 3D 位置。*/
        }
      
        .side {
          width: 100%;
          height: 100%;
          position: absolute;
          /*让背面和正面重叠*/
          left: 50%;
          margin-left: -105px;
        }
      
        .front {
          z-index: 2;
          opacity: 1;
          ${transition('opacity 2s ease')}
          /*让正面朝上*/
        }
        .front.fadeout{
            opacity: 0;
        }
      
        .back {
          ${isIos() ? '' : transform('rotateY(180deg)')}
          background: #fff;
        }
      
        .flip_wrap.rotate .flip {
            ${transform('rotateY(180deg)')}
        }
        .card-back{
            width: 100%;
        }
        .result-div .card{
            width: 100%;
            margin: 0;
        }
        .result-div .card .type{
            height: 120px;
            width: 120px;
            margin-top: 40px;
        }
        .result-div .card .number{
            font-size: 70px;
            font-weight: bold;
            top: 20px;
        }
    `;
}