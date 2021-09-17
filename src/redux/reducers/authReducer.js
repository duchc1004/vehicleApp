import * as type from '../actions/types';

const defaultState = {
    loggedInUser: null,
    loading: false,
    error: null,
    isLoggedIn: false,
    username: '',
    appRole:'',
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case type.LOGIN_PENDING:{
            return{
                ...state,
                loading: true,
            }
        }

        case type.LOGIN_SUCCESS:{
            return{
                ...state,
                loggedInUser: action.loggedInUser,
                loading: false,
                isLoggedIn: true,
                appRole: action.loggedInUser.ROLE
            }
        }

        case type.LOGIN_ERROR:{
            return{
                ...state,
                loading: false,
                isLoggedIn: false,
                error: action.error
            }
        }

        case type.LOGOUT:{
            return{
                loggedInUser: null,
                loading: false,
                error: null,
                isLoggedIn: false
            }
        }

        case type.CHANGE_ROLE:{
            return{
                ...state,
                appRole: action.appRole
            }
        }

        default:
            return state
            
    }
};

export default authReducer;