export function add(a, b) {
    console.log(() => { return a + b })
    return a + b
}
export class Vue {
    constructor(option) {
        this.el = document.querySelector(option.el)
        this.$data = option.data
        this.dir = {}
        this.Observe(this.$data)
        this.Combile(this.el)
    }
    Observe(data) {
        for (let key in data) {
            this.dir[key] = []
            let value = data[key]
            const watcher = this.dir[key]
            Object.defineProperty(this.$data, key, {
                get: function() {
                    return value
                },
                set: function(newVal) {
                    if (value !== newVal) {
                        value = newVal
                        watcher.forEach(item => {
                            item.update()
                        })
                    }
                }
            })
        }
    }
    Combile(el) {
        for (var i = 0; i < el.children.length; i++) {
            const children = el.children[i]
            if (children.children.length) {
                this.Combile(children)
            } else {
                if (children.hasAttribute('v-text')) {
                    var val = children.getAttribute('v-text')
                    this.dir[val].push(new Watcher(children, 'innerHTML', val, this.$data))
                }
                if (children.hasAttribute('v-model')) {
                    const val = children.getAttribute('v-model')
                    this.dir[val].push(new Watcher(children, 'value', val, this.$data))
                    children.addEventListener('input', function(value) {
                        this.$data[val] = children.value
                    }.bind(this))
                }
            }
        }
    }
}
// 3 更新视图
class Watcher {
    constructor(node, type, key, data) {
        this.node = node
        this.type = type
        this.key = key
        this.$data = data
        this.update()
    }
    update() {
        this.node[this.type] = this.$data[this.key]
    }
}