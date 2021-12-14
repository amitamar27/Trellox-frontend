<template>
  <section class="task-activities">
      <header class="task-header">
		  
          <h3>Activity</h3>
      </header>
      <div class="add-comment">
		  <div>
             <avatar
			 v-if="task.byMember"
				class="user-avatar"
				:size="32"
				:username="task.byMember.fullName"
				:src="task.byMember.imgUrl"
			></avatar>
			</div>
            <main
            :class="border"
            @click="openComment"
          
            >
                <el-input
                	type="textarea"
					class="textarea"
					ref="comment"
					:autosize="{ minRows: 1, maxRows: 20 }"
					@keydown.native.enter.stop.prevent="saveComment"
					placeholder="Write a comment..."
					v-model="comment"
					@blur="closeCommentOpen"
                >
                </el-input>

                
				<div
					v-if="isCommentOpen"
					class="controllers"
					
				>
					<button class="save-btn" @mousedown.prevent="saveComment">
						Save
					</button>
					
				</div>
            </main>
        </div>

      <div class="comment" v-for="comment in task.comments" :key="comment.id">
          <avatar
				class="user-avatar"
				:size="32"
				:username="task.byMember.fullName"
				:src="task.byMember.imgUrl"
			></avatar>

        <div class="comment-container">
			<p>
				<span class="user-fullname"
					>{{ comment.byMember.fullname }} &nbsp</span
				>
				<span class="small-span">{{ comment.createdAt | moment("from") }}</span>
			</p>
            <div class="comment-box">
				{{ comment.txt }}
			</div>
		</div>
      </div>

      <div class="activities" v-for="activity in task.activities" :key="activity.byMember._id">
			<avatar
				class="user-avatar"
				:size="32"
				:username="activity.byMember.username"
				:src="activity.byMember.imgUrl"
			></avatar>
			<span class="user-fullname">
				{{ activity.byMember.fullname }} &nbsp
			</span>
			<span class="small-span">
				{{ activity.txt }}
				{{ activity.createdAt | moment("from") }}
			</span>
	</div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar'
import {utilService} from '../../services/util.service.js'
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            comment: '',
            isCommentOpen: null,
        }
    },
    computed: {
		border() {
			if (this.isCommentOpen) return 'border'
			else return ''
		}
	},
    methods:{
        focusCommentForFile(fileName) {
			this.$refs.comment.focus()
			this.comment += fileName;
		},
        closeCommentOpen() {
			this.isCommentOpen = null;
		},
        openComment(){
            this.isCommentOpen = true;
            this.$refs.comment.focus()
        },
        saveComment(){
            // console.log('this',this.task);
            if(!this.comment) return
            const comment = {
                id: utilService.makeId(),
                txt: this.comment,
                createdAt: Date.now(),
                byMember: {
                    _id: this.task.byMember._id,
					username: this.task.byMember.username,
					fullname: this.task.byMember.fullName,
					imgUrl: this.task.byMember.imgUrl
                }

            }
            this.task.comments ??= []
			this.task.comments.unshift(comment)
            this.closeCommentOpen()
			this.comment = ''
			this.$emit('saveTask', this.task)

			this.$nextTick(() => {
				this.$refs.comment.blur()
			})
        }
        
    },
    components: {
        Avatar,
    }
}
</script>

<style>

</style>