import { loaderReduce } from './loader.reducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  loaderState: loaderReduce,
});
