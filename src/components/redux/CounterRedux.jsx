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
