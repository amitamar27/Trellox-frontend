import {
    asyncgStorageService
} from './async-storage.service.js'
import {
    storageService
} from './storage-service.js'
export const boardService = {
    query,
    addTask,
    makeTask,
    getNewGroup,
    saveBoard,
    removeGroup,
    getBoardByTaskId,
    getTaskById,
    queryBoards,
    getBoardById,
    addNewGroup,
    addNewBoard,
    getGroupById


}
const KEY = 'board'
// for future
const KEYS = 'boards'


// const gBoard = {
//     "_id": "b101",
//     "title": "Robot dev proj",
//     "createdAt": 1589983468418,
//     "createdBy": {
//         "_id": "u101",
//         "fullname": "Abi Abambi",
//         "imgUrl": "http://some-img"
//     },
//     "style": {},
//     "labels": [
//         {
//             "id": "l101",
//             "title": "Done",
//             "color": "#61bd4f"
//         }
//     ],
//     "members": [
//         {
//             "_id": "u101",
//             "fullname": "Tal Tarablus",
//             "imgUrl": "https://www.google.com"
//         }
//     ],

//     "groups": [
//         {
//             "id": "g101",
//             "title": "Group 1",
//             "tasks": [
//                 {
//                     "id": "c101",
//                     "title": "Replace logo"
//                 },
//                 {
//                     "id": "c102",
//                     "title": "Add Samples",
//                     labels:{
//                         bcg:'blue',
//                         title:'gilad'
//                     }
//                 }
//             ],
//             "style": {}
//         },
//         {
//             "id": "g102",
//             "title": "Group 2",
//             "tasks": [
//                 {
//                     "id": "c103",
//                     "title": "Do that"
//                 },
//                 {
//                     "id": "c104",
//                     "title": "Help me",
//                     "description": "description",
//                     "comments": [
//                         {
//                             "id": "ZdPnm",
//                             "txt": "also @yaronb please CR this",
//                             "createdAt": 1590999817436.0,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Tal Tarablus",
//                                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                             }
//                         }
//                     ],
//                     "checklists": [
//                         {
//                             "id": "YEhmF",
//                             "title": "Checklist",
//                             "todos": [
//                                 {
//                                     "id": "212jX",
//                                     "title": "To Do 1",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "members": [
//                         {
//                             "_id": "u101",
//                             "username": "Tal",
//                             "fullname": "Tal Tarablus",
//                             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                         }
//                     ],
//                     "labelIds": ["l101", "l102"],
//                     "createdAt": 1590999730348,
//                     "dueDate": 16156215211,
//                     "byMember": {
//                         "_id": "u101",
//                         "username": "Tal",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                     },
//                     "style": {
//                         "bgColor": "#6deca9"
//                     },
//                     "cover": {
//                         "isFull": false,
//                         "bgColor": "#6deca9"
//                     }
//                 }
//             ],
//             "style": {

//             }
//         }
//     ],
//     // פעילויות בתוך כרטיס
//     "activities": [
//         {
//             "id": "a101",
//             "txt": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "_id": "u101",
//                 "fullname": "Abi Abambi",
//                 "imgUrl": "http://some-img"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }
//     ],
// }

async function query() {
    var board = await asyncgStorageService.query(KEY)
    if (!board || !board.length) {
        board = gBoard
    }

    return board
}

async function addTask(taskDetails, board) {
    return await asyncgStorageService.postTask(KEYS, taskDetails, board)


}
async function saveBoard(board) {
    return await asyncgStorageService.getAndSaveBoard(KEYS, board)
}
async function getTaskById(groupId, cardId) {
    return await asyncgStorageService.getTask(KEYS, groupId, cardId)

}

function makeTask(title) {
    return {
        id: makeId(),
        title
    }
}

function getNewGroup(title, tasks = []) {
    return {
        id: makeId(),
        title,
        tasks,

    }
}
async function getBoardByTaskId(taskDetails) {
    return await asyncgStorageService.removeTaskByCardId(KEYS, taskDetails)
}


async function getGroupById(groupDetails) {
    return await asyncgStorageService.getGroupById(KEYS, groupDetails)
}



async function addNewGroup(board, newGroup) {
    return await asyncgStorageService.postGroup(KEYS, board, newGroup)

}



function saveTask(boardId, groupId, task, activity) {
    // const board = getById(boardId)
    // TODO: find the task, and update
    // board.activities.unshift(activity)
    // saveBoard(board)
    return board
}





function updateBoard(board) {

}
queryBoards()
// in case we have couple of boards
const gBoards = _creareBoards()

function _creareBoards() {
    var boards = storageService.load(KEYS)
    if (!boards || !boards.length) {
        boards = [_createBoard('Project Managment', [{
                        "id": "g101",
                        "title": "Question for next meeting",
                        "tasks": [{
                                "id": "c104",
                                "title": "Who's the best person to fix my HTML snag?",
                                "description": "",
                                "comments": [{
                                    "id": "ZdPnm",
                                    "txt": "also @yaronb please CR this",
                                    "createdAt": 1590999817436.0,
                                    "byMember": {
                                        "_id": "u101",
                                        "username": "korenlevi",
                                        "fullname": "Koren Levi",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                    },
                                }],
                                "checklists": [{
                                    "id": "gghty",
                                    "title": "Checklist",
                                    "todos": [{
                                            "id": "2gg5e",
                                            "title": "dont forget to to talk with me",
                                            "isDone": false
                                        },
                                        {
                                            "id": "4ff43",
                                            "title": "clean the house",
                                            "isDone": true
                                        }
                                    ]
                                }],
                                "members": [{
                                        "_id": "u101",
                                        "username": "korenlevi",
                                        "fullname": "Koren Levi",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                    },
                                    {
                                        "_id": "u102",
                                        "username": "amitamar",
                                        "fullname": "Amit Amar",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg"
                                    }
                                ],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "korenlevi",
                                    "fullname": "Koren Levi",
                                    "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                },
                                "style": {
                                    "bgColor": "#6deca9"
                                },
                                "cover": {
                                    "isFull": false,
                                    "bgColor": "#6deca9"
                                },
                                "activities": [{
                                    "txt": "Changed Color",
                                    "createdAt": 1625816076030,
                                    "byMember": {
                                        "_id": "u101",
                                        "username": "korenlevi",
                                        "fullname": "Koren Levi",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                    },
                                }, ],

                            },
                            {
                                "id": "c105",
                                "title": "How can I get access to the super secret document?",
                                "description": "description",
                                "comments": [{
                                    "id": "ZdPnm",
                                    "txt": "also @yaronb please CR this",
                                    "createdAt": 1590999817436.0,
                                    "byMember": {
                                        "_id": "u103",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                }],
                                "checklists": [{
                                    "id": "YEhmF",
                                    "title": "Checklist",
                                    "todos": [{
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }]
                                }],
                                "members": [{
                                    "_id": "u103",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "korenlevi",
                                    "fullname": "Koren Levi",
                                    "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                },
                                "style": {
                                    "bgColor": "#6deca9"
                                },
                                "cover": {
                                    "isFull": false,
                                    "bgColor": "#6deca9"
                                },
                                "activities": [{
                                    "txt": "Changed Color",
                                    "createdAt": 1625816076030,
                                    "byMember": {
                                        "_id": "u101",
                                        "username": "korenlevi",
                                        "fullname": "Koren Levi",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889545/Trellox/korenlevi.jpg"
                                    },
                                }, ]
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g102",
                        "title": "Question for next meeting",
                        "tasks": [{
                                "id": "c104",
                                "title": "Who's the best person to fix my HTML snag?",
                                "description": "",
                                "comments": [{
                                    "id": "ZdPnm",
                                    "txt": "also @yaronb please CR this",
                                    "createdAt": 1590999817436.0,
                                    "byMember": {
                                        "_id": "u102",
                                        "username": "amitamar",
                                        "fullname": "Amit Amar",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg"
                                    }
                                }],
                                "checklists": [{
                                    "id": "gghty",
                                    "title": "Checklist",
                                    "todos": [{
                                            "id": "2gg5e",
                                            "title": "dont forget to to talk with me",
                                            "isDone": false
                                        },
                                        {
                                            "id": "4ff43",
                                            "title": "clean the house",
                                            "isDone": true
                                        }
                                    ]
                                }],
                                "members": [{
                                    "_id": "u102",
                                    "username": "amitamar",
                                    "fullname": "Amit Amar",
                                    "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg"
                                }],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u102",
                                    "username": "amitamar",
                                    "fullname": "Amit Amar",
                                    "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg"
                                },
                                "style": {
                                    "bgColor": "#6deca9"
                                },
                                "cover": {
                                    "isFull": false,
                                    "bgColor": "#6deca9"
                                },
                                "activities": [{
                                    "txt": "Changed Color",
                                    "createdAt": 1625816076030,
                                    "byMember": {
                                        "_id": "u102",
                                        "username": "amitamar",
                                        "fullname": "Amit Amar",
                                        "imgUrl": "https://res.cloudinary.com/dnmyqfcjm/image/upload/v1638889554/Trellox/amitamar.jpg"
                                    }
                                }, ],

                            },
                            {
                                "id": "c105",
                                "title": "How can I get access to the super secret document?",
                                "description": "description",
                                "comments": [{
                                    "id": "ZdPnm",
                                    "txt": "also @yaronb please CR this",
                                    "createdAt": 1590999817436.0,
                                    "byMember": {
                                        "_id": "u103",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                }],
                                "checklists": [{
                                    "id": "YEhmF",
                                    "title": "Checklist",
                                    "todos": [{
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }]
                                }],
                                "members": [{
                                    "_id": "u103",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u103",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#6deca9"
                                },
                                "cover": {
                                    "isFull": false,
                                    "bgColor": "#6deca9"
                                },
                                "activities": [{
                                    "txt": "Changed Color",
                                    "createdAt": 1625816076030,
                                    "byMember": {
                                        "_id": "u101",
                                        "username": "Koren",
                                        "fullname": "Koren Levi",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    },
                                }, ]
                            }
                        ],
                        "style": {}
                    },

                ], {
                    backgroundSrc: "https://res.cloudinary.com/giladtoy/image/upload/v1638531202/u27ypkc1wfre9x9vgmrb.jpg"
                }

            ),
            _createBoard('Simple Project 2', [{
                    "id": "g105",
                    "title": "TO DO",
                    // כרטיסים
                    "tasks": [{
                            "id": "c108",
                            "title": "drag and drop"
                        },
                        {
                            "id": "c110",
                            "title": "add home page"
                        }
                    ],
                    "style": {}
                },
                {
                    "id": "g109",
                    "title": "Done",
                    "tasks": [{
                            "id": "c111",
                            "title": "eat lunch"
                        },
                        {
                            "id": "c192",
                            "title": "get the dog out",
                            "description": "description",
                            "comments": [{
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }],
                            "checklists": [{
                                "id": "s334d",
                                "title": "Checklist",
                                "todos": [{
                                    "id": "1ss32",
                                    "title": "To Do 1",
                                    "isDone": false
                                }]
                            }],
                            "members": [{
                                "_id": "u103",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }],
                            "labelIds": ["l101", "l102"],
                            "createdAt": 1590999730348,
                            "dueDate": 16156215211,
                            "byMember": {
                                "_id": "u103",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            "style": {
                                "bgColor": "#6deca9"
                            },
                            "activities": [{
                                "txt": "Changed Color",
                                "createdAt": 1625816076030,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Koren",
                                    "fullname": "Koren Levi",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                            }, ]
                        }
                    ],

                }
            ], {
                backgroundSrc: "https://res.cloudinary.com/giladtoy/image/upload/v1638531189/t7mu6ik3iaglggchsd73.jpg"
            }), _createBoard('Simple board', [{
                    "id": "g103",
                    "title": "To start with",
                    // כרטיסים
                    "tasks": [{
                            "id": "c120",
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
                    "title": "To end with",
                    "tasks": [{
                            "id": "121",
                            "title": "eat lunch"
                        },
                        {
                            "id": "c132",
                            "title": "get the dog out",
                            "description": "description",
                            "comments": [{
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }],
                            "checklists": [{
                                "id": "4ggfd",
                                "title": "Checklist",
                                "todos": [{
                                    "id": "221gf",
                                    "title": "To Do 1",
                                    "isDone": false
                                }]
                            }],
                            "members": [{
                                "_id": "u103",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }],
                            "labelIds": ["l101", "l102"],
                            "createdAt": 1590999730348,
                            "dueDate": 16156215211,
                            "byMember": {
                                "_id": "u103",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            "style": {
                                "bgColor": "#6deca9"
                            },
                            "activities": [{
                                "txt": "Changed Color",
                                "createdAt": 1625816076030,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Koren",
                                    "fullname": "Koren Levi",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                            }, ]
                        }
                    ],

                }
            ], {
                backgroundSrc: "https://res.cloudinary.com/giladtoy/image/upload/v1638531189/t7mu6ik3iaglggchsd73.jpg"
            })
        ]
        storageService.store(KEYS, boards)
    }
    return boards

}

function _createBoard(title, groups = [], style = {}) {
    return {
        _id: makeId(),
        title,
        createdAt: Date.now(),
        createdBy: {
            _id: makeId(),
            fullname: 'gilad',
            imgUrl: '',
        },
        style: {},
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
        }, {
            _id: 'u103',
            fullname: "Tal Tarablus",
            username: "Tal",
            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        }],
        groups,
        style,
        covers:['#7bc86c','#f5dd29','#ffaf3f','#ef7564','#cd8de5','#5ba4cf','#29cce5','#6deca9',
    '#ff8ed4','#172b4d'],

    }

}

async function queryBoards() {
    var boards = await asyncgStorageService.query(KEYS)
    if (!boards || !boards.length) {
        boards = _creareBoards()
    }
    return boards

}
async function getBoardById(boardId) {
    return await asyncgStorageService.getBoard(KEYS, boardId)

}
async function removeBoard(baordId) {
    return await asyncgStorageService.removeBoard(KEYS, baordId)
}


async function removeGroup(groupDetails) {
    return await asyncgStorageService.removeGroup(KEYS, groupDetails)
}


async function addNewBoard(boardDetails) {
    console.log('board sservice with', boardDetails);
    const board = _createBoard(boardDetails.title, [], boardDetails.background)
    try {
        await asyncgStorageService.postBoard(KEYS, board)
        return board

    } catch (err) {
        console.log(err);
    }

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