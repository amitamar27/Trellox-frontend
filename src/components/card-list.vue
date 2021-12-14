<template>
  <div class="cards-container">
    <!-- <div>task : {{task}}</div> -->
    <div class="draggable-groups">
      <draggable
        :emptyInsertThreshold="100"
        class="draggable-groups"
        data-dragscroll
        :list="group.tasks"
        @end="dragEnd"
        group="tasks"
      >
        <transition-group type="transition" name="flip">

          <card-preview
            :boardLabels="boardLabels"
            :group="group"
            v-for="task in tasks"
            :task="task"
            :key="task.id"
            :groupId="groupId"
            @click="openCardDetails(groupId, task.id)"
          ></card-preview>
          
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import cardPreview from './card-preview.vue'
import draggable from "vuedraggable";

export default {
  props: {
    tasks: {
      type: Array,
      required: false,
    },
    groupId: {
      type: String,
      required: true
    },
    groups: {
      // type:String,
      // required:true
    },
    group: {
      type: Object
    },
    boardLabels: {
      type: Array,
    },
  },

  data() {
    return {
      boardId: ''
    }
  },
  components: {
    cardPreview,
    draggable

  },
  computed: {
  },

  methods: {
    openCardDetails(groupId, taskId) {
      // const { boardId } = this.$route.params
      
      // this.$store.commit({ type: "openBlack" })
  
      this.$router
        .push("/details/" + groupId + "/" + taskId)
        .catch((err) => { console.log('error'); })

    },
    dragEnd() {
      this.$emit('dragEnd')
    }


  },
  created() {
    this.boardId = this.$route.params.boardId;
    // console.log('in card list',this.boardId);
  },
  

}
</script>

<style>
</style>