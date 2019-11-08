let loaderUtils = require('loader-utils')
function loader(source) {
    console.log(source)
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source });
    console.log(filename)
    this.emitFile(filename, source)
    return `module.exports = "${filename}"`;
}
loader.raw = true; // 转成 Buffer 二进制
module.exports = loader;
