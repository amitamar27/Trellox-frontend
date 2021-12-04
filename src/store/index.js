import Vue from "vue";
import Vuex from "vuex";
import { boardService } from "../services/board-service";
Vue.use(Vuex);
import taskDetails from "./task-details.store";
export default new Vuex.Store({
  state: {
    board: null,
    isDarkScreen: false,
    boards: null,
    currTask: null,
    currCardToEdit: null,
  },
  getters: {
    board(state) {
      return state.board;
    },
    groups(state) {
      return state.board.groups;
    },
    isDark(state) {
      console.log("in getters");
      return state.isDarkScreen;
    },
    isAddingCardTitle(state) {
      return state.isAddingCardTitle;
    },
    currTask(state) {
      console.log('state.currTask',state.currTask);
      if (!state.currTask) return null
      return JSON.parse(JSON.stringify(state.currTask))
    },
    boards(state) {
      return state.boards
    },

    labels(state) {
      console.log('state.board.labels',state.board);
      return JSON.parse(JSON.stringify(state.board.labels))
    },
  },

  mutations: {
    setDarkScreen(state) {
      console.log("screen dark true");
      console.log("state.isDarkScreen", state.isDarkScreen);
      state.isDarkScreen = true;
      console.log("state.isDarkScreen", state.isDarkScreen);
    },

    closeDarkScreen(state) {
      state.isDarkScreen = false;
    },

    setBoard(state, { board }) {
      console.log("board", board);
      state.board = board;
    },

    updateGroup(state, { updatedGroup }) {
      var index = state.board.groups.findIndex((group) => group.id === updatedGroup.id);
      state.board.groups.splice(index, 1, updatedGroup);
    },

    getGroupById(state, { group }) {},
    getTaskById(state, { groupId, taskId }) {
      console.log("groupId, taskId", groupId, taskId);
      const group = state.board.groups.find((group) => group.id === groupId);
      console.log("group", group);
      const task = group.tasks.find((task) => task.id === taskId);
      console.log("task", task);
      state.currTask = task;
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCardToEdit(state, { card }) {
      state.currCardToEdit = card;
    },
    saveTask(state, { groupId, taskToSave }) {
      console.log(' groupId, taskToSave', groupId, taskToSave);
      const group = state.board.groups.find(group => group.id === groupId)
      console.log('group',group);
      const taskIdx = group.tasks.findIndex(task => task.id === taskToSave.id)
      console.log('taskIdx',taskIdx);
      if (taskIdx < 0) return
      group.tasks.splice(taskIdx, 1, taskToSave)
  },
  },

  actions: {
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
      var board = await boardService.saveBoard(board)
      try{

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
        var addedTask = await boardService.makeTask(task.title);
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

    async getGroupById({ commit }, { groupId }) {
      try {
        const group = await boardService.getGroupById(groupId);
        return group;
        // commit({type: 'getGroupById',group})
      } catch (err) {
        console.log("faild get group", err);
      }
    },
// no need
    // async saveBoard({ commit }, { board }) {
    //   try {
    //     await boardService.saveBoard(board);
    //   } catch (err) {
    //     console.log("coldent save board", err);
    //   }
    // },
    async removeGroup({commit}, {groupId}) {
      try {
        var board = await boardService.removeGroup(groupId);
        console.log(board);
        commit({ type: "setBoard", board });
      } catch (err) {
        console.log("coldent remove group", err);
      }
    },

    //need to aproval
    async removeTask({commit},{task}) {
      try {
        var board = await boardService.getBoardByTaskId(task.id);
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

    saveTask({ commit }, payload) {
      console.log('payload',payload);
      commit({ type: 'saveTask' ,groupId: payload.groupId , taskToSave: payload.taskToSave})
      boardService.getTaskById(payload.groupId,payload.taskToSave.id)
    },
  },
  modules: {
    taskDetails,
  },

})
