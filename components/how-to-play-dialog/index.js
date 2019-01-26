Component({

    behaviors: [],

    properties: {
        visible: {
            type: Boolean,
            value: false
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
