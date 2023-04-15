const concertList = (state=[], action) => {
    if (action.type === "SET_CONCERTS") {
        return action.payload;
    }
    return state;
}

export default concertList;