<template>
  <div class="boards-page-container">
      <div class="boards">
          <div class="nav-side">
              <h1>side nav</h1>
         </div>
          <div class="board-boards">
              <div class="boards-list-header">
                  <i class="el-icon-user"></i>
              <h1> boards</h1>
              </div>
          <div class="boards-container">
              <div v-for="board in boards" :key="board.id">
                  <div class="boards-list"  @click="setBoard(board._id)">
                  <p>{{board.title}}</p>
                  <p>{{board._id}}</p>
                  </div>
              </div>
          <div @click="setNewBoard" class="boards-list">
              <p>create new board</p>
        </div>
          </div>
          </div>

      </div>
  </div>
</template>

<script>

export default ({
    data() {
        return {

        }
        
    },
    computed:{
        boards(){
            return this.$store.getters.boards
        }
    },
    methods:{
        setNewBoard(){
            console.log('hey creating new board');
            this.$router.push('/board')
        },
        setBoard(boardId){
            this.$router.push(`/board/${boardId}`)
        }
    }
})
</script>
