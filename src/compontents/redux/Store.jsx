import { createStore } from "redux";
import reducers from "./Reducers";

export const Store = createStore(reducers);
