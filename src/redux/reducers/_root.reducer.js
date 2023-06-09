import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import concertList from './concerts.reducer';
import details from './details.reducer';
import favorites from './favorites.reducer';
import loading from './loading.reducer';
import tracks from './tracks.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  concertList, // list of upcoming concerts
  details, // concert details
  favorites, // logged in user's saved concerts
  loading, // track loading during server requests
  tracks, // top tracks for artist on details page
});

export default rootReducer;
