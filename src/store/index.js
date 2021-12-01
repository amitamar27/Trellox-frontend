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
        var board= await boardService.query()
        console.log('boardd',board);
        commit({type:'setBoard',board})
      }catch(err){
        console.log('could not load board', err);
      }
    },

    async addGroup({commit}, {groupTitle}){
      console.log(groupTitle);
      try {
       var board = await boardService.query()
       var group = await boardService.getNewGroup(groupTitle)
       board.groups.push(group)
       console.log(board.groups);
       commit({type:'setBoard', board})
       
      }catch(err){
        console.log('could not add group to the board', err);
      }
    } ,
    async addTask({commit}, {task}){
      try{
        var updatedGroup =await boardService.getGroupById(task.groupId); 
        var addedTask = await boardService.makeTask(task.taskTitle)
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
