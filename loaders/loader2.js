function loader(source) {
    console.log('loader2');
    return source;
}
loader.pitch = function () {
    console.log('loader2-pitch')
    // return '100'; // must return a buffer or string if need return
}
module.exports = loader;
