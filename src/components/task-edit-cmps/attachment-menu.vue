<template>
  <section class="attachment-menu">
    <!-- <h3 class="attach-h">Attachment</h3> -->
    <header class="main-title">
      <p>Attachment</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>
    <main>
      <!-- <label>
      <h5>Computer</h5>
      <input type="file" ref="file" multiple @change="saveToCloud" hidden />
    </label>
    <h5>
				 Trellox
				<span
					><img
						class="lock"
						:src="require('@/assets/lock.svg')"
						alt=""
				/></span>
			</h5>
			<h5>
				Google Drive
				<span
					><img
						class="lock"
						:src="require('@/assets/lock.svg')"
						alt=""
				/></span>
			</h5>
			<h5>
				Dropbox
				<span
					><img
						class="lock"
						:src="require('@/assets/lock.svg')"
						alt=""
				/></span>
			</h5>
			<h5>
				Box
				<span
					><img
						class="lock"
						:src="require('@/assets/lock.svg')"
						alt=""
				/></span>
			</h5>
			<h5>
				oneDrive
				<span
					><img
						class="lock"
						:src="require('@/assets/lock.svg')"
						alt=""
				/></span>
			</h5> -->
      <div>
        <ul class="pop-over-list">
          <li>
            <a>Computer</a>
            <input
              type="file"
              ref="file"
              multiple
              @change="saveToCloud"
              hidden
            />
          </li>
          <li>
            <a>Trellox</a>
            <span
              ><img class="lock" :src="require('@/assets/lock.svg')" alt=""
            /></span>
          </li>
          <li>
            <a>Google Drive</a>
            <span
              ><img class="lock" :src="require('@/assets/lock.svg')" alt=""
            /></span>
          </li>
          <li>
            <a>Drop Box</a>
            <span
              ><img class="lock" :src="require('@/assets/lock.svg')" alt=""
            /></span>
          </li>
          <li>
            <a>Box</a>
            <span
              ><img class="lock" :src="require('@/assets/lock.svg')" alt=""
            /></span>
          </li>
          <li>
            <a>One Drive</a>
            <span
              ><img class="lock" :src="require('@/assets/lock.svg')" alt=""
            /></span>
          </li>
        </ul>
        <hr />
        <div>
          <label for="addLink">Attach a link</label>
          <el-input v-model="imgLink" placeholder="Paste any link here"></el-input>
          <span class="add-attach" @click="saveAttachments(imgLink)"
            >Attach</span
          >
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import axios from "axios";
import { utilService } from "../../services/util.service.js";
export default {
  data() {
    return {
      cloudinary: {
        apiKey: "417696826532455",
        cloudName: "amitoscloud",
      },
      imgLink: "",
      attachments: [],
      loading: false,
    };
  },
  computed: {
    clURL() {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`;
    },
  },
  methods: {
    saveToCloud() {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "amitoscloud");

      axios
        .post(this.clURL, formData)
        .then((res) => {
          this.saveAttachments(res.data.secure_url);
        })
        .catch(() => {
          this.loading = false;
          console.log("sss");
        });
    },
    saveAttachments(imgLink = null) {
      if (imgLink === "") return;
      if (imgLink) {
        const attachment = {
          id: utilService.makeId(),
          fileName: "no name",
          createdAt: Date.now(),
          fileUrl: imgLink,
        };
        this.attachments.push(attachment);
        console.log("Attachments", this.attachments);
        this.loading = false;
      }
      const { taskId, groupId } = this.$route.params;
      this.$store.commit({
        type: "addAttachments",
        attachments: this.attachments,
        taskId,
        groupId,
      });

      this.$emit("closeMenu");
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style lang="scss">
</style>