import * as type from '../actions/types';

const defaultState = {
    language:'vi'
}

const settingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case type.CHANGE_LANGUAGE :{
            return{
                ...state,
                language: action.language
            }
        }
        
        default:
            return state;
    }
}

// const settingReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case type.CHANGE_LANGUAGE:{
//             return{
//                 ...state,
//                 language: action.language,
//             }
//         }
//         default:
//             return state
//     }
// };

export default settingReducer;