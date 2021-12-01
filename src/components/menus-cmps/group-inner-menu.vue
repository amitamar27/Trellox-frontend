<template>
    <section class="group-inner-menu" @click.stop="">
		<div>
			<h5 @click="addCard">Add card...</h5>
			<h5>Sort by</h5>
			<h5 @click="removeGroup">Delete this list</h5>
            <!-- <p>{{groupId}}</p> -->
		</div>
	</section>
</template>


<script>


export default {
    name:'group-inner-menu',
    props:{
        groupId:String
    },
    methods:{
        addCard(){
            // todo emit
            console.log('need add card');
        },
        removeGroup(){
            //todo dispatch
            console.log('need remove');
        }
    }

}
</script>
