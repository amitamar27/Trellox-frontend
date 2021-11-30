<template>

<div class="group-list-container">
    <div class="group-list">
        <h2>son: group-list</h2>
        <group-preview></group-preview>
    </div>
</div>




  
</template>

<script>
import groupPreview from './group-preview.vue'
export default {
components:{
    groupPreview,
},

}
</script>

<style>
.group-list-container {
    overflow-x: auto;
}
</style>