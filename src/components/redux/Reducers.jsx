import { counterReducer } from "../redux/CounterRedux";
import { addMemberReducer } from "./projectMembersReducer";
import { combineReducers } from "redux";

export default combineReducers({
  counterReducer,
  addMemberReducer
})
