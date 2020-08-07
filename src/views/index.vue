<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="index">
        <OrderList titleName="orderListTitle"/>
        <AddOrderList @getName="getName"/>
        <div>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeUpload"
                :file-list="fileList"
                list-type="picture-card">
            </el-upload>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileListNormal"
                :before-upload="beforeUploadNormal"
                list-type="picture-card">
            </el-upload>
        </div>
        <div>
            <UploadFile :isAllowFile="true" :isMultiple="true" />
        </div>
        <Turntable/>
        <el-button type="text" @click="handleOpen">open</el-button>
            <SlotDemo :slotList="listData">
                <template  v-slot:default="{myData: list}">
                    <ul>
                        <li>
                            {{list.name}}
                            <span v-show="list.age > 21">:{{ list.age }}</span>
                        </li>
                    </ul>
                </template>
            </SlotDemo>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Provide} from "vue-property-decorator";
    import OrderList from "@/components/OrderList.vue"
    import AddOrderList from "@/components/AddOrderList.vue"
    import upLoadImg from "@/util/upLoadImg"
    import util from "@/util"
    import UploadFile from "@/components/uploadFile.vue"
    import Turntable from "@/components/Turntable.vue"
    import SlotDemo from "@/components/slotDemo.vue"

    @Component({
        name: 'index',
        components: {
            OrderList,
            AddOrderList,
            UploadFile,
            Turntable,
            SlotDemo,
        }
    })
    export default class Index extends Vue {

        list: any[] = []

        maxSize: object = {
            width: 100,
            height: 100,
        }

        listData: Array<object> = [
            {
                name: 'jack',
                age: 20,
                desc: 'haha',
            },
            {
                name: 'lisa',
                age: 22,
                desc: 'xixi',
            },
            {
                name: 'tom',
                age: 23,
                desc: 'heihei',
            },
            {
                name: 'peter',
                age: 24,
                desc: 'hello',
            }
        ]

        fileList: any[] = []

        fileListNormal: any[] = []

        @Provide('indexList') indexList = this.list

        getName(data: string) {
            console.log('父组件' + data)
        }

        beforeUpload(file: any) {
            return upLoadImg.compressionImg(file, this.maxSize, this.fileList, this)
        }

        beforeUploadNormal(file: any) {
            return upLoadImg.compressionImg(file, {width: 1000, height: 1000}, this.fileListNormal, this)
        }

        handleOpen() {
            let _params = {
                name: 'tom',
            }
            window.sessionStorage.setItem('FromIndex', JSON.stringify(_params))
            let details = this.$router.resolve({
                path: '/Detail',
            })
            util.openUrl(details.href)
        }
    }
</script>

<style scoped lang="less">

</style>
