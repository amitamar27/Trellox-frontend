const axios = require("axios")
import { httpService } from './http.service'

export const boardService = {
    query,
    getById,
    remove,
    updateBoard
}
async function query(filterBy = {}) {
	try {
		const res = await httpService.get('board', { params: filterBy });
		return res;
	} catch (err) {
		console.log(err);
	}
}
async function getById(boardId) {
	try {
		const res = await httpService.get('board/' + boardId);
		return res;
	} catch (err) {
		console.log(err);
	}
}
async function remove(boardId) {
	try {
		// return await storageService.remove(KEY, boardId)
		const res = await httpService.delete('board/' + boardId);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function updateBoard(board) {
    if (board._id) return await httpService.put('board', { board })
    return await httpService.post('board', { board })
}