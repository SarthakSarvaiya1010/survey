import { USER_ERROR, POST_LOGIN_DATA } from "../ActionType/ActionType";
import axios from "axios";

export const postLoginData = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/login", data);
    dispatch({
      type: POST_LOGIN_DATA,
      payload: { data: res.data },
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};
