function src (name) {
    // return 'https://www.theajack.com/magic/cdn/image/' + name;
    return 'http://localhost:8080/image/' + name;
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