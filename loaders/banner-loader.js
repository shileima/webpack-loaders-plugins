let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')

function loader(source) {
    this.cacheable && this.cacheable()
    console.log('banner loader')
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string',
            },
            filename: {
                type: 'string'
            }
        }
    };
    validateOptions(schema, options, 'banner-loader')
    if (options.filename) {
        this.addDependency(options.filename) // 添加文件依赖
        fs.readFile(options.filename, 'utf8', (err, data) => {
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }
}
module.exports = loader