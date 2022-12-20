import {
  GET_SURVEY_DATA,
  SELECTED_ANS_DATA,
  SUBMISSION_DATA,
} from "../ActionType/ActionType";

const initialState = {
  surveydata: [],
  submission_data: null,
};

const SurveyDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_ANS_DATA:
      let myrep = action.payload;
      let comper = action?.payload?.comment;
      if (myrep.length > 0) {
        state.surveydata.map((item) => {
          item.question.map((element) => {
            let select = myrep.find((name) => name.qid === element.qid);
            if (select) {
              element.ans = select.ans + 1;
            }
            return "sd";
          });
          return "sd";
        });
      }
      if (comper) {
        state.surveydata.map((item) => {
          if (myrep?.find((e) => e.sId === item.survey_id)) {
            item.comment = myrep.comment;
          }
          return "s";
        });
      }

      return {
        ...state,
      };

    case GET_SURVEY_DATA:
      return {
        ...state,
        surveydata: action.payload.surveydata,
      };

    case SUBMISSION_DATA:
      return {
        ...state,
        submission_data: action.payload,
      };

    default:
      return state;
  }
};
export default SurveyDataReducer;
