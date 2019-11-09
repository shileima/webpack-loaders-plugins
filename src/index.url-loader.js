let rs = require('./a-module');

console.log(rs)
import logo from './logo.jpg';
console.log(logo)

let img = document.createElement('img');

img.src = logo;

document.body.append(img)

const fn = () => {
    console.log('arrow function')
}