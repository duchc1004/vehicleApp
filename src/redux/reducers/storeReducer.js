import * as type from '../actions/types';

const defaultState = {
    storeLoading: false,
    error: null,
    isLoggedIn: false
}

const storeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case type.STORE_TIMESHEET_PENDING:{
            return{
                ...state,
                storeLoading: true,
            }
        }

        case type.STORE_TIMESHEET_SUCCESS:{
            return{
                ...state,
                storeLoading: false,
            }
        }

        case type.STORE_TIMESHEET_ERROR:{
            return{
                ...state,
                storeLoading: false,
                error: action.error
            }
        }

        default:
            return state
            
    }
};

export default storeReducer;