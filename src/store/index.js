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
    // members() {
		// 	return this.$store.getters.members
		// },
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
    },
    groupIdByTaskId(state) {
      return state.groupIdByTaskId
  },
  },

  mutations: {
    setDarkScreen(state) {
      state.isDarkScreen = true;
    },
    closeDarkScreen(state) {
      state.isDarkScreen = false;
    },
    setBoard(state, { board }) {
      console.log('boardboardboard',board);
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
    // updateBoard(state, payload) {
    //   const idx = state.boards.findIndex(board => board.id === payload.board.id)
    //   state.boards.splice(idx, 1, payload.board)
    //   state.board = payload.board
    // },
    removeTask(state, {groupId,taskId}){
      const group = state.board.groups.find(g => g.id === groupId)
      const taskIdx = group.tasks.findIndex(t => t.id === taskId)
      if (taskIdx < 0) return

      group.tasks.splice(taskIdx, 1)
    },
    getGroupIdByTaskId(state, { taskId }) {
      const groups = state.board.groups
      groups.forEach(g => {
          const task = g.tasks?.find(t => t.id === taskId)
          if (task) {
              state.groupIdByTaskId = g.id
              return
          }
      })
  },
  },

  actions: {
    async setBoardById({commit}, {boardId}){
      try {
        const board = await boardService.getBoardById(boardId)
        console.log('board',board);
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
    async setBoard({commit},{board}){
      try{
        var board = await boardService.saveBoard(board)
        console.log('board',board);
      }catch(err){
        console.log('problem with save board', err);
      }
    },

    async addGroup(context, { groupTitle }) {
      try {
        const boards =await boardService.queryBoards()
        var currboard = context.state.board;
        var newGroup = await boardService.getNewGroup(groupTitle);
        var board =await boardService.addNewGroup(currboard,newGroup,boards);
        context.commit({type:'setBoard', board})
      } catch (err) {
        console.log("could not add group to the board", err);
      }
    },

    async addTask(context, { task }) {
      try {
        var addedTask = await boardService.setTask(task.title);
        const taskDetails= {
          task:addedTask,
          groupId:task.groupId
        }
        var currBoard=context.state.board
        var board = await boardService.addTask(taskDetails,currBoard);
         context.commit({ type: "setBoard", board });
      } catch (err) {
        console.log("faild in add task", err);
      }
    },

    async getGroupById({ commit }, { groupDetails }) {
      try {
        // commit({type: 'getGroupById',groupId})

        const group = await boardService.getGroupById(groupDetails);
        return group;
      } catch (err) {
        console.log("faild get group", err);
      }
    },

    async removeGroup({commit}, {groupDetails}) {
      try {
        var board = await boardService.removeGroup(groupDetails);
        console.log(board);
        commit({ type: 'setBoard', board });
        return board
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
      var boards = await boardService.queryBoards();
      commit({ type: "setBoards", boards });
    },
    async getBoardById({ commit }, { boardId }) {  
      try{
        var board = await boardService.getBoardById(boardId);
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
  },
  modules: {
    taskDetails,
  },

})
