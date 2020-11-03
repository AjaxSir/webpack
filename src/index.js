import { add } from './index-1.js'
import './css/public.css'
import './css/eg.scss'
console.log(add(1, 3))
var a = (a, b) => {
    console.log(a, b)
}
const div = document.createElement('div')
div.style.width = '100px'
div.style.height = '200px'
div.style.backgroundColor = 'black'
document.body.append(div)
a(1, 4)
    // if (module.hot) {
    //     module.hot.accept();
    // }