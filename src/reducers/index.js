import { GET_USERS, SAVE_USER  } from '../utils/constants';

export const initialState = {
    users: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                users: action.payload
            }
        case SAVE_USER:
            return {
                users:[...state.users,action.payload]
            }
    }
}
