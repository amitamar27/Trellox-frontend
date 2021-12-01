import Vue from 'vue'
import Vuex from 'vuex'
import {boardService} from '../services/board-service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board:null

  },
  getters:{
    board(state){
      return state.board
    }

  },
  mutations: {
    setBoard(state, {board}){
      console.log('board',board);
      state.board=board
    },
    updateGroup(state, {updatedGroup}){
      var index = state.board.groups.findIndex((group) => group.id === updatedGroup.id);
      state.board.groups.splice(index,1,updatedGroup)
      console.log(state.board);
    }
    
  },
  actions: {
   async loadBoard({commit}){
      try{
        var board= boardService.query()
        commit({type:'setBoard',board})
      }catch(err){
        console.log('could not load board', err);
      }
    },

    async addGroup({commit}, payload){
      try {
       var board = boardService.query()
       var group = boardService.getNewGroup(payload.title)
       board.groups.push(group)
       commit({type:'setBoard', board})
      }catch(err){
        console.log('could not add group to the board', err);
      }
    } ,
    async addTask({commit}, {task}){
      try{
        var updatedGroup =boardService.getGroupById(task.groupId); 
        var addedTask = boardService.makeTask(task.taskTitle)
        updatedGroup.tasks.push(addedTask)
        commit({type:'updateGroup', updatedGroup})

      }catch(err){
        console.log('faild in add task', err);

      }
    }
    
  
  },
  modules: {
  }
})
