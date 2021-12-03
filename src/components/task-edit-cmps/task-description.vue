<template>
  <main class="set-text">
    <!-- <textarea 
      :autosize="{ minRows: 1, maxRows: 20 }"
      name="" id="" cols="30" rows="10"
       placeholder="Add a more detailed description…"></textarea> -->
    <el-input
    type="textarea"
    class="textarea"
    :autosize="{ minRows: 1, maxRows: 20 }"
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
        <a class="icon-lg icon-close">
          <!-- <img :src="require('@/assets/cancel-icon.png')" /> -->
          
        </a>
      </span>
    </transition>
  </main>
</template>

<script>

export default {
  props: {
    task: Object,
  },
  data(){
      return {
          description: '',
          isType: false,
      }
  },
  computed:{
     
  },
  methods: {
      saveData(){
          this.task.description = this.description
			
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
}
.el-textarea {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
}
.set-text>.textarea textarea {
    display: block;
    background-color: rgba(9,30,66,.04);
    border-radius: 3px;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 56px!important;
    box-sizing: border-box;
    font-size: 15px;
    padding: 8px;
    margin-bottom: 5px;
    text-decoration: none;
    color: #172a4d;
    transition: all .2s;
    resize: none;
}
/* .controls-btns{
     clear: both;
    display: flex;
    flex-direction: row;
    margin-top: 8px; 
} */

</style>