import { counterReducer } from "../redux/CounterRedux";
import { combineReducers } from "redux";

const reducers = combineReducers({
  counterReducer,
});

export default reducers;