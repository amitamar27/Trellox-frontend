<template>
  <section class="attachment-menu">
    <!-- <h3 class="attach-h">Attachment</h3> -->
    <header class="main-title">
      <p>Attachment</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>
    <main>
      <div>
        <ul class="pop-over-list">
          <li>
            <!-- <a for="file">Computer</a> -->
            <label for="file">Computer</label>
            <input
              type="file"
              ref="file"
              id="file"
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
          <el-input
            v-model="imgLink"
            placeholder="Paste any link here"
          ></el-input>
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
        apiKey: "657612331553388",
        cloudName: "dnmyqfcjm",
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
      // const formData = new File();
      console.log("attach");
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "lmfle9ek");
      console.log("formData", formData);

      // this.saveAttachments(res.data.secure_url);
      axios
        .post(this.clURL, formData)
        .then((res) => {
          console.log(res, "res");
          this.saveAttachments(res.data.secure_url);
        })
        .catch(() => {
          this.loading = false;
          console.log("sss");
        });
    },
    saveAttachments(imgLink = null) {
      // console.log('imgLink',imgLink);
      // return
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