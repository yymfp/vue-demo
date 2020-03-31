<template>
    <div class="AddOrderList">
        <el-button type="primary" @click="handleAdd">
            Add
        </el-button>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Inject} from "vue-property-decorator";
    import $eventBus from "@/event-bus";

    @Component({
        name: 'AddOrderList'
    })
    export default class AddOrderList extends Vue {

        orderList: any[] = [];
        count: number = 0;

        @Inject('indexList')  indexList: any

        mounted() {
            console.log(this.indexList)
            this.$emit('getName', '子组件的数据')
        }

        handleAdd() {
            $eventBus.$emit('addList', this.orderList.push(this.count++))
        }
    }
</script>

<style scoped>

</style>
