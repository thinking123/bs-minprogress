Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal, changedPath) {
                console.log('visible change ', newVal, oldVal, changedPath)
            }
        }
    },
    data: {},
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
