import $ from 'easy-dom-util';

export function reportStyle (func) {
    $.reportStyle({
        func,
        id: 'magic_style',
        usePool: true
    });
}

// 打字机效果
export async function type (el, text = '') {
    let index = 0;
    let timer = null;
    let time = 100;
    timer = window.setInterval(() => {
        if (index <= text.length) {
            el.text(text.substr(0, index++));
        } else {
            window.clearInterval(timer);
        }
    }, time);

    await delay(time * text.length);
}

export function transform (style) {
    return `transform: ${style};
    -webkit-transform: ${style};
    -moz-transform: ${style};
    -ms-transform: ${style};
    -o-transform: ${style};`;
}

export function transition (style = 'all 2s ease') {
    return `transition: ${style};
    -webkit-transition: ${style};
    -moz-transition: ${style};
    -ms-transition: ${style};
    -o-transition: ${style};`;
}

export async function delay (time) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, time);
    });
}


export async function show (el) {
    el.addClass('show');
    await delay(2000);
}
export async function hide (el) {
    el.rmClass('show');
    await delay(2000);
}
export async function btnClick (btn) {
    return new Promise(async (res) => {
        btn.click(() => {
            res();
        });
    });
}

export function random (a, b) {
    return (a + Math.round(Math.random() * (b - a)));
};