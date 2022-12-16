import {
  POST_SURVEY_DATA,
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
    case POST_SURVEY_DATA:
      return {
        ...state,
        post_survey_data: action.payload,
      };
    case SELECTED_ANS_DATA:
      console.log("action.payload", action.payload);
      let myrep = action.payload;
      let comper = action?.payload?.comment;

      // let check= myrep[0].comment
      console.log("commentdata", comper);
      if (myrep.length > 0) {
        console.log("action.payload after blacck ", myrep);
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
            console.log(
              "item.comment",
              item.comment,
              "myrep.comment",
              myrep.comment
            );
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
