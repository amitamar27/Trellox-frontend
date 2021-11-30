<template>
    <header class="app-header">
        <nav class="nav">

            <!-- router link to -> Home -->
            <router-link to="/">
            <button>
                <img :src="require('@/assets/home.svg')" alt="">
            </button>   
            </router-link>

            <!-- router link to -> Board -->
            <router-link to="/board">
            <button class="board-header-btn">
                <img :src="require('@/assets/boards.svg')" alt="">
                <p>Boards</p>
            </button>   
            </router-link>


      





        </nav>
    </header>
</template>