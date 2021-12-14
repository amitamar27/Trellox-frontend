import io from 'socket.io-client'
import { httpService } from './http.service'

export const SOCKET_EMIT_USER_WATCH = 'user watch'
export const SOCKET_EVENT_USER_UPDATED = 'user updated'
export const SOCKET_EMIT_BOARD_UPDATE = 'board update'
export const SOCKET_ON_BOARD_UPDATE = 'board updated'
export const SOCKET_EMIT_BOARD_WATCH = 'currBoard'
// export const SOCKET_EVENT_ = 'review-about-you'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3000'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService

var socketIsReady = false
// socketService.setup()


function createSocketService() {
    var socket = null
    const socketService = {
        async setup() {
            // YaronB: Need to send a dummy ajax request as to setup the socket-session correctly
            // await httpService.get('setup-session')
            // socket = io(baseUrl, { reconnection: false })
            // console.log('socket',socket);
            // if(socket) return
            console.log('not socket');
            socket = io(baseUrl)
            // console.log('socket',socket);
            socketIsReady = true
        },
        async on(eventName, cb) {
            if (!socket) await socketService.setup()
            socket.on(eventName, cb)
            console.log('socket connected 1 ');
        },
        async off(eventName, cb = null) {
            if (!socket) await socketService.setup()
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        async emit(eventName, data) {
            // console.log('data',data);
            // console.log('eventName',eventName);
            if (!data) return
            if (!socket) await socketService.setup()
            socket.emit(eventName, data)
            console.log('socket connected 2 ');
        },
        terminate() {
            socket = null
            socketIsReady = false
        }
    }
    return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
    var listenersMap = {}
    const socketService = {
        listenersMap,
        setup() {
            listenersMap = {}
        },
        terminate() {
            this.setup()
        },
        on(eventName, cb) {
            listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
        },
        off(eventName, cb) {
            if (!listenersMap[eventName]) return
            if (!cb) delete listenersMap[eventName]
            else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
        },
        emit(eventName, data) {
            if (!listenersMap?.[eventName]) return
            listenersMap[eventName].forEach(listener => {
                listener(data)
            })
        },
        debugMsg() {
            this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
        },
    }
    return socketService
}