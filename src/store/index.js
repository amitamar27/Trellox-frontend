import Vue from "vue";
import Vuex from "vuex";
import { boardService } from "../services/board-service";
Vue.use(Vuex);
import taskDetails from "./task-details.store";
export default new Vuex.Store({
  state: {
    board:null,
    isDarkScreen: false,
    boards: null,
    currTask: null,
    currCardToEdit: null,
    currGroup: null,
  },
  getters: {
    board(state) {
      // const { boardId } = this.$route.params
      console.log('state.board',state.board);
      return state.board;
    },
    groups(state) {
      return state.board.groups;
    },
    isDark(state) {
      return state.isDarkScreen;
    },
    isAddingCardTitle(state) {
      return state.isAddingCardTitle;
    },
    currTask(state) {
      if (!state.currTask) return null
      return JSON.parse(JSON.stringify(state.currTask))
    },
    boards(state){
      console.log('state.boards',state.boards);
    return state.boards
    },
    
    labels(state) {
      return JSON.parse(JSON.stringify(state.board.labels))
    },
    currGroup(state){
      return state.currGroup
    },
    members(state) {
      return JSON.parse(JSON.stringify(state.board.members))
    }
  },

  mutations: {
    setDarkScreen(state) {
      state.isDarkScreen = true;
    },
    closeDarkScreen(state) {
      state.isDarkScreen = false;
    },
    setBoard(state, { board }) {
      // console.log('boardboardboard',board);
      state.board = board;
    },
    updateGroup(state, { updatedGroup }) {
      var index = state.board.groups.findIndex((group) => group.id === updatedGroup.id);
      state.board.groups.splice(index, 1, updatedGroup);
    },
    getGroupById(state, { groupId }) {
      state.currGroup = state.board.groups.find((group) => group.id === groupId);
    },
    getTaskById(state, { groupId, taskId }) {
      const group = state.board.groups.find((group) => group.id === groupId);
      const task = group.tasks.find((task) => task.id === taskId);
      state.currTask = task;
    },
    setBoards(state, { boards }) {
      // console.log('boardsboards',boards);
      state.boards = boards;
    },
    setCardToEdit(state, { card }) {
      state.currCardToEdit = card;
    },
    saveTask(state, { groupId, taskToSave }) {
      const group = state.board.groups.find(group => group.id === groupId)
      const taskIdx = group.tasks.findIndex(task => task.id === taskToSave.id)
      if (taskIdx < 0) return
      group.tasks.splice(taskIdx, 1, taskToSave)
    },
    updateLabels(state, {labels}){
      state.board.labels = labels;
    },
    toggleBoardIsFavorite(state, { isFav }) {
      state.board.isFavorite = isFav
    },
    updateBoard(state, payload) {
      const idx = state.boards.findIndex(board => board.id === payload.board.id)
      state.boards.splice(idx, 1, payload.board)
      state.board = payload.board
    },
    removeTask(state, {groupId,taskId}){
      const group = state.board.groups.find(group => group.id === groupId)
      const taskIdx = group.tasks.findIndex(t => t.id === taskId)
      if (taskIdx < 0) return

      group.tasks.splice(taskIdx, 1)
    },
    addGroup(state, {newGroup}){
      state.board.groups ??= []
      state.board.groups.push(newGroup);
    },
    addTask(state, {newTask , groupId}){
      console.log('newTask',newTask);
      const group = state.board.groups.find(group => group.id === groupId)
      group.tasks.push(newTask)
    },
    removeGroup(state , {groupId}){
      const groupIdx = state.board.groups.findIndex(g => g.id === groupId)
      if (groupIdx < 0) return
      state.board.groups.splice(groupIdx, 1)
    }
  },

  actions: {
    async setBoardById({commit}, {boardId}){
      try {
        const board = await boardService.getBoardById(boardId)
        // console.log('board',board);
        commit({type:'setBoard',board})
      }catch(err){
        console.dir("error",err);
      }
    },
    async loadBoard({ commit }) {
      try {
        var board = await boardService.query();
        commit({
          type: "setBoard",
          board,
        });
      } catch (err) {
        console.log("could not load board", err);
      }
    },
    async setBoard({commit , dispatch},{board}){
      try{
        // dispatch({type: 'saveBoard'})
        var board = await boardService.saveBoard(board)
        // console.log('board',board);
      }catch(err){
        console.log('problem with save board', err);
      }
    },

    async addGroup({commit , dispatch}, { groupTitle }) {
      try {
        // const boards = await boardService.query()
        // var currboard = context.state.board;
        
        const newGroup = await boardService.getNewGroup(groupTitle);
        commit({type: 'addGroup',newGroup})
        dispatch({type: 'saveBoard'})
        // const board = this.getters.board
        // boardService.saveBoard(board)
        // context.commit({type:'setBoard', board})
        // var board = await boardService.addNewGroup(currboard,newGroup,boards);
        
      } catch (err) {
        console.log("could not add group to the board", err);
      }
    },

    async addTask({commit}, { taskTitle ,groupId}) {
      try {
        const newTask = await boardService.setTask(taskTitle);
        commit({type: 'addTask', newTask , groupId})
        const board = this.getters.board
        boardService.saveBoard(board)
      } catch (err) {
        console.log("faild in add task", err);
      }
    },

    // No more use
    async getGroupById({ commit }, { groupDetails }) {
      try {
        // commit({type: 'getGroupById',groupId})

        const group = await boardService.getGroupById(groupDetails);
        return group;
      } catch (err) {
        console.log("faild get group", err);
      }
    },

    // async removeGroup({commit}, {groupDetails}) {
    //   try {
    //     commit({type: 'removeGroup' , groupId })
    //     var board = await boardService.removeGroup(groupDetails);
    //     console.log(board);
    //     commit({ type: 'setBoard', board });
    //     // return board
    //   } catch (err) {
    //     console.log("coldent remove group", err);
    //   }
    // },
    async removeGroup({commit , dispatch}, {groupId}) {
      try {
        commit({type: 'removeGroup' , groupId })
        dispatch({type: 'saveBoard'})
      } catch (err) {
        console.log("coldent remove group", err);
      }
    },

    //need to aproval
    async removeTask(context,payload) {
      try {
        const {taskId, groupId}= payload
        var boardId = context.state.board._id
        var details ={
          taskId,
          groupId,
          boardId
        }
        var board = await boardService.getBoardByTaskId(details);
        context.commit({type:'setBoard', board})
        
      } catch (err) {}
    },
    async loadBoards({ commit }) {
      // var boards = await boardService.queryBoards();
      try {
        console.log('loading boards');
        const boards = await boardService.query();
        // console.log('boards',boards);
        commit({ type: "setBoards", boards });
        return boards
      } catch(err){
        console.dir('error',err)
      }
     
    },
    async getBoardById({ commit }, { boardId }) {  
      try{
        // console.log('boardId',boardId);
        var board = await boardService.getBoardById(boardId);
        console.log('board',board);
        commit({ type: "setBoard", board });
        return board

      }catch(err){
        console.log(err);
      }
    },
    async createNewBoard({commit}, {boardDetails}){
      try{
        var board = await boardService.addNewBoard(boardDetails)
        commit({ type: "setBoard", board });
      }catch(err){
        console.log('faild to add new board', err);
      }
    },
    async saveTask({ commit }, {groupId,taskToSave}) {
    console.log('taskToSave',taskToSave);
      commit({ type: 'saveTask' ,groupId,taskToSave})
      const board = this.getters.board
      await boardService.saveBoard(board)
    },
    async updateBoard({commit},{labels}){
      try {
        commit({type: 'updateLabels',labels})
        const board = this.getters.board
        await boardService.saveBoard(board)
      } catch(err){
        console.log('faild to add new board', err);
      }
      
    },
    async updateBoardBgc({ commit }, { boardId, style }){
      try{
        const saveBgcBoard = await boardService.updateBgcBoard(boardId, style)
        commit({ type: 'updateBoard', board: saveBgcBoard })
        return saveBgcBoard;
      }catch(err){
        console.log('updateBoard in store:', err);
        throw err;
      }
    },
    async removeTask({commit }, payload){
      try{
        commit(payload)
        const board = this.getters.board
        await boardService.saveBoard(board)
      } catch(err){
        console.dir('error',err)
        throw err;
      }
    },
    async saveBoard({state}){
      try {
        boardService.saveBoard(state.board)
      } catch(err){
        console.dir('error',err)
        throw err
      }
    }
  },
  modules: {
    taskDetails,
  },

})
