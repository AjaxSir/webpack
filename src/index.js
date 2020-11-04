import { add, Vue } from './index-1.js'
import './css/public.css'
import './css/eg.scss'
console.log(add(1, 3))
var a = (a, b) => {
    console.log(a, b)
}
a(1, 4)
    // 2
const app = new Vue({
    el: '#app',
    data: {
        test: '测试',
        home: '主页'
    }
})