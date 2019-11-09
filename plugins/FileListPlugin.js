class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename
  }
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      // console.log(compilation.assets)
      let assets = compilation.assets;
      let content = `## 文件名    资源大小\r\n`;
      Object.entries(assets).forEach(([filename, status]) => {
        console.log(filename, status)
        content += `${filename}    ${parseFloat(status.size() / 1000)
          }k \r\n`
      })
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}
module.exports = FileListPlugin;