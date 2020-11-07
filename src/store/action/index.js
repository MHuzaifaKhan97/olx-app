import { ADD_POST, FETCH_BY_CATEGORY, FETCH_BY_ID, FETCH_POST } from "../constant"
import { db } from '../../firebase';

export const addPost = (post) => {
    return {
        type: ADD_POST,
        payload: post
    }
}

export const fetchPost = () => {
    return (dispatch) => {
        db.ref('post').on('value', (data) => {
            dispatch({
                type: FETCH_POST,
                payload: data.val()
            })
        })
    }
}
export const fetchById = (id) => {
    return (dispatch) => {
        db.ref('post').on('value', (data) => {
            for (var key in data.val()) {
                if (id === key) {
                    dispatch({
                        type: FETCH_BY_ID,
                        payload: data.val()[key]
                    })
                }
            }
        })
    }
}
export const fetchByCategory = (category) => {
    return (dispatch) => {
        db.ref("post").on('value', (data) => {
            for (var key in data.val()) {
                if (data.val()[key].subcategory === category) {
                    dispatch({
                        type: FETCH_BY_CATEGORY,
                        payload: data.val()[key]
                    })
                }
            }
        })
    }
}