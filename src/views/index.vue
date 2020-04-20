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
            <UploadFile fileTypes="*" :isMultiple="true" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Provide} from "vue-property-decorator";
    import OrderList from "@/components/OrderList.vue"
    import AddOrderList from "@/components/AddOrderList.vue"
    import util from "@/util/upLoadImg"
    import UploadFile from "@/components/uploadFile.vue"

    @Component({
        name: 'index',
        components: {
            OrderList,
            AddOrderList,
            UploadFile
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
            return util.compressionImg(file, this.maxSize, this.fileList, this)
        }

        beforeUploadNormal(file: any) {
            return util.compressionImg(file, {width: 1000, height: 1000}, this.fileListNormal, this)
        }
    }
</script>

<style scoped lang="less">

</style>
