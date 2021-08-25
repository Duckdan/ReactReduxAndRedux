import { createStore } from "../lib/redux";
import CounterReducer from "./reducers"

export default createStore(CounterReducer)