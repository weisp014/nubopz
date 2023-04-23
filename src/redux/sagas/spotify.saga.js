import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// first GET request to spotify to get artist ID for the artist on the details page
// 2nd GET request with the artist ID to get top tracks for that artist
function* getTracks(action) {
  try {
    console.log("artist name:", action.payload);
    const artist = yield axios.get(`/api/spotify/artist/${action.payload}`);
    console.log(artist.data.artists.items[0].id);
    const tracks = yield axios.get("/api/spotify/tracks", {
      params: {
        artistID: artist.data.artists.items[0].id
      },
    });
    console.log('incoming tracks:', tracks.data.tracks);
    yield put({
        type: "SET_TOP_TRACKS",
        payload: tracks.data.tracks
    })
  } catch (err) {
    console.log("error getting spotify tracks:", err);
  }
}

function* clearTracks(action) {
  try {
    yield put({
      type: "CLEAR_TOP_TRACKS",
      payload: [],
    });
  } catch (err) {
    console.log("error clearing spotify tracks:", err);
  }
}

function* spotifySaga() {
  // fetch top tracks for artist
  yield takeLatest("GET_TRACKS", getTracks);
  // clear top tracks for artist
  yield takeLatest("CLEAR_TRACKS", clearTracks);
}

export default spotifySaga;