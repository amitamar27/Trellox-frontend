<template>
<main class="task-title">
  <section  v-if="task">

       <span class="icon-card icon-lg">
        </span>
        <main class="task-main-title">
            <el-input
            type="textarea"
            class="textarea"
            v-model="title"
            @change="saveTask"
            ref="input"
            @keydown.native.enter.stop.prevent="saveTask"
            >

            </el-input>
        </main>
        <!-- <a class="icon-md"></a> -->
        <!-- <textarea >

        </textarea> -->
  </section>
  </main>
</template>

<script>
// 
//  
export default {
props:{
    task: {
        type: Object,
        required: true,
    },
},
    data(){
        return {
            title: '',
        }
    },
    created(){
        this.title = this.task.title
    },
    methods: {
        saveTask(){
            this.task.title =  this.title
            this.$emit('saveTask',this.task)
        },
    }

}
</script>

<style>

</style>