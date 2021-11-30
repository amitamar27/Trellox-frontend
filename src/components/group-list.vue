<template>

<div class="group-list-container">
    <div class="group-list">
        <!-- <h2>son: group-list</h2> -->
        <!-- <p>{{board.groups[0]}}</p> -->

        <group-preview 
        v-for="group in board.groups"
        :group="group"
        :key="group.id"
        ></group-preview>
    </div>
</div>




  
</template>

<script>
import groupPreview from './group-preview.vue'
export default {
    props: {
        board: {
            type: Object,
            required: true,
        }
    },
components:{
    groupPreview,
},
// v-for="group in board.groups"
}
</script>

<style>
.group-list-container {
    overflow-x: auto;
}
</style>