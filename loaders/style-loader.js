function loader(source) {
  //导出脚本插入 style 标签
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.body.appendChild(style);
  `
  return str;
}
exports.default = loader