import {
  REGISTER_USER_DATA,
  DELETEUSER_DATA,
  USER_ERROR_REGISTER,
  } from "../ActionType/ActionType";
  
  const initialState = {
    
    register_user_data: [],
    user_error: [],
  };
  
  const UserDataReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case REGISTER_USER_DATA:
        return {
          ...state,
          register_user_data: action.payload,
        };
      case DELETEUSER_DATA:
        return {
          ...state,
        };
      case USER_ERROR_REGISTER:
        console.log("USER_ERROR_REGISTER", action.payload);
        return {
          ...state,
          user_error: action.payload,
        };
  
      default:
        return state;
    }
  };
  export default UserDataReducer;
  