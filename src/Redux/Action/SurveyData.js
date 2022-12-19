import {
  GET_SURVEY_DATA,
  SELECTED_ANS_DATA,
  USER_ERROR,
  SUBMISSION_DATA,
} from "../ActionType/ActionType";
import axios from "axios";





export const SelectedAns = (data) => async (dispatch) => {
  console.log("SelectedAns", data);
  dispatch({
    type: SELECTED_ANS_DATA,
    payload: data,
  });
};

export const getSurveyData = (data    ) => async (dispatch) => {
  console.log("uuid_uuid_uuid",data);

  try {
    const res = await axios.get(`http://127.0.0.1:4000/survey/data/${data?.logId1}${data?.worker_data_selected  ? "?wuuid="+data?.worker_data_selected :'' }`);
    dispatch({
      type: GET_SURVEY_DATA,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};


export const submission = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/survey/submission",
      data
    );
    console.log("header", res.data);
    dispatch({
      type: SUBMISSION_DATA,
      payload: { data: res },
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};

