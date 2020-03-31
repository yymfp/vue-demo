<template>
    <div class="OrderList">
        <ul>
            <li
                v-for="(item, key) in orderList"
                :key="key">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import $eventBus from "@/event-bus";

    @Component({
        name: 'OrderList'
    })
    export default class OrderList extends Vue {

        orderList: any[] = [];

        mounted() {
            $eventBus.$on('addList', (data: any) => {
                this.$set(this, 'orderList', data)
            })
            console.log(this.$attrs.titleName)
        }

    }
</script>

<style scoped>

</style>
