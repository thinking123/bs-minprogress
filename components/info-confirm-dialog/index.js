Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        name: String,
        phone: String,
        address: String,
    },
    data: {},
    methods: {
        handleConfirm() {
            console.log('handleConfirm')
            this.triggerEvent('confirmtap')
        },
        handleRetry() {
            console.log('handleRetry')
            this.triggerEvent('retrytap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
                console.log('handleOutHide')
            }
        }
    }

})
