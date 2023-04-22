const details = (state=[], action) => {
    if (action.type === "SET_DETAILS") {
        return action.payload;
    } else if (action.type === "CLEAR_DETAILS") {
        return action.payload;
    }
    return state;
}

export default details;