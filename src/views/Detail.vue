<template>
    <div>
        {{data}}
        <img src="http://175.24.86.120/static/client/images/banner/banner2.jpg" />
        <img src="http://175.24.86.120/static/client/images/banner/banner3.jpg" />
        <img src="http://175.24.86.120/static/client/images/dr1.jpg" />
        <img src="http://175.24.86.120/static/client/images/dcpfl.jpg" />
        <img src="http://175.24.86.120/static/client/images/banner/banner1.jpg" />
        <img src="../assets/WechatIMG34.png">
        <img src="https://w.wallhaven.cc/full/39/wallhaven-3911w9.jpg">
        <img src="https://w.wallhaven.cc/full/dg/wallhaven-dg7y23.jpg">
        <img src="https://w.wallhaven.cc/full/zm/wallhaven-zmm7mw.png">
        <img src="https://w.wallhaven.cc/full/md/wallhaven-mdzdok.jpg">
        <img src="https://w.wallhaven.cc/full/ey/wallhaven-eymzjk.jpg">
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    interface sessionData {
        name: string,
    }

    enum Response {
        Up,
        Down,
        Left,
        Right
    }

    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }

    @Component({
        name: 'Detail',
    })
    export default class Detail extends Vue{
        data: sessionData = {
            name: '',
        }

        created() {
            this.data = JSON.parse(window.sessionStorage.getItem('FromIndex') || '{}')
            // this.data.name = 'Jack'
            // window.sessionStorage.setItem('FromIndex', JSON.stringify(this.data))
            console.log(Response)
            console.log(Direction)
        }
    }
</script>

<style scoped>

</style>
