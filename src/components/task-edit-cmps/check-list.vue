<template>
  <main class="task-checkList">
		<transition-group
			enter-active-class="animate__animated animate__fadeInRight animate__faster"
			leave-active-class="animate__animated animate__fadeOutRight animate__faster"
		>
			<section
				class="task-todos"
				v-for="(checklist, idx) in taskToSave.checklists"
				:key="checklist.id"
			>
           
				<header class="checkList-header">
						<h3>{{ checklist.title }}</h3>					
					<button @click="removeChecklist(idx)">
						Delete
					</button>
				</header>

				<todos-preview
					:list="checklist"
					@saveChecklist="saveChecklist"
				/>
			</section>
		</transition-group>
	</main>
</template>

<script>
import todosPreview from './todos-preview.vue'
export default {
    props: {
		task:{
            type: Object,
            required: true,
        } 
	},
	computed: {
		taskToSave() {
			return JSON.parse(JSON.stringify(this.task))
            // console.log('saving task');
		}
	},
	methods: {
		saveTask() {
			const { groupId } = this.$route.params
            console.log('groupIdgroupId',groupId);
            var taskk = this.taskToSave
            console.log('taskktaskk',taskk);
			this.$store.dispatch({ type: 'saveTask', groupId, taskToSave: taskk })
		},
		saveChecklist(checklist) {
			const idx = this.taskToSave.checklists.findIndex(l => l.id === checklist.id)
            console.log('idxidxidx',idx);
			if (idx < 0) return
			this.taskToSave.checklists.splice(idx, 1, checklist)

			this.saveTask()
		},
		removeChecklist(idx) {
			if (idx < 0) return
			this.taskToSave.checklists.splice(idx, 1)

			this.saveTask()
		}
	},
	components: {
		todosPreview
	},
}
</script>

<style>
.checkList-header{
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(9,30,66,.0392156862745098);
    color: #172a4d;
    border-radius: 3px;
    padding: 9px 15px;
    border: none;
    cursor: pointer;
    transition: all .2s;
}
</style>