<template>
    <div class="hoverMask">
        <slot/>
        <span class="mask">
            <i
                @click="handleShow"
                class="el-icon-zoom-in"/>
            <i
                @click="handleDelete"
                class="el-icon-delete" />
        </span>
    </div>
</template>

<script lang="ts">
    import {
        Vue, Component, Prop, Mixins, PropSync, Watch,
    } from 'vue-property-decorator'

    @Component
    export default class HoverMask extends Vue {
        @Prop({default: ''}) pictureFile!: any // 需要操作的图片

        handleShow() {
            this.$emit('handleShow', this.pictureFile)
        }

        handleDelete() {
            this.$emit('handleDelete', this.pictureFile)
        }
    }
</script>

<style scoped lang="less">
    .hoverMask {
        overflow: hidden;
        position: relative;
        line-height: 1;
        background-color: #fff;
        border-radius: 6px;
        box-sizing: border-box;
        display: inline-block;
        font-size: 0;
        vertical-align: middle;
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.4);
        transition: opacity 0.3s;
    }

    .mask:hover {
        opacity: 1;
    }

    .el-icon-zoom-in, .el-icon-delete {
        position: relative;
        padding: 10px;
        top: 35%;
    }
</style>
