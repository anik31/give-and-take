export function allPullsReducer(state, action){
    switch(action.type){
        case "SET_ALL_PULLS":
            return state = action.payload;
        default:
            return state;
    }
}