export const boardService={
query,
getGroupById,
makeTask,
getNewGroup

}


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
    // עמודות
    "groups": [
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

function query(){
    return gBoard
}
getGroupById('g101')
function getGroupById(groupId){
    const board = gBoard
    var currGroup =board.groups.find((group)=> group.id === groupId)
    console.log(currGroup);
    return currGroup

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
        title
    }
}


function saveTask(boardId, groupId, task, activity) {
    // const board = getById(boardId)
    // TODO: find the task, and update
    // board.activities.unshift(activity)
    // saveBoard(board)
    return board
}



function _createBoard(title, fullname,imgUrl,style={},labels,members,groups){
   return {
        _id: makeId(),
        title,
        createdAt: Date.now(),
        createdBy :{
            _id:makeId(),
            fullname,
            imgUrl,
        },
        style,
        labels,
        members,
        groups
       
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