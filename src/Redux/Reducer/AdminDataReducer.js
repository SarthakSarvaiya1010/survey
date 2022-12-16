import {
     GET_USER_LIST
  } from "../ActionType/ActionType";
  
  const initialState = {

    user_list: [],
  };
  
  const AdminDataReducer = (state = initialState, action) => {
    switch (action.type) {
    
  
      case GET_USER_LIST:
        return {
          ...state,
          user_list: action.payload,
        };
     
  
      default:
        return state;
    }
  };
  export default AdminDataReducer;
  