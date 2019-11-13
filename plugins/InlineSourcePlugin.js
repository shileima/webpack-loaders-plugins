/* 外链的资源标签link or script 变成内联 <link> <script></script> */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin {
  constructor({ match }) {
    this.reg = match // 正则
  }
  processTag(tag, compilation) {
    let newTag, url;
    // console.log("tag:", tag)
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: { type: 'text/css' }
      }
      url = tag.attributes.href
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      url = tag.attributes.src
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source()
      delete compilation.assets[url]
      return newTag;
    }
    return tag;
  }
  processTags(data, compilation) {
    let headTags = [];
    let bodyTags = [];

    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation));
      // console.log(headTags)
    })
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })
    // console.log({ ...data, bodyTags, ...headTags })
    return { ...data, bodyTags, headTags }
  }
  apply(compiler) {
    // 通过webpackPlugin来实现功能
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      // Static Plugin interface |compilation |HOOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'AlterPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // console.log(data)
          data = this.processTags(data, compilation)
          // Tell webpack to move on
          cb(null, data)
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'MyPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.html += 'The Magic Footer'
          // Tell webpack to move on
          cb(null, data)
        }
      )
    })
  }
}
module.exports = InlineSourcePlugin;