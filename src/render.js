import $ from 'easy-dom-util';
import {reportStyle} from './tool';

let container = null;

reportStyle(initStyle);

export function initRender () {
    container = $.create('div').text('aa');
    $.query('body').append(container);
}


function initStyle () {
    return /* css */ `
        body,html{
            background-color: #222;
            color: #fff;
        }
    `;
}