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
    yield put({
      type: "SET_DETAILS",
      payload: concertDetails.data,
    });
  } catch (err) {
    console.log("error getting details:", err);
  }
}

function* fetchMyConcerts(action) {
  try {
    const myConcerts = yield axios.get(`/api/concerts/favorites/`);
    console.log("my concerts:", myConcerts);
    yield put({
      type: "SET_FAVORITES",
      payload: myConcerts.data
    })
  } catch (err) {
    console.log("error getting saved concerts");
  }
}

function* concertsSaga(action) {
  // fetch all concert events
  yield takeEvery("FETCH_CONCERTS", fetchConcerts);
  // fetch concert details
  yield takeEvery("FETCH_CONCERT_DETAILS", fetchConcertDetails);
  // fetch user's saved concerts
  yield takeEvery("FETCH_MY_CONCERTS", fetchMyConcerts);
}

export default concertsSaga;
