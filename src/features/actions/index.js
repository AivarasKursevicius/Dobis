import * as types from './actionTypes'

export const loggin = () => {
    return {
        type: types.SIGN_IN
    }
}

export const loggout = () => {
    return {
        type: types.SIGN_OUT
    }
}

export const completeTodo = (todo) => {
    return {
        type: types.COMPLETE_TODO,
        payload: todo
    }
}

export const addTodo = (todo) => {
    return {
        type: types.ADD_TODO,
        payload: todo
    }
}

export const removeTodo = (todo) => {
    return {
        type: types.REMOVE_TODO,
        payload: todo
    }
}