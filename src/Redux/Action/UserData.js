import {
  USER_ERROR,
  REGISTER_USER_DATA,
  UPDATE_USER_DATA,
  DELETEUSER_DATA,
  USER_ERROR_REGISTER,
} from "../ActionType/ActionType";
import axios from "axios";

export const Register_user = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/register", data);
    console.log("header", res.data);
    dispatch({
      type: REGISTER_USER_DATA,
      payload: { data: res },
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR_REGISTER,
      payload: { data: e.response.data },
    });
  }
};

export const Update_user = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`http://127.0.0.1:4000/edit/${id}`, data);
    dispatch({
      type: UPDATE_USER_DATA,
      payload: { data: res },
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};

export const Delete_user = (id) => async (dispatch) => {
  console.log("Delete_user", id);
  try {
    const res = await axios.delete(`http://localhost:4000/delete/${id}`);
    dispatch({
      type: DELETEUSER_DATA,
      payload: { data: res },
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};
