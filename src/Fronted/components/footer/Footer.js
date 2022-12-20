import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Footer.css";
import { submission } from "../../../Redux/Action/SurveyData";

function Footer() {
  let dispatch = useDispatch();
  let Surveydata = useSelector((state) => state.postsurveyData);
  let worker_data = JSON.parse(localStorage.getItem("worker_data_selected"));
  let uuid = localStorage.getItem("uuid");
  let subUUID = uuid;

  const submission_data = () => {
    alert("submited");
    dispatch(
      submission({
        uuid: subUUID,
        surveydata: Surveydata?.surveydata,
        wuuid: worker_data,
      })
    );
  };

  let login_data = JSON.parse(localStorage.getItem("login_data"));

  return (
    <div className="footerBttn">
      <div className="finishBox">
        <div className="finishBoxBlank"></div>
        <div className="finishBttn">
          {login_data?.role_id === 2 || login_data?.role_id === 3 ? (
            <button
              className="bttnDiv"
              disabled={!Surveydata?.surveydata[2]?.comment}
              onClick={() => submission_data()}
            >
              Finish
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Footer;
