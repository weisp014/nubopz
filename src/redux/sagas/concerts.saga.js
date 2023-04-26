import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchConcerts(action) {
  try {
    const concertList = yield axios.get(`/api/concerts/`, {
      params: {
        zip: action.payload.zipCode,
      },
    });
    console.log("incoming concerts:", concertList.data);
    yield put({
      type: "SET_CONCERTS",
      payload: concertList.data,
    });
    yield put({
      type: "SET_LOADING",
    });
  } catch (err) {
    console.log("error getting concerts:", err);
  }
}

function* concertDetails(action) {
  if (action.type === "FETCH_CONCERT_DETAILS") {
    try {
      const concertDetails = yield axios.get(
        `/api/concerts/details/${action.payload}`
      );
      console.log(concertDetails.data);
      yield put({
        type: "SET_DETAILS",
        payload: concertDetails.data,
      });
    } catch (err) {
      console.log("error getting details:", err);
    }
  } else if (action.type === "CLEAR_CONCERT_DETAILS") {
    yield put({
      type: "CLEAR_DETAILS",
      payload: [],
    });
  }
}

function* fetchMyConcerts(action) {
  try {
    const myConcerts = yield axios.get(
      `/api/concerts/favorites/${action.payload.attendedFilter}`
    );
    console.log("my concerts:", myConcerts);
    yield put({
      type: "SET_FAVORITES",
      payload: myConcerts.data,
    });
  } catch (err) {
    console.log("error getting saved concerts");
  }
}

function* saveConcert(action) {
  try {
    //post concert info to user's saved list
    yield axios.post("/api/concerts/", action.payload);
  } catch (err) {
    console.log("error saving concert", err);
  }
}

function* updateConcertAttended(action) {
  try {
    yield axios.put(`/api/concerts/favorites/`, action.payload);
    // fetch user's concerts after updating
    yield put({
      type: "FETCH_MY_CONCERTS",
      payload: action.payload,
    });
  } catch (err) {
    console.log("error updating concert attended", err);
  }
}

function* removeConcert(action) {
  try {
    yield axios.delete(`/api/concerts/favorites/${action.payload.event_id}`);
    // fetch user's concerts after removing
    yield put({
      type: "FETCH_MY_CONCERTS",
      payload: action.payload,
    });
  } catch (err) {
    console.log("error removing concert:", err);
  }
}

function* concertsSaga(action) {
  // fetch all concert events
  yield takeEvery("FETCH_CONCERTS", fetchConcerts);
  // fetch concert details
  yield takeEvery("FETCH_CONCERT_DETAILS", concertDetails);
  // clear concert details
  yield takeEvery("CLEAR_CONCERT_DETAILS", concertDetails);
  // fetch user's saved concerts
  yield takeEvery("FETCH_MY_CONCERTS", fetchMyConcerts);
  // save concert to user list
  yield takeEvery("SAVE_CONCERT", saveConcert);
  // update attended value for concert in user's list
  yield takeEvery("UPDATE_CONCERT_ATTENDED", updateConcertAttended);
  // remove concert from user list
  yield takeEvery("REMOVE_CONCERT", removeConcert);
}

export default concertsSaga;
