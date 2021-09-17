import * as type from './types'

//Login
export const login = (loginInput) => {
    return {
        type: type.LOGIN,   // => run function on saga with type = type.LOGIN
        loginInput
    }
}
//Logout
export const logout = () => {
    return {
        type: type.LOGOUT
    }
}

export const changeRole = (appRole) => {
    return {
        type: type.CHANGE_ROLE,
        appRole
    }
}

//store TimeSheet
export const storeTimesheet = (storeType,timeSheetInfo) => {
    return {
        type: type.STORE_TIMESHEET,  
        storeType,
        timeSheetInfo
    }
}

//change Language

export const changeLanguage = language => {
    // console.log(language);
    return {
        type: type.CHANGE_LANGUAGE,
        language
    }
}

