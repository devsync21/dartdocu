export default {

    data() {
        return {

        }
    },
    methods: {
        inputfocused(event) {
            console.log(event.target.id.substring(1))
            event.target.id.substring(1)
            this.guideText = event.srcElement.name


        },

        canvas1reset() {
            var c1 = document.getElementById('canvas1')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        },
        canvas2reset() {
            var c1 = document.getElementById('canvas2')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        },
        canvas3reset() {
            var c1 = document.getElementById('canvas3')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        }
    }
}