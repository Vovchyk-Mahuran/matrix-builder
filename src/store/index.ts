import { createStore, combineReducers } from 'redux';
import { matrixReducer } from './reducers/matrixReducer';

const rootReducer = combineReducers({
  matrix: matrixReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
