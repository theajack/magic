import $ from 'easy-dom-util';
import {reportStyle} from './tool';
import step from './step';

let container = null;

reportStyle(initStyle);

export async function initRender () {
    container = $.create('div').cls('container');
    $.query('body').append(container);
    await step.init(container);
    await step.first();
    let card = await step.card();
    await step.result(card);
    await step.share();
}

function initStyle () {
    return /* css */ `
        body,html{
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            overflow-x: hidden;
        }
        .container{
            text-align: center;
            width: 100%;
            font-family: Microsoft YaHei;
        }
    `;
}