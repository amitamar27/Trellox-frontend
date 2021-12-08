<template>
    <main class="aside-menu">
        <div class="aside-header">
        <h3>Menu</h3>
            <button class="aside-close-btn">
                <img :src="require('@/assets/cancel-icon.png')" />
            </button>
            
        </div>
    </main>
</template>





<script>


export default {
    props:{
        board : Object
    },
    data(){
        return{

        }
    }
}
</script>

