const tracks = (state=[], action) => {
    if (action.type === "SET_TOP_TRACKS") {
        return action.payload;
    } else if (action.type === "CLEAR_TOP_TRACKS") {
        return action.payload;
    }
    return state;
}

export default tracks;