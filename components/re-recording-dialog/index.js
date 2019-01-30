Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        }
    },
    data: {},
    methods: {
        handleConfirm() {
            console.log('handleConfirm')
            this.triggerEvent('confirmtap')
        },
        handleReturn() {
            console.log('handleReturn')
            this.triggerEvent('returntap')
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
                console.log('handleOutHide')
            }
        }
    }

})
