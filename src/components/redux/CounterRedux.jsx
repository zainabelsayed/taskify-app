import { getDatabase, ref, get, child } from "firebase/database";
//Actions
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const incrementNum = (payload) => {
  return {
    type: INCREMENT,
    payload,
  };
};

export const decrementNum = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};

//State
const initialState = {
  workCounter: 0,
  familyCounter: 0,
  personalCounter: 0,
  businessCounter: 0,
  friendsCounter: 0,
};

const userName = sessionStorage.getItem("user");
const dbRef = ref(getDatabase());
let temp = [0, 0, 0, 0, 0];
get(child(dbRef, `users/${userName}/projects/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const arr = [];
    Object.keys(snapshot.val()).forEach((key) =>
      arr.push({ name: key, data: snapshot.val()[key] })
    );

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data.category === "Work") temp[0] += 1;
      else if (arr[i].data.category === "Family") temp[1] += 1;
      else if (arr[i].data.category === "Personal") temp[2] += 1;
      else if (arr[i].data.category === "Business") temp[3] += 1;
      else temp[4] += 1;
    }
    initialState.familyCounter = temp[1];
    initialState.workCounter = temp[0];
    initialState.personalCounter = temp[2];
    initialState.businessCounter = temp[3];
    initialState.friendsCounter = temp[4];
  }
});

//Reducer
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      if (action.payload === "Work")
        return { ...state, workCounter: state.workCounter + 1 };
      else if (action.payload === "Family")
        return { ...state, familyCounter: state.familyCounter + 1 };
      else if (action.payload === "Personal")
        return { ...state, personalCounter: state.personalCounter + 1 };
      else if (action.payload === "Business")
        return { ...state, businessCounter: state.businessCounter + 1 };
      else return { ...state, friendsCounter: state.friendsCounter + 1 };

    case DECREMENT:
      if (action.payload === "Work")
        return { ...state, workCounter: state.workCounter - 1 };
      else if (action.payload === "Family")
        return { ...state, familyCounter: state.familyCounter - 1 };
      else if (action.payload === "Personal")
        return { ...state, personalCounter: state.personalCounter - 1 };
      else if (action.payload === "Business")
        return { ...state, businessCounter: state.businessCounter - 1 };
      else return { ...state, friendsCounter: state.friendsCounter - 1 };
    default:
      return state;
  }
};
