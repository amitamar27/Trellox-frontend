export const boardService = {
    query,
    setTask,
    getNewGroup,
    saveBoard,
    getBoardById,
    addNewBoard,
    updateBgcBoard,
    removeBoard
}

import {
    httpService
} from "./http.service"
import {
    userService
} from './user-service.js'
import { asyncgStorageService } from "./async-storage.service"
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function query() {
    try {
        const res = await httpService.get('board');
        // const b = asyncgStorageService.queryBoards('boards',res._id)
        
        // console.log('b',b);
        // if(b && b.length) return b
        const user = getLoggedinUser()

        if (!user || user.fullname === 'Guest') return mainBoards(res)
        if (!user.boardsIds.length) return []
        const boards = []
        res.forEach((board) => {
            if (user.boardsIds.includes(board._id)) {
                boards.push(board);
            }
        })
        return boards
    } catch (err) {
        console.log(err);
        throw err
    }
}

function mainBoards(boards) {
    let mainBoards = [];
    boards.forEach(board => {
        if (board.createdBy._id === 'guest' ||
            board.createdBy.fullname === 'Koren Levi') mainBoards.push(board)
    })
    return mainBoards
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
// 61b5232979d1b61989d421d9
async function saveBoard(board) {
    // const user = getLoggedinUser()
    try {
        // if((!user || !user.isAdmin) && board._id) return asyncgStorageService.postBoard('boards',board)
        // if((!user || !user.isAdmin) && board._id) return 
        if(board._id === '61b5232979d1b61989d421d9' || board.createdBy._id === 'IbVtx') return
        return httpService.put('board', {
            board
        })
    } catch (err) {
        console.dir(err)
    }
}

function setTask(title) {
    const user = userService.getLoggedinUser()
    return {
        id: makeId(),
        title,
        activities: [],
        byMember: {
            _id: user._id || "u101",
            email: user.email || "korenlevi",
            fullname: user.fullname || "Koren Levi",
            imgUrl: "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg",

        },
        checklists: [],
        comments: [],
        cover: null,
        createdAt: Date.now(),
        description: "",
        dueDate: null,
        isDueDateDone: false,
        labelIds: [],
        members: [],
        attachments: [],
        style: {}
    }
}

function getNewGroup(title, tasks = []) {
    return {
        id: 'g' + makeId(),
        title,
        tasks,
    }
}

async function getBoardById(boardId) {
    try {
        const res = await httpService.get('board/' + boardId);
        return res;
    } catch (err) {
        console.log(err);
    }

}
async function removeBoard(boardId) {
    // return await asyncgStorageService.removeBoard(KEYS, baordId)/
    return httpService.delete('board/' + boardId)
}


function _createBoard(title, groups = [], style = {
    bgColor: '',
    bgImg: ''
}) {
    const user = getLoggedinUser()
    return {
        title,
        createdAt: Date.now(),
        createdBy: {
            _id: user._id || 'guest',
            fullname: user.fullname || 'Koren Levi',
            imgUrl: 'https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg',

        },
        style,
        labels: [{
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Ready",
                "color": "#f2d600"
            },
            {
                "id": "l103",
                "title": "Ready",
                "color": "#ff9f1a"
            },
            {
                "id": "l104",
                "title": "Ready",
                "color": "#eb5a46"
            },
            {
                "id": "l105",
                "title": "Ready",
                "color": "#c377e0"
            },
            {
                "id": "l106",
                "title": "Ready",
                "color": "#0079bf"
            }
        ],
        members: [{
            _id: 'u101',
            fullname: 'Koren Levi',
            username: 'korenlevi',
            imgUrl: 'https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg'
        }, {
            _id: 'u102',
            fullname: 'Amit Amar',
            username: 'amitamar',
            imgUrl: 'https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg'
        }, ],
        groups,
        covers: ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d'],
        isFavorite: false,
    }

}

async function addNewBoard(boardDetails) {
    const board = _createBoard(boardDetails.title, [], boardDetails.style)
    try {
        return httpService.post('board', {
            board
        })
    } catch (err) {
        console.log(err);
    }

}


async function updateBgcBoard(boardId, style) {
    try {
        const board = await getBoardById(boardId);
        board.style = style
        return saveBoard(board);
    } catch (err) {
        console.log('Error in updateBoard :', err);
        throw err;
    }
}



// utils
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
        if (i === 0 && typeof txt === 'number') {
            txt = 'g'
        }
    }
    return txt;
}