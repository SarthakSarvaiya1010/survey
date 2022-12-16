import {
  SELECTED_ANS_DATA,
  POST_LOGIN_DATA,
  } from "../ActionType/ActionType";
  
  const initialState = {
    login_data: [],
    loading: true,
    
  };
  
  const LoginDataReducer = (state = initialState, action) => {
    switch (action.type) {
      
  
      case POST_LOGIN_DATA:
        return {
          ...state,
          login_data: action.payload,
          // uuid: action?.payload?.data?.uuid,
          UserName: action?.payload?.data?.name,
          loading: false,
        };
        case SELECTED_ANS_DATA:
         
          let blank = null;
          if (state?.login_data?.data?.status) {
            state.login_data.data.status = blank;
          }
          return {
            ...state,
          };
     
  
      default:
        return state;
    }
  };
  export default LoginDataReducer;
  