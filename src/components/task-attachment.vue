<template>
  <section class="task-attachments" >
    <header>
      <img :src="require('@/assets/Attachment-menu.svg')" alt="" />
      <h3>Attachments</h3>
    </header>
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <section
        v-for="(file, idx) in task.attachments"
        class="file-container"
        :key="idx"
      >
        <div class="center-attach" draggable="false">
          <img class="attachImg" :src="file.fileUrl" alt="no img" />
          <div class="file-desc">
            <span class="file-name">{{ file.fileName }} </span>
            <span>
              Added
              {{ file.createdAt | moment("from") }} -
              <span class="clickable underline">Comment</span>
              -
              <span class="clickable underline" @click="removeFile(file)"
                >Delete</span
              >
              
            </span>
            <span class="make-cover clickable" @click="makeCover(file.fileUrl)">
              <img class="cover" />
              <span style="display:block" class="underline">Make cover</span>
            </span>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>


<script>
import attachmentMenu from '../components/task-edit-cmps/attachment-menu.vue'

export default {
  props:{
    task:{
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      editedFileId: null,
    }
  },
  methods: {
    makeCover(fileUrl) {
      if (!this.task) return
      const { groupId } = this.$route.params
      const taskToSave = this.task
      taskToSave.cover ??= {}
      taskToSave.cover.bgUrl = fileUrl
      taskToSave.cover.bgColor = ''
      this.$store.commit({ type: 'saveTask', groupId, taskToSave })
    //   this.$store.dispatch({ type: 'saveBoard' })
    },
    	removeFile(file) {
			const idx = this.task.attachments.findIndex(f => f.id === file.id)
			this.task.attachments.splice(idx, 1)
      this.$emit('saveTask')
			// const { taskId, groupId } = this.$route.params
			// this.$store.commit({ type: "removeFile", groupId, taskId, fileId: file.id })
			// this.$store.dispatch({ type: "saveBoard" })
		},
    getParentPayload(index) {
      return this.task.attachments[index]
    },
  },
  // computed: {
  //   task() {
  //     return this.$store.getters.currTask
  //   }
  // },
  components:{
      attachmentMenu
  }
}
</script>
