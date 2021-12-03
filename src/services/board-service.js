import {asyncgStorageService} from './async-storage.service.js'
import { storageService } from './storage-service.js'
export const boardService={
query,
getGroupById,
makeTask,
getNewGroup,
getBoardId,
saveBoard,
removeGroup,
getBoardByTaskId,
getTaskById,
queryBoards,
getBoardById


}
const KEY ='board'
// for future
const KEYS ='boards'


const gBoard = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples",
                    labels:{
                        bcg:'blue',
                        title:'gilad'
                    }
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ],
    // פעילויות בתוך כרטיס
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
}

 async function query(){
    var board = await asyncgStorageService.query(KEY)
    if(!board || !board.length){
        board = gBoard
    }

    return board   
}
async function getBoardId(){
    var board = await asyncgStorageService.query(KEY)
    return board._id   
}
 async function getGroupById(taskDetails, board){
     var Idx= await asyncgStorageService.postTask(KEYS ,taskDetails,board)
    // const board = gBoard
    // var currGroup =board.groups.find((group)=> group.id === groupId)
    // return currGroup

}
async function saveBoard(board){
    return await asyncgStorageService._save(KEY,board)
}
async function getTaskById(groupId, cardId){
    return await asyncgStorageService.getTask(KEY,groupId, cardId )

}
function makeTask(title){
    return {
        id:makeId(), 
        title
    }
}

function getNewGroup(title){
    return {
        id:makeId(),
        title,
        tasks:[],
        
    }
}
async function getBoardByTaskId(taskId){
    return await asyncgStorageService.removeTaskByCardId(taskId)
}



function saveTask(boardId, groupId, task, activity) {
    // const board = getById(boardId)
    // TODO: find the task, and update
    // board.activities.unshift(activity)
    // saveBoard(board)
    return board
}





function updateBoard(board){
    
}
queryBoards()
// in case we have couple of boards
const gBoards= _creareBoards()

function _creareBoards(){
    var boards = storageService.load(KEYS)
    if(!boards || !boards.length){
        boards=[_createBoard('board1',[
        {
            "id": "g101",
            "title": "Group 1",
            // כרטיסים
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ]), _createBoard('board2', [
        {
            "id": "g103",
            "title": "Group 3",
            // כרטיסים
            "tasks": [
                {
                    "id": "c104",
                    "title": "drag and drop"
                },
                {
                    "id": "c105",
                    "title": "add home page"
                }
            ],
            "style": {}
        },
        {
            "id": "g104",
            "title": "Group 4",
            "tasks": [
                {
                    "id": "c107",
                    "title": "eat lunch"
                },
                {
                    "id": "c108",
                    "title": "get the dog out",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ])]
    storageService.store(KEYS, boards)
    }
    return boards
    
}
function _createBoard(title,groups){
   return {
        _id: makeId(),
        title,
        createdAt: Date.now(),
        createdBy :{
            _id:makeId(),
            fullname:'gilad',
            imgUrl:'',
        },
        style:{},
        labels:[{
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "ready",
            "color": "yellow"
        }
    ],
        members:[{
            _id:makeId(),
            fullname:'gilad',
            imgUrl:''
        }],
        groups:[]
       
    }

}
async function queryBoards(){
    var boards =await asyncgStorageService.query(KEYS)
    if(!boards ||!boards.length){
        boards = _creareBoards()
    }
    return boards
    
}
async function getBoardById(boardId){
    return await asyncgStorageService.getBoard(KEYS,boardId)
}
async function removeBoard(baordId){
    return await asyncgStorageService.removeBoard(KEYS, baordId)
}


async function removeGroup(groupId){
   return await asyncgStorageService.remove(KEY,groupId)
}



// utils
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}