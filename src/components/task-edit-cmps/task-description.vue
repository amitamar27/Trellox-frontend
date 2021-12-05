<template>
  <main class="set-text" v-if="task">
    <!-- <textarea 
      :autosize="{ minRows: 1, maxRows: 20 }"
      name="" id="" cols="30" rows="10"
       placeholder="Add a more detailed description…"></textarea> -->
       
    <el-input
    type="textarea"
    class="textarea"
    placeholder="Add a more detailed description…"
    @change="saveData"
    @focus="setType"
	  @blur="offType"
    v-model="description"
    
    ></el-input>

    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <span v-if="this.isType" class="controls-btns">
        <button class="save-btn" @mousedown="saveData">Save</button>
        <!-- <a class="icon-lg icon-close cancel-btn">
        </a> -->
      </span>
    </transition>
  </main>
</template>

<script>
// :autosize="{ minRows: 1, maxRows: 20 }"
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  data(){
      return {
          description: '',
          isType: false,
      }
  },
  created(){
    this.description = this.task.description
  },
  computed:{
     
  },
  methods: {
      saveData(){
          this.task.description = this.description
          this.$emit('saveTask',this.task)
      },
    setType(){
       this.isType = true
    },
    offType(){
       this.isType = false
    }
  }
};
</script>

<style>
.set-text>.textarea {
    max-width: 100%;
    padding-left: 38px;
    box-sizing: border-box;
    font-family: Segoe UI;
}

.save-btn{
   
    background-color: #055a8c;
    border: none;
    box-shadow: none;
    color: #fff;
    outline: 0;

}

</style>