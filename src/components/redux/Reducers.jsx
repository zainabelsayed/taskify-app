import { counterReducer } from "../redux/CounterRedux";
import { addMemberReducer } from "./projectMembersReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  addMemberReducer,
  counterReducer,
});

export default reducers;
