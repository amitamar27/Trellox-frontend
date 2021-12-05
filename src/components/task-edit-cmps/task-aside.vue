<template>
<main >
    <aside>
        <h3 class="head-lines">Add to card</h3>
    </aside>

   
        <a class="button-link" v-for="(option,idx) in options" :key="idx" @click="showMenu(idx)">
            <span :class="setClass(idx)">
            </span>
            <span>{{option.title}}</span>
        </a>
        <transition
        v-if="menuIdx"
        enter-active-class="animate__animated animate__fadeInRight animate__faster"
		leave-active-class="animate__animated animate__fadeOutRight animate__faster"
        >
        <menu-labels v-if="menuIdx === 0" @closeMenu="closeMenu" :task="task"></menu-labels>
        </transition>
        <!-- <component
            v-clickoutside="closeEditPopup"
            class="popup dynamic-component"
            v-if="isPopupShow"
            :is="currAction.type"
            :card="card"
            :action="currAction"
            @close="closeEditPopup"
            @updateCard="saveCard"
          /> -->
           <component
            @click="showMenu(idx)"
            class="popup dynamic-component"
            :is="currComponent"
            :task="this.task"
            @close="closeMenu"
            @updateCard="saveCard"
          />
         

         

    
</main>    
</template>

<script>
// import { component } from 'vue/types/umd'
import menuLabels from '../task-edit-menu-cmps/menu-labels.vue'
export default {
    props:{
        task:{
            type: Object,
            required: true,
        }
    },
data(){
    return {
        options: [
				{ icon: '', title: 'Members', },
				{ icon: '', title: 'Labels',component: 'menu-labels' },
				{ icon: '', title: 'Checklist', },
				{ icon: '', title: 'Dates', },
				{ icon: '', title: 'Attachment', },
				{ icon: '', title: 'Cover', },
			],
            menuIdx: null,
            isMenuOpen: false,
            currComponent: '',
    }
},
methods:{
    setClass(idx){
        const style = 'icon-sm icon-'  + this.options[idx].title
        return style
        // return 
    },
    openMenu(idx) {
		this.open = idx
	},
    showMenu(idx){
        this.isMenuOpen = true;
        this.menuIdx = idx;
        this.currComponent = this.options[idx].component
    },
    closeMenu(){
        this.isMenuOpen = false;
    },
},
computed:{
    // task(){
    //     return this.task
    // }
},
components:{
    menuLabels,
    
}
}
</script>

<style>



</style>