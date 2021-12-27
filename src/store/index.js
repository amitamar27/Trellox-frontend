import Vue from "vue";
import Vuex from "vuex";
import { boardService } from "../services/board-service";
// import { SOCKET_ON_BOARD_UPDATE } from '../services/socket.service'
import { socketService, SOCKET_EVENT_BOARD_UPDATED,SOCKET_ON_BOARD_UPDATE , SOCKET_EMIT_BOARD_UPDATE } from "../services/socket.service.js"
// import {userService} from "../services/user-service";
Vue.use(Vuex);
import userStore from "./user";
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
      socketService.on(SOCKET_ON_BOARD_UPDATE, board => {
        state.board = board
      })
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
    setBoardStyle(state, { boardStyle }) {
      state.board.style = boardStyle
    },
    // updateBoard(state, payload) {
    //   const idx = state.boards.findIndex(board => board.id === payload.board.id)
    //   state.boards.splice(idx, 1, payload.board)
    //   state.board = payload.board
    // },
    removeTask(state, {groupId,taskId}){
      const group = state.board.groups.find(group => group.id === groupId)
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
    addGroup(state, {newGroup}){
      state.board.groups ??= []
      state.board.groups.push(newGroup);
    },
    addTask(state, {newTask , groupId}){
      const group = state.board.groups.find(group => group.id === groupId)
      group.tasks.push(newTask)
    },
    removeGroup(state , {groupId}){
      const groupIdx = state.board.groups.findIndex(g => g.id === groupId)
      if (groupIdx < 0) return
      state.board.groups.splice(groupIdx, 1)
    },
      // --------------- Attachments ---------------
      addAttachments(state, { attachments, taskId, groupId }) {
        const group = state.board.groups.find(g => g.id === groupId)
        const task = group.tasks.find(t => t.id === taskId)
        if (!task.attachments) Vue.set(task, 'attachments', [])
        // task.attachments = task.attachments.concat(attachments)
        task.attachments = attachments
        state.currTask = JSON.parse(JSON.stringify(task))
    },
    addBoard(state , {board}){
      state.boards.push(board);
    },
    setTasks(state, { groupId, tasksToSave }) {
      const groupIdx = state.board.groups.findIndex(g => g.id === groupId)
      if (groupIdx < 0) return

      state.board.groups[groupIdx].tasks = tasksToSave
    },
    setGroups(state, { groups }) {
      state.board.groups = groups
    },
    removeBoard(state,{boardId}){
      const boardIdx = state.boards.findIndex(b => b._id === boardId)
      if (boardIdx < 0) return
      state.boards.splice(boardIdx, 1)
    }
  },

  actions: {
    async setGroups({commit} , {groups}){
      commit({type: 'setGroups' ,  groups})
    },
    async loadBoard({ commit } , {boardId}) {
      try {
        var board = await boardService.getBoardById(boardId)
        commit({type: "setBoard",board});
        return board
      } catch (err) {
        console.log("could not load board", err);
      }
    },
    async setBoard({commit , dispatch},{board}){
      try{
        var board = await boardService.saveBoard(board)
        dispatch({type:'socketUpdateBoard'})
      }catch(err){
        console.log('problem with save board', err);
      }
    },

    async addGroup({commit , dispatch}, { groupTitle }) {
      try {
        const newGroup = await boardService.getNewGroup(groupTitle);
        commit({type: 'addGroup',newGroup})
        dispatch({type:'socketUpdateBoard'})
        dispatch({type: 'saveBoard'})
      } catch (err) {
        console.log("could not add group to the board", err);
      }
    },

    async addTask({commit , dispatch}, { taskTitle ,groupId}) {
      try {
        const newTask = await boardService.setTask(taskTitle);
        commit({type: 'addTask', newTask , groupId})
        const board = this.getters.board
        dispatch({type:'socketUpdateBoard'})
        boardService.saveBoard(board)
      } catch (err) {
        console.log("faild in add task", err);
      }
    },

    async removeGroup({commit , dispatch}, {groupId}) {
      try {
        commit({type: 'removeGroup' , groupId })
        dispatch({type:'socketUpdateBoard'})
        dispatch({type: 'saveBoard'})
      } catch (err) {
        console.log("coldent remove group", err);
      }
    },

    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({ type: "setBoards", boards });
        return boards
      } catch(err){
        console.dir('error',err)
      }
     
    },
    async getBoardById({ commit }, { boardId }) {  
      try{
        var board = await boardService.getBoardById(boardId);
        return board
      }catch(err){
        console.log(err);
      }
    },
    async createNewBoard({commit, dispatch}, {boardDetails}){
      try{
        // console.log(boardService.addNewBoard(boardDetails));
        const board = await boardService.addNewBoard(boardDetails)
        commit({ type: "addBoard", board });
        commit({ type: "setBoard", board });
        dispatch({type: 'addUserBoard' ,boardId: board._id})
        return board
      }catch(err){
        console.log('faild to add new board', err);
      }
    },
    async saveTask({ commit , dispatch}, {groupId,taskToSave}) {
      commit({ type: 'saveTask' ,groupId,taskToSave})
      dispatch({type:'socketUpdateBoard'})
      const board = this.getters.board
      await boardService.saveBoard(board)
    },
    async updateBoard({state, commit,dispatch},{labels}){
      try {
        commit({type: 'updateLabels',labels})
        const board = state.board
        dispatch({type:'socketUpdateBoard'})
        await boardService.saveBoard(board)
      } catch(err){
        console.log('faild to add new board', err);
        throw err;
      }
      
    },
    async updateBoardBgc({state , commit }, { boardId, style }){
      try{
        state.board.style = style
        await boardService.saveBoard(state.board)
      }catch(err){
        console.log('updateBoard in store:', err);
        throw err;
      }
    },
    async removeTask({state, commit ,dispatch}, {groupId,taskId}){
      try{
        commit({type: 'removeTask' , groupId,taskId})
        const board = state.board
        dispatch({type:'socketUpdateBoard'})
        await boardService.saveBoard(board)
      } catch(err){
        console.dir('error',err)
        throw err;
      }
    },
    async saveBoard({state , commit , dispatch}){
      try {
        boardService.saveBoard(state.board)
        dispatch({type:'socketUpdateBoard'})
      } catch(err){
        console.dir('error',err)
        throw err
      }
    },
    async saveGroup({state , commit , dispatch}, {group,idx}){
      try{
        state.board.groups[idx] = group
        boardService.saveBoard(state.board)
        dispatch({type:'socketUpdateBoard'})
      }catch(err){
        console.dir('error',err)
        throw err
      }
    },
    async removeBoard({commit},{boardId}){
      commit('removeBoard',{boardId});
      if(userStore.state.currUser._id !== "guest") await boardService.removeBoard(boardId);
    },
    socketUpdateBoard({state}) {
      socketService.emit(SOCKET_EMIT_BOARD_UPDATE, state.board);
    },
  },
  modules: {
    userStore,

  },

})
