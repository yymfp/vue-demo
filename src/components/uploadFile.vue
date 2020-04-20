<template>
    <div class="upload">
        <div
            class="el-upload el-upload--picture-card"
            @click="handleClick">
            <i class="el-icon-plus"></i>
            <input
                :accept="fileTypes"
                :multiple="isMultiple"
                ref="uploadInput"
                @change="handleUpload"
                type="file" />
        </div>
        <div class="fileList">
            <ul>
                <li v-for="(item, index) in files" :key="index">{{item.name}}</li>
            </ul>
        </div>
        <div class="pictureCard">
            <ul class="el-upload-list el-upload-list--picture-card">
                <li
                    class="el-upload-list__item is-success"
                    v-for="(item, index) in pictures"
                    :key="index">
                    <HoverMask
                        class="hoverMask"
                        :pictureFile="item"
                        @handleDelete="handleDelete"
                        @handleShow="handleShow">
                        <img :src="item.url" width="100%" height="100%" />
                    </HoverMask>
                </li>
            </ul>
        </div>
        <el-dialog
            :visible.sync="imgDialog"
            :append-to-body="true"
            width="40%"
            :close-on-press-escape="false">
            <img
                width="100%"
                :src="showImgUrl"
                alt="">
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HoverMask from "@/components/HoverMask.vue"

    @Component({
        name: "uploadFile",
        components: {
            HoverMask,
        }
    })
    export default class uploadFile extends Vue {
        $refs!: {
            uploadInput: any,
        }

        @Prop({default: 'image/*'})
        fileTypes!: string

        @Prop({default: false})
        isMultiple!: boolean

        pictures: Array<object> = []

        files: Array<object> = []

        imgDialog: boolean = false

        showImgUrl: string = ''

        handleClick() {
            this.$refs['uploadInput'].click()
        }

        handleUpload() {
            const FileList = [...this.$refs['uploadInput'].files]
            console.log(FileList)
            if (FileList.length > 0) {
                FileList.forEach(item => {
                    item.url = URL.createObjectURL(item)
                    if (item.type.includes('image/')) {
                        this.pictures.push(item)
                    } else {
                        this.files.push(item)
                    }
                })
                // 处理上传相同文件的问题
                this.$refs['uploadInput'].value = ''
            }
        }

        handleDelete(picture: any) {
            let sequence = -1
            sequence = this.pictures.findIndex((item: any) => item === picture)
            if (sequence !== -1) {
                this.pictures.splice(sequence, 1)
            }
        }

        handleShow(picture: any) {
            this.imgDialog = true
            this.showImgUrl = picture.url
        }

    }
</script>

<style scoped lang="less">
    .upload {
        width: 100%;
        .hoverMask {
            width: 100%;
            height: 100%;
        }
        input[type=file] {
            opacity: 0;
            position: relative;
            top: -153px;
        }
        .fileList {
            width: 50%;
            text-align: left;
        }
        .pictureCard {
            width: 50%;
            text-align: left;
        }
    }
</style>
