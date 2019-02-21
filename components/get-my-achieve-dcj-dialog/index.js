const computedBehavior = require('miniprogram-computed')
const app = getApp()
const base = app.globalData.base
const component = 'get-my-achieve-dcj-dialog-'
const url = `${base}${component}`
Component({

    behaviors: [computedBehavior],

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        achievePrize:Object
    },
    computed: {
        prizeTitle(){
            console.log('prizeTitle')
            if(this.data.achievePrize && this.data.achievePrize.prizeName ){
                const ls = this.data.achievePrize.prizeName.split('\\n')
                return ls
            }else{
                return []
            }
        }
    },
    data: {
        url:url
    },
    methods: {
        handleHide() {
            this.triggerEvent('tapbutton' , this.data.achievePrize)
        },
        handleOutHide(e) {
            if (e && e.target && e.target.id === 'mask') {
                this.triggerEvent('hidetap')
            }
        }
    }

})
