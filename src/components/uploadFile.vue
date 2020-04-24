<template>
    <div class="upload">
        <div
            class="uploadClick"
            @click="handleClick">
            <i class="el-icon-plus"></i>
            <input
                class="displayNone"
                :accept="fileType"
                :multiple="isMultiple"
                ref="uploadInput"
                @change="changeUpload"
                type="file" />
        </div>
        <div class="fileList">
            <ul>
                <li
                    v-for="(item, index) in files"
                    @click="handleDownload(item)"
                    :key="index">
                    <span>{{item.name}}</span>
                    <i
                        class="el-icon-delete"
                        @click="handleDelete(item, files)"></i>
                </li>
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
                        :pictureFileList="pictures"
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
    import {Vue, Component, Prop, Watch} from "vue-property-decorator"
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

        @Prop({default: ''}) value!: any

        @Prop({default: false}) isAllowFile!: boolean      // 是否允许文件

        @Prop({default: false}) isMultiple!: boolean        // 是否多选

        @Prop({default: 5}) size!: number                  // 文件大小

        @Prop({default: false}) multi!: boolean         // 是否为多张图片

        @Prop({default: 1}) limit!: number              // 默认只能上传一张图片

        @Prop({default: false}) isSingleArray!: boolean   // 绑定的v-model是否是数组结构

        @Prop({default: ''}) nameKey!: string       // 需要文件名时的name字段

        @Prop({default: ''}) urlKey!: string         // 需要文件名时的url字段

        pictures: Array<object> = []

        files: Array<object> = []

        imgDialog: boolean = false

        showImgUrl: string = ''

        get fileType() {
            return this.isAllowFile ? '*' : 'image/*'
        }

        @Watch('value', {immediate: true, deep: true})
        updateValue () {
            if (!this.value) {
                return
            }
            let list:any[] = []
            if (this.multi) {
                if (this.urlKey) {
                    if (this.nameKey) {
                        list = this.value.map((item: any) => ({
                            name: item[this.nameKey],
                            url: item[this.urlKey],
                        }))
                    } else {
                        list = this.value.map((item: any) => ({
                            url: item[this.urlKey],
                        }))
                    }

                } else {
                    list = this.value.map((item: any) => ({url: item}))
                }
            } else if (this.value) {
                if (this.urlKey) {
                    if (this.nameKey) {
                        if (this.isSingleArray) {
                            list = [{
                                name: this.value.length ? this.value[0][this.nameKey] : '',
                                url: this.value.length ? this.value[0][this.urlKey] : '',
                            }]
                        } else {
                            list = [{
                                name: this.value[this.nameKey],
                                url: this.value[this.urlKey],
                            }]
                        }
                    }
                } else {
                    if (this.isSingleArray) {
                        list = [{
                            url: this.value.length ? this.value[0] : '',
                        }]
                    } else {
                        list = [{
                            url: this.value,
                        }]
                    }
                }
            }

            // 区分文件和图片展示
            if (this.isAllowFile) {
                let reg = /^(\s|\S)+\.(gif|GIF|png|PNG|jpg|JPG|jpeg|JPEG|wbmp|WBMP)+$/
                list.forEach((item: any) => {
                    if (reg.test(item.url)) {
                        this.pictures.push(item)
                    } else {
                        this.files.push(item)
                    }
                })
            } else {
                this.pictures = list
            }
        }

        handleClick() {
            this.$refs['uploadInput'].dispatchEvent(new MouseEvent('click'))
        }

        changeUpload() {
            const FileList = [...this.$refs['uploadInput'].files]
            console.log(FileList)
            if (FileList.length > 0) {
                for (let i = 0; i < FileList.length; i++) {
                    let item = FileList[i]
                    if (item.size / 1048576 <= this.size) {
                        item.url = URL.createObjectURL(item)
                        if (item.type.includes('image/')) {
                            this.pictures.push(item)
                        } else {
                            this.files.push(item)
                        }
                    } else {
                        return this.$message.error('File is oversized.')
                    }
                }
                // 处理上传相同文件的问题
                this.$refs['uploadInput'].value = ''
            }
        }

        handleDelete(file: any, fileList: any) {
            let sequence = -1
            sequence = fileList.findIndex((item: any) => item === file)
            if (sequence !== -1) {
                fileList.splice(sequence, 1)
            }
        }

        handleShow(picture: any) {
            this.imgDialog = true
            this.showImgUrl = picture.url
        }

        handleDownload(file: any) {
            // this.downloadOssFile(file.url, file.name, this)
        }

    }
</script>

<style scoped lang="less">
    .upload {
        width: 100%;
        .uploadClick {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            vertical-align: top;

            i {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                font-size: 28px;
                color: #8c939d;
            }
        }
        .uploadClick:hover {
            border-color: rgb(87, 158, 248);
        }
        .hoverMask {
            width: 100%;
            height: 100%;
        }
        input[type=file] {
            position: relative;
            top: -153px;
        }
        .fileList {
            text-align: left;
            max-width: 30%;
            li {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
                display: inline-block;
                span {
                    cursor: pointer;
                }
                span:hover {
                    color: rgb(87, 158, 248);
                }
            }
            .el-icon-delete {
                margin-left: 5px;
                cursor: pointer;
            }
            .el-icon-delete:hover {
                color: red;
            }
        }
        .pictureCard {
            width: 50%;
            text-align: left;
        }
    }
</style>
