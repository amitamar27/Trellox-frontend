<template>
  <main class="attachment-menu">
    <h3 class="attach-h">Attachment</h3>
    <label>
      <h5>Computer</h5>
      <input type="file" ref="file" multiple @change="saveToCloud" hidden />
    </label>
  </main>
</template>

<script>
import axios from 'axios'
import { utilService } from '../../services/util.service.js'
export default {
  data() {
    return {
      cloudinary: {
        apiKey: '417696826532455',
        cloudName: 'amitoscloud'
      },
      imgLink: '',
      attachments: [],
      loading: false,
    }
  },
  computed: {
    clURL() {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`
    }
  },
  methods:{
    saveToCloud(){
      this.loading = true
      const formData = new FormData()
			formData.append('file', event.target.files[0])
			formData.append('upload_preset', 'amitoscloud')

      		axios.post(this.clURL, formData)
				.then(res => {
					this.saveAttachments(res.data.secure_url)
				})
				.catch(() => {
          this.loading = false
          console.log('sss');
  			})
      
    },
    saveAttachments(imgLink = null){
      if (imgLink === '') return
      if(imgLink){
        const attachment = {
            id:utilService.makeId(),
            fileName : 'no name',
            createdAt : Date.now(),
            fileUrl : imgLink
        }
        this.attachments.push(attachment)
        console.log('Attachments',this.attachments);
        this.loading = false
      }
      const {taskId , groupId} = this.$route.params
      this.$store.commit({ type: 'addAttachments', attachments: this.attachments, taskId, groupId })

      this.$emit('closeMenu')
      
    }
  }
}
</script>

<style>
</style>