const favorites = (state=[], action) => {
    if (action.type === "SET_FAVORITES") {
        return action.payload;
    }
    return state;
}

export default favorites;