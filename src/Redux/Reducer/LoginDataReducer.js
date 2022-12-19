import { SELECTED_ANS_DATA, LOGINPROCESSING } from "../ActionType/ActionType";

const initialState = {
  login_data: [],
  loading: true,
};

const LoginDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINPROCESSING:
      return {
        ...state,
        login_data: action.payload,
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
