import { createStore } from "redux";
import reducer from "./Reducers";

export const Store = createStore(reducer);