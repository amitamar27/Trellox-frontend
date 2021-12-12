const axios = require("axios")
import { httpService } from './http.service'
// const KEY = 'toysDB';

export const boardService = {
    query,
    getBoardById,
    removeBoard,
    addBoard,
    updateBoard, //should be save
    getEmptyBoard
    // getReviews,
    // removeReview,
    // addReview,
}
function query() {
    // return storageService.query(KEY)
    return httpService.get('board')
}

function getBoardById(id) {
    // return storageService.get(KEY, id)
    return httpService.get(`board/${id}`)
}

function removeBoard(id) {
    // return storageService.remove(KEY, id)
    return httpService.delete(`board/${id}`)
}

function addBoard(title, style) {
    // return storageService.remove(KEY, id)
    const board = getEmptyBoard(title)
    board.style = style
    return updateBoard(board)
}

function updateBoard(board) {
    // const savedBoard = (board._id) ? storageService.put(KEY, board) : storageService.post(KEY, board)
    // return savedBoard
    if (board._id) return httpService.put('board', { board })
    return httpService.post('board', { board })
}
