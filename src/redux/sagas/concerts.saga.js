import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchConcerts(action) {
  try {
    const concertList = yield axios.get(`/api/concerts/`, {
      params: {
        zip: action.payload.zipCode
      }
    });
    console.log("incoming concerts:", concertList.data);
    yield put({
      type: "SET_CONCERTS",
      payload: concertList.data,
    });
  } catch (err) {
    console.log("error getting concerts:", err);
  }
}

function* concertsSaga(action) {
  // fetch all concert events
  yield takeEvery("FETCH_CONCERTS", fetchConcerts);
}

export default concertsSaga;
