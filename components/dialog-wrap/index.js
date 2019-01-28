const computedBehavior = require('miniprogram-computed')
Component({

    behaviors: [computedBehavior],

    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal, changedPath) {
                console.log('visible change ', newVal, oldVal, changedPath)
            }
        },
        bg: String
    },
    data: {},
    computed: {
        src() {
            console.log('src' , this.data.bg)
            return `./${this.data.bg}.png`
        }
    },
    methods: {
        handleHide() {
            this.triggerEvent('hidetap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        }
    }

})
