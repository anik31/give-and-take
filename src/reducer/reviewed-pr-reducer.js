export function reviewedPullsReducer(state, action){
    switch(action.type){
        case "SET_REVIEWED_PULLS":
            return state = action.payload;
        default:
            return state;
    }
}