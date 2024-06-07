/*
 * @Author: chenzhongsheng
 * @Date: 2024-05-24 15:23:02
 * @Description: Coding something
 */
function src (name) {
    if (location.host.startsWith('localhost:')) {
        return 'http://localhost:8080/image/' + name;
    }
    return '/magic/cdn/image/' + name;
}

export default {
    hei: src('hei.jpg'),
    hong: src('hong.jpg'),
    mei: src('mei.jpg'),
    fang: src('fang.jpg'),
    face: src('face.png'),
    back: src('back.jpg'),
    type (type) {
        return this[['hei', 'hong', 'mei', 'fang'][type]];
    }
};