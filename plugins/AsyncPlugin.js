class AsyncPlugin {
  apply(compiler) { //compiler.hooks
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compliation, cb) => {
      setTimeout(() => {
        console.log('等1s=>tapAsync文件发射')
        cb()
      }, 1000)
    }),
      compiler.hooks.emit.tapPromise('AsyncPlugin', (compliation) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('再等2s=>tapPromise 文件发射')
            resolve()
          }, 2000)
        })
      })
  }
}
module.exports = AsyncPlugin