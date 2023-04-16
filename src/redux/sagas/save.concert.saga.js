import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* saveConcert(action) {
    try {
        //post concert info to user's saved list
        yield axios.post("/api/concerts/", action.payload);

    } catch (err) {
        console.log("error saving concert", err);
    }
}

function* saveConcertSaga(action) {
    // save concert to user list
    yield takeEvery("SAVE_CONCERT", saveConcert);
}

export default saveConcertSaga;