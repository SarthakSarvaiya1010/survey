import SurveyDataReducer from "../Reducer/SurveyDataReducer";
import UserDataReducer from "../Reducer/UserDataReducer";
import AdminDataReducer from "../Reducer/AdminDataReducer";
import LoginDataReducer from "../Reducer/LoginDataReducer";






import { combineReducers } from "redux";

const RootReducer = combineReducers({
  postsurveyData: SurveyDataReducer,
  UserData: UserDataReducer,
  AdminData: AdminDataReducer,
  LoginData: LoginDataReducer,
});
export default RootReducer;
