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
      // console.log(board);
      state.board=board
    },
    updateGroup(state, {updatedGroup}){
      console.log(updatedGroup);
      var index =state.board.groups.findIndex((group) => group.id === updatedGroup.id);
      board.groups.splice(index,1,updatedGroup)
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

    async addGroup({commit}){
      try {
       var board = boardService.query()
       board.groups.push({})
       commit({type:'setBoard', board})
      }catch(err){
        console.log('could not add group to the board', err);
      }
    } ,
    async addTask({commit}, payload){
      try{
        var updatedGroup =boardService.getGroupById('g101'); // payload.groupId
        var task = boardService.makeTask('title')
        updatedGroup.tasks.push(task)
        commit({type:'updateGroup', updatedGroup})

      }catch(err){
        console.log('faild in add task', err);

      }
    }
    
  
  },
  modules: {
  }
})
