import {
  REGISTERING,
  DELETEUSER_DATA,
  USER_ERROR_REGISTER,
} from "../ActionType/ActionType";

const initialState = {
  register_user_data: [],
  user_error: [],
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTERING:
      return {
        ...state,
        register_user_data: action.payload,
      };
    case DELETEUSER_DATA:
      return {
        ...state,
      };
    case USER_ERROR_REGISTER:
      return {
        ...state,
        user_error: action.payload,
      };

    default:
      return state;
  }
};
export default UserDataReducer;
