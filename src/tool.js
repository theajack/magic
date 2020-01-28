import $ from 'easy-dom-util';

export function reportStyle (func) {
    $.reportStyle({
        func,
        id: 'magic_style',
        usePool: true
    });
}