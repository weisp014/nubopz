// For any incoming type, return not state
const loading = (state=false, action) => {
    if (action.type === "SET_LOADING") {
        return !state;
    }
    return state;
}

export default loading;