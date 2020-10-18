

const initialState = {
}

export const appReducer = (state = initialState,ACTION) => {
    switch (ACTION.type) {
        case "CHANGE" : return {...state,info:ACTION.payload}
        case "USERS" : return {...state,users:ACTION.payload}
        case "TASKS" : return {...state,tasks:ACTION.payload}
        default: return state
    }
}