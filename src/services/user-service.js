import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const SCORE_FOR_REVIEW = 10
var gWatchedUser = null

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore,
    tryDemo
}

window.userService = userService

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function createUser(user){
    // const user = {
    //     fullname,
    //     email,
    //     password,
    // }
    console.log('user',user);

    // signup(user)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user
    return user
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user
}

async function login(userCred) {

    try{
        console.log('userCred',userCred);
        const user = await httpService.post('auth/login', userCred)
        
        console.log('userrr',user);
    // socketService.emit('login', user._id)
    if (user) return _saveLocalUser(user)
    return user
    } catch(err){
        console.log('error',err);
        throw err;
    }
    
}
async function signup(userCred) {

    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function _saveLocalUser(user) {
    console.log('user-local',user);
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) ||
    'null') || guestUser()
}
function guestUser(){
    return {
        _id: 'guest',
        fullname: 'Guest',
        email:'guest@gmail.com',
        password: 'guest',
        isAdmin: false,
    }
    
}

function tryDemo(){
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    getLoggedinUser()
}
// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    var user = getLoggedinUser()
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched user (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return
        if (gWatchedUser.score !== watchedUser.score) {
            socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        }
        gWatchedUser = watchedUser
    })
})();

(async () => {
    var user = getLoggedinUser()
    // if (user) socketService.emit('set-user-socket', user._id)
})()