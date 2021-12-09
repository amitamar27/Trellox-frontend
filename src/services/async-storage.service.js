
export const asyncgStorageService = {
    query,
    postTask,
    postGroup,
    put,
    remove,
    _save,
    getBoard,
    removeTaskByCardId,
    getTask,
    getAndSaveBoard,
    postBoard,
    getGroupById,
    removeGroup
    
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

function query(entityType, delay=0) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(entities)
        }, delay)
    })
}
function getAndSaveBoard(key,currBoard){
    console.log(currBoard._id);
    return query(key)
    .then((boards)=>{
        const idx =boards.findIndex((board)=> board._id === currBoard._id)
        if (idx < 0) throw new Error(`Unknown Entity ${idx}`)
        console.log('currBoard',currBoard);
        boards.splice(idx,1,currBoard)
        _save(key,boards)
        return boards[idx]

    })
}


function postTask(key, taskDetails,currBoard) {
    return query(key)
        .then(boards => {
            const boardIdx =boards.findIndex((board)=> board._id === currBoard._id)
            if (boardIdx < 0) throw new Error(`Unknown Entity ${boardIdx}`)
            const groupIdx= boards[boardIdx].groups.findIndex((group)=> group.id===taskDetails.groupId)
           if (groupIdx < 0) throw new Error(`Unknown Entity ${groupIdx}`)
           var index =boards[boardIdx].groups[groupIdx].tasks.push(taskDetails.task)
           _save(key,boards)
           return boards[boardIdx]
        }
        )
        
}
function postGroup(entityType, currBoard,groupToAdd) {
    return query(entityType)
    .then(boards=>{
        const boardIdx =boards.findIndex((board)=> board._id === currBoard._id)
        if (boardIdx < 0) throw new Error(`Unknown Entity ${boardIdx}`)
      var board =boards[boardIdx].groups.push(groupToAdd)
      console.log('hey',boards);
       _save(entityType,boards)
       return boards[boardIdx]
    }
       
       
    )}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}
function putGroups(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            entities.splice(groups, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.groups.findIndex(entity => entity.id === entityId)
            console.log(idx);
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.groups.splice(idx, 1)
            _save(entityType, entities)
            return entities
        })
}


function removeGroup(entityType , groupDetails){
    console.log('inAsync',groupDetails);
    return query(entityType)    
        .then(entities=>{
            const BoardIdx =  entities.findIndex(board=>board._id ===groupDetails.board._id)
            var groupIdx = entities[BoardIdx].groups.findIndex(group=>group.id === groupDetails.groupId)
            entities[BoardIdx].groups.splice(groupIdx,1)
            _save(entityType,entities)
            return entities[BoardIdx]
        })
}

function getTask(entityType, groupId, cardId){
    return query(entityType)
    .then(board =>{
        const groupIdx = board.groups.findIndex((group)=>{ group.id ===groupId})
        if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
        const taskId =board.groups[groupIdx].tasks.findIndex((task)=>{task.id ===cardId})
        if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
        return board.groups[groupIdx].tasks[taskId]
    } )


}

// this function need to be checked!!!
function removeTaskByCardId(entityType, details) {
    const {taskId,groupId,boardId} =details
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board=> board._id === boardId )
             if (boardIdx < 0) throw new Error(`Unknown Entity ${boardIdx}`)
                const groupIdx =  boards[boardIdx].groups.findIndex(group=> group.id ===groupId)
                console.log('gropp',groupIdx);
                if (groupIdx < 0) throw new Error(`Unknown Entity ${groupIdx}`)
                const taskIdx= boards[boardIdx].groups[groupIdx].tasks.findIndex(task=>task.id===taskId)
                console.log('got your taskid',taskIdx);
                boards[boardIdx].groups[groupIdx].tasks.splice(taskIdx,1)
                _save(entityType,boards)
                return boards[boardIdx]
                
        
        })
}
function postBoard(key,board){
    return query(key)
    .then(boards=>{
        boards.push(board)
        _save(key,boards)
        return board

    })
    
    

}


function _save(entityType, entities) {
    
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
function getBoard(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function removeBoard(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}



function getGroupById(entityType , groupDetails){
   
    return query(entityType).then(boards => {
        const idx = boards.findIndex(board=>board._id ===groupDetails.board._id)
        var group =boards[idx].groups.find(group=>group.id === groupDetails.groupId)
        return group

    })
       
            
      
           
            
    
        
    
}