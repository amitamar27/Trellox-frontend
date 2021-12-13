<template >
  <div v-if="board" class="board-container">
    <board-header :board="board" @editBgcBoard="editBgcBoard" />

    <group-list
      @dragEnd="dragEnd"
      @pickTask="pickTask"
      :board="board"
      v-if="board"
      
    ></group-list>
    <router-view />
  </div>
</template>

<script>
import groupList from "../components/group-list.vue";
import taskEdit from './task-edit.vue';
import boardHeader from '../components/board-header.vue';
import { socketService,SOCKET_EMIT_BOARD_WATCH, SOCKET_EVENT_BOARD_UPDATED,SOCKET_ON_BOARD_UPDATE , SOCKET_EMIT_BOARD_UPDATE } from "../services/socket.service.js"
export default {
  data() {
    return {
      boardId: '',
      currBoard:null,
    }
  },
  watch: {
    '$route.params.boardId': {
     async handler() {
        const { boardId } = this.$route.params;
        try {
           const currBoard = await this.$store.dispatch({type: "loadBoard",boardId});
           this.currBoard = currBoard
           this.$emit('setBg',this.currBoard.style.bgImg)
          console.log('this.boardId !!!!',boardId);
          // socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId);
          socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId);
        } catch(err){
          console.log("ERROR: cannot get board",err);
        }
				
        // console.log('boardId',boardId);
      },
      immediate: true,
      deep: true,
    }
  },
   created() {
    this.boardId = this.$route.params.boardId;
    //  this.loadBoard()
  },
  	destroyed() {
		// socketService.off(SOCKET_EVENT_BOARD_UPDATED)
		// socketService.off('user-watch-task')
		// socketService.off('add-msg')
		// socketService.terminate()
	},
  computed: {
    board() {
       const b = this.$store.getters.board;
       console.log('board.vue', b);
       return b
    },
    getStyle() {
      // console.log('this.board',this.board);
      if (this.board.style.backgroundSrc) {
        const url = this.board.style.backgroundSrc
        // console.log('url',url);
        return { 'background-image': `url(${url})` }
      }
      else {
        const backgroundColor = this.board.style.backgroundColor
        return { backgroundColor: `${backgroundColor}` }
      }
    }
  },
  methods: {
    async setup() {
			const { boardId } = this.$route.params
			if (!boardId) return
      // await this.loadBoard(boardId)
			await socketService.setup()
			

			// SOCKETS
			// socketService.emit('register-board', boardId)
			socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.loadBoard)
			socketService.on('add-msg', () => {
				this.$store.commit({ type: 'updateChatUnreadMsgs', action: 'increase' })
				// this.$store.dispatch({type: 'updateUSer'})
			})
			socketService.on('user-watch-task', ({ taskId, taskTitle, userId }) => {
				this.$store.commit({ type: 'setNoti', mode: true })
				if (userId !== this.$store.getters.loggedinUser?._id) return
				this.$store.commit({ type: 'setMsgTime', time: 4500 })
				this.$store.commit({ type: 'setMsgTxt', txt: `You have been tagged in ${taskTitle}!` })
				this.$store.dispatch({ type: 'activeMsg' })
			})
		},
    
	// 	toggleChat() {
	// 		this.isChatOpen = !this.isChatOpen
	// 	}
	// },
    pickTask() {
      // console.log(this.board);
    },
    dragEnd() {
      this.$store.dispatch({ type: 'saveBoard'})
    },
    async editBgcBoard(style) {
      try {
        await this.$store.dispatch({ type: 'updateBoardBgc', boardId: this.boardId, style: style })
        this.$emit('setBg',style.bgImg)
      } catch (err) {
        console.log('Error in updateBoard (board-header):', err);
        throw err;
      }

    },
    async loadBoard(){
      const { boardId } = this.$route.params;
      try{
        const board = await this.$store.dispatch({type:'getBoardById',boardId})
        // console.log('board by id',board);
        await socketService.on(SOCKET_ON_BOARD_UPDATE, board => {
          console.log('socket board',board);
        })
        this.currBoard = board
        // console.log('this.currBoard',this.currBoard);
        this.$emit('setBg',this.currBoard.style.bgImg)
        return board
      }catch(err){
        console.log('Error in loadboard :', err);
        throw err;
      }
    }



  },

  components: {
    groupList,
    taskEdit,
    boardHeader
  },
};
</script>

<style>
/* .scroller::-webkit-scrollbar {
  height: 15px;
  width: 12px;
}

.scroller::-webkit-scrollbar-track {
  
  background: rgba(9, 30, 66, 0.08);
  border-radius: 20px;
}

.scroller::-webkit-scrollbar-button {
  height: 4px;
  width: 4px;
}

.scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.425);
  border-radius: 20px;
} */
</style>