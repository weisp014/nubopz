import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchConcerts() {
  try {
    const concertList = yield axios.get("/api/concerts");
    console.log("incoming concerts:", concertList.data);
    yield put({
      type: "SET_CONCERTS",
      payload: concertList.data,
    });
  } catch (err) {
    console.log("error getting concerts:", err);
  }
}

function* concertsSaga() {
  // fetch all concert events
  yield takeEvery("FETCH_CONCERTS", fetchConcerts);
}

export default concertsSaga;
