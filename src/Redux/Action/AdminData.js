import { USER_ERROR, GET_USER_LIST } from "../ActionType/ActionType";
import axios from "axios";

export const getUsetList = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/users");
    dispatch({
      type: GET_USER_LIST,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};
