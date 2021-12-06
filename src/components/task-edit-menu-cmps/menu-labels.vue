<template>
  <section v-if="labels">
    <header class="main-title">
      <p>Labels</p>
      <a class="icon-sm icon-close " @click="closeMenu"></a>
    </header>

    <main v-if="!isInEdit" class="labels-menu">
      <!-- <section class="labels-input"> -->
      <el-input class="input"  v-model="filter"></el-input>
      <h5 class="h-title">LABELS</h5>
      <!-- </section> -->

      <section v-if="!filter">
        <div v-for="(color, idx) in colors" :key="idx" >
          <div
            class="edit-labels mod-selectable task-labels"
            :style="`background-color: ${color}`"
            @click="addLabel(idx)"
          >
            <p v-if="labelsId(idx)">{{labels[idx].title}}</p>
          <span v-if="labelsId(idx)" class="icon-check icon-sm"></span>
          </div>
          <a class="task-label-edit icon-sm icon-edit" @click="goInMenu(idx)"></a>
        </div>
      </section>

      <section v-else>
          <div v-for="(color, idx) in colors" :key="idx" >
          <div
          
            v-if="color"
            class="edit-labels mod-selectable task-labels"
            :style="`background-color: ${color}`"
          >
            <p v-if="labelsId(idx)">{{labels[idx].title}}</p>
          
          </div>
          <a class="task-label-edit icon-sm icon-edit" @click="goInMenu(idx)"></a>
        </div>
      </section>
    </main>
    <section v-else class="edit-label">
			<a v-if="isInEdit" class="icon-sm icon-back" @click="goBack">
				
		</a>
			<h5 class="h-title">Name</h5>
			<el-input
				ref="input"
				type="text"
				placeholder="Set label..."
				v-model="currLabel.title"
				@keydown.enter="saveLabel"
			/>
		</section>
  </section>
</template>

<script>
import { utilService } from "../../services/util.service.js";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
      ],
      labels: [],
      currLabel:null,
      currTitle: '',
      isInEdit: false,
      isFiltering: false,
      filter: '',
    };
  },
  created() {
    // this.labels = this.$emit("labels");
    // console.log("this.labels", this.labels);
    this.currLabels();
  },
  computed: {
      isFilter(){

      },
  },
  methods: {
    currLabels() {
      const labels = this.$store.getters.labels;
      console.log("labels", labels);
      const newLabels = [];
      labels.forEach((label) => {
        if (this.task.labelIds.includes(label.id)) this.labels.push(label);
      });
      //   this.labels= newLabels
      console.log("this.labels", this.labels);
     
    },
    labelsId(idx){
   
        if(!this.labels[idx]) return
        if(this.colors[idx] === this.labels[idx].color) return true
    },
    setLabel(idx){
        this.currLabel = labels[idx]
    },
    goInMenu(idx){
        this.currLabel = this.labels[idx]
        this.isInEdit = true;
    },
    saveLabel(){
        console.log('labels 1 ');
        this.$emit('saveLabels',this.labels)
    },
    goBack(){
        this.isInEdit = false;
    },
    closeMenu(){
        this.$emit('closeMenu')
    },
    addLabel(idx){
        if(this.labels.find((label) => label.color === this.colors[idx])
        
        ) return
          const labelId = {
            id: 'l10'+(idx+1)
        }
        const id = 'l10'+(idx+1)
        this.task.labelIds.push(id)
        // const label = {

        // }
        this.currLabels()
        console.log('this.labels',this.labels);
        console.log('labelId',labelId);

        this.$emit('addLabel',labelId)
        
    }
  },
  
};
</script>

<style >
</style>
