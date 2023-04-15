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

function* fetchConcertDetails(action) {
  try {
    const concertDetails = yield axios.get(`/api/concerts/details/${action.payload}`);
    console.log("incoming details:", concertDetails);
    yield put({
      type: "SET_DETAILS",
      payload: concertDetails.data,
    });
  } catch (err) {
    console.log("error getting details:", err);
  }
}

function* concertsSaga(action) {
  // fetch all concert events
  yield takeEvery("FETCH_CONCERTS", fetchConcerts);
  // fetch concert details
  yield takeEvery("FETCH_CONCERT_DETAILS", fetchConcertDetails);
}

export default concertsSaga;
