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
        
    
</main>    
</template>

<script>
export default {
data(){
    return {
        options: [
				{ icon: '', title: 'Members', },
				{ icon: '', title: 'Labels', },
				{ icon: '', title: 'Checklist', },
				{ icon: '', title: 'Dates', },
				{ icon: '', title: 'Attachment', },
				{ icon: '', title: 'Cover', },
			],
            menuIdx: null,
    }
},
methods:{
    setClass(idx){
        const style = 'icon-sm icon-'  + this.options[idx].title
        return style
        // return 
    }
}
}
</script>

<style>



</style>