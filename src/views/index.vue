<template>
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

    @Component({
        name: 'index',
        components: {
            OrderList,
            AddOrderList,
            UploadFile,
            Turntable
        }
    })
    export default class Index extends Vue {

        list: any[] = []

        maxSize: object = {
            width: 100,
            height: 100,
        }

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
