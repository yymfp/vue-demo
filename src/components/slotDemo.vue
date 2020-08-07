<template>
    <div>
        <template v-for="scope in slotList">
            <slot :myData="scope">
            </slot>
        </template>
    </div>
</template>

<script lang="ts">
    import {Vue, Prop, Component, Provide} from "vue-property-decorator";

    @Component({
        name: 'slotDemo'
    })
    export default class slotDemo extends Vue{
        @Prop({default: ''}) slotList!: any

        childrenData: any = {
            name: 'my children'
        }
    }
</script>

<style scoped>

</style>
