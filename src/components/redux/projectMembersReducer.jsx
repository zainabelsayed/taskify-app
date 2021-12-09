// const redux = require("redux");
// const createStore = redux.createStore;
/* -------------------------------------------------------------------------- */
/*                              add member action                             */
/* -------------------------------------------------------------------------- */
const ADD_MEMBER = "ADD_MEMBER";

export const addMemberAction = (payload) => {
  return {
    type: ADD_MEMBER,
    payload,
  };
};

/* -------------------------------------------------------------------------- */
/*                            remove member action                            */
/* -------------------------------------------------------------------------- */
const REMOVE_MEMBER = "REMOVE_MEMBER";

export const removeMemberAction = (payload) => {
  return {
    type: REMOVE_MEMBER,
    payload,
  };
};
/* -------------------------------------------------------------------------- */
/*                                intial state                                */
/* -------------------------------------------------------------------------- */
const intialState = {
  projectMembers: [],
};
/* -------------------------------------------------------------------------- */
/*                             add member reducer                             */
/* -------------------------------------------------------------------------- */

export const addMemberReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return {
        ...state.projectMembers,
        projectMembers: [...state.projectMembers, action.payload],
      };
    case REMOVE_MEMBER:
      return {
        ...state.projectMembers,
        projectMembers: state.projectMembers.filter(
          (item, index) => item !== action.payload
        ),
      };
    default:
      return state;
  }
};
/* -------------------------------------------------------------------------- */
/*                                    store                                   */
/* -------------------------------------------------------------------------- */

// export const store = createStore(addMemberReducer);
