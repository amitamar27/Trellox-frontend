import Vue from 'vue'
import Vuex from 'vuex'
import {
  boardService
} from '../services/board-service'
Vue.use(Vuex)
import taskDetails from './task-details.store'
export default new Vuex.Store({
  state: {
    board: null,
    isDarkScreen: false,
    boards:null,
    currTask:null,
    currCardToEdit:null
  },
  getters: {
    board(state) {
      return state.board
    },
    groups(state) {
      return state.board.groups
    },
    isDark(state) {
      console.log('in getters');
      return state.isDarkScreen
    },
    isAddingCardTitle(state) {
      return state.isAddingCardTitle
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
      console.log('screen dark true');
      console.log('state.isDarkScreen', state.isDarkScreen);
      state.isDarkScreen = true;
      console.log('state.isDarkScreen', state.isDarkScreen);
    },
    closeDarkScreen(state) {
      state.isDarkScreen = false;
    },
    setBoard(state, {
      board
    }) {
      console.log('board', board);
      state.board = board
    },
    updateGroup(state, {
      updatedGroup
    }) {
      var index = state.board.groups.findIndex((group) => group.id === updatedGroup.id);
      state.board.groups.splice(index, 1, updatedGroup)
    },
    getGroupById(state, {
      grou
    }) {

    },
    getTaskById(state, {
      groupId,
      taskId
    }) {
      console.log('groupId, taskId', groupId, taskId);
      const group = state.board.groups.find(group => group.id === groupId)
      console.log('group', group);
      const task = group.tasks.find(task => task.id === taskId)
      console.log('task', task);
      state.currTask = task
    },
  
  setBoards(state, {
    boards
  }) {
    state.boards = boards

  },
  setCardToEdit(state, {
    card
  }) {
    state.currCardToEdit = card

  }

},
actions: {
  async loadBoard({
    commit
  }) {
    try {
      var board = await boardService.query()
      commit({
        type: 'setBoard',
        board
      })
    } catch (err) {
      console.log('could not load board', err);
    }
  },
  async addGroup(context, {
    groupTitle
  }) {
    try {
      var board = context.state.board
      var group = await boardService.getNewGroup(groupTitle)
      board.groups.push(group)
      commit({
        type: 'setBoard',
        board
      })
      //  boardService.saveBoard(board)
    } catch (err) {
      console.log('could not add group to the board', err);
    }
  },
  async addTask({
    commit
  }, {
    task
  }) {
    try {
      var updatedGroup = await boardService.getGroupById(task.groupId);
      var addedTask = await boardService.makeTask(task.title)
      updatedGroup.tasks.push(addedTask)
      await commit({
        type: 'updateGroup',
        updatedGroup
      })
      return updatedGroup

    } catch (err) {
      console.log('faild in add task', err);

    }
  },
  async getGroupById({
    commit
  }, {
    groupId
  }) {
    try {
      const group = await boardService.getGroupById(groupId);
      return group;
      // commit({type: 'getGroupById',group})
    } catch (err) {
      console.log('faild get group', err);
    }

  },
  async saveBoard({
    commit
  }, {
    board
  }) {
    try {
      await boardService.saveBoard(board)

    } catch (err) {
      console.log('coldent save board', err);
    }
  },
  async changeGroupPos({
    commit
  }, {
    payload
  }) {
    try {
      const {
        board,
        fromIndex,
        toIndex
      } = payload
      var groupToUpdate = board.groups[fromIndex]
      board.groups.splice(fromIndex, 1)
      board.groups.splice(toIndex, 0, groupToUpdate)
      boardService.saveBoard(board)
      // var board = boardService.changeGroupPos(payload)
    } catch (err) {
      console.log(err);
    }
  },

  async removeGroup({
    commit
  }, {
    groupId
  }) {
    try {
      var board = await boardService.removeGroup(groupId)
      console.log(board);
      commit({
        type: 'setBoard',
        board
      })
    } catch (err) {
      console.log('coldent remove group', err);
    }
  },

  //need to aproval
  async removeTask({
    commit
  }, {
    task
  }) {
    try {
      var board = await boardService.getBoardByTaskId(task.id)
    } catch (err) {}

  },
  async removeTask({
    commit
  }, {
    task
  }) {
    try {
      var board = await boardService.getBoardByTaskId(task.id)
    } catch (err) {}

  },
  async loadBoards({
    commit
  }) {
    var boards = await boardService.queryBoards()
    console.log('gggg', boards);
    commit({
      type: 'setBoards',
      boards
    })
  },
  async getBoardById({
    commit
  }, {
    boardId
  }) {
    var board = await boardService.getBoardById(boardId)
    commit({
      type: 'setBoard',
      board
    })

  }



},
modules: {
  taskDetails,
}


})