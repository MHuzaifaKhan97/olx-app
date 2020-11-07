import { ADD_POST, FETCH_BY_CATEGORY, FETCH_BY_ID, FETCH_POST } from '../constant';

const INITIAL_STATE = {
    posts: [],
    categories: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_POST: return {
            ...state,
            posts: [action.payload, ...state.posts]
        }
        case FETCH_POST: return {
            ...state,
            posts: [action.payload, ...state.posts]
        }
        case FETCH_BY_ID: return {
            ...state,
            posts: [action.payload]
        }
        case FETCH_BY_CATEGORY: return {
            state,
            posts: [action.payload, ...state.categories],
        }
        default: return state;
    }
}
export default reducer;