import $ from 'easy-dom-util';
import {delay, hide} from './tool';
export default {
    arr: [],
    index: 0,
    container: null,
    init (textContainer) {
        this.container = textContainer;
    },
    async pop () {
        return new Promise(async (res) => {
            if (this.index >= this.arr.length) {
                res(await this.push());
            } else {
                res(this.arr[this.index++]);
            }
        });
    },
    async push () {
        let text = $.create('div').cls('text');
        this.container.append(text);
        await delay(100);

        text.addClass('height');
        await delay(200);
        this.arr.push(text);
        this.index++;
        return text;
    },
    reset () {
        this.arr.forEach((el) => {
            hide(el.text(''));
        });
        this.index = 0;
    },
    async clear () {
        this.arr.forEach((el) => {
            el.rmClass('height');
        });
        await delay(2000);
        this.arr = [];
    }
};