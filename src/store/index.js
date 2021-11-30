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
      console.log(board);
      state.board=board
    }
    
  },
  actions: {
    loadBoard({commit}){
     var board= boardService.query()
     commit({type:'setBoard',board})
    }
  
  },
  modules: {
  }
})
