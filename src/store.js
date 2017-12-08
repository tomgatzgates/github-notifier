import { createStore } from "redux";
import reducer from 'reducers/index';
import { saveState, loadState } from './localStorage';
// Store
const initialState = loadState();
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
})

export default store;
