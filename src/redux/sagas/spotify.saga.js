import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// function* loginSpotify() {
//     try {
//         yield axios.get('/api/spotify/login');
//     } catch (err) {
//         console.log("error with spotify login:", err);
//     }
// }

// function* spotifySaga() {
//     yield takeLatest('LOGIN_SPOTIFY', loginSpotify);
//   }
  
//   export default spotifySaga;