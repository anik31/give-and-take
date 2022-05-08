export function myPullsReducer(state, action){
    switch(action.type){
        case "SET_MY_PULLS":
            return {...state, myPulls: action.payload};
        case "SET_USER_INFO":
            return {...state, userInfo: action.payload};
        default:
            return state;
    }
}