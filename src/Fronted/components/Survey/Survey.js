import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkMark } from "../../../assets/images/index";
import "./survey.css";
import { getSurveyData, SelectedAns } from "../../../Redux/Action/SurveyData";

function Survey() {
  const [ansData, setAnsData] = useState([]);
  const [comment, setComment] = useState(null);
  const [test, setTest] = useState(null);
  const [expanded, setExpanded] = useState(1);
  let dispatch = useDispatch();
  let SurveyData = useSelector((state) => state.postsurveyData);
  let LoginData = useSelector((state) => state.LoginData);

  //-------------- for localStorage setItem------------------------------

  if (LoginData?.login_data.data?.worker_data) {
    localStorage.setItem(
      "worker_data",
      JSON.stringify(LoginData?.login_data.data?.worker_data)
    );
    localStorage.setItem(
      "user_Name",
      JSON.stringify(LoginData?.login_data.data?.name)
    );
    localStorage.setItem(
      "login_data",
      JSON.stringify(LoginData?.login_data.data)
    );
  }

  let uuid = LoginData?.login_data?.data?.uuid;

  if (uuid) {
    localStorage.setItem("uuid", uuid);
  }

  //-------------- for localStorage grtItem------------------------------

  let logId1 = localStorage.getItem("uuid");
  let login_data = JSON.parse(localStorage.getItem("login_data"));
  let worker_data = JSON.parse(localStorage.getItem("worker_data") || null);

  let worker_data_selected = JSON.parse(
    localStorage.getItem("worker_data_selected")
  );

  //--------------  useEffect ------------------------------

  useEffect(() => {
    dispatch(SelectedAns(ansData));
  }, [ansData, dispatch]);

  useEffect(() => {
    if (login_data?.uuid && !worker_data_selected) {
      dispatch(getSurveyData({ logId1: login_data?.uuid }));
    }
    if (logId1 && worker_data_selected) {
      dispatch(getSurveyData({ logId1, worker_data_selected }));
    }
  }, [dispatch, logId1, login_data?.uuid, worker_data_selected]);

  //--------------  Date ------------------------------

  const d = new Date();
  let month = d.toLocaleString("default", { month: "long", year: "numeric" });
  const headlClick = () => {
    dispatch(getSurveyData({ logId1 }));
  };

  //-------------- get  survey person data ------------------------------

  const headlChenge = (e) => {
    if (e.target.value !== "select from droopdown" && e.target.value) {
      dispatch(getSurveyData(e.target.value));
      localStorage.setItem(
        "worker_data_selected",
        JSON.stringify(e?.target?.value) || "[]"
      );
      setTest(null);
      setAnsData([]);
      setComment(null);
      setExpanded(1);
    }
  };

  // --------------drop down accordion   ------------------------------
  const accordion = (id) => {
    setTest(id);
    setExpanded(id + 1);
  };

  // --------------select ans from  drop down   ------------------------------

  const headlClickAns = (ansId, qId, sId) => {
    let existingAns = ansData.filter((ans) => ans.qid === qId);
    if (existingAns.length > 0) {
      existingAns.forEach((f) => {
        let ansDataInd = ansData.findIndex((e) => e.qid === f.qid);
        ansData[ansDataInd].ans = ansId;
      });
      setAnsData([...ansData]);
    } else {
      ansData.length === 0
        ? setAnsData([{ qid: qId, ans: ansId, sId: sId }])
        : setAnsData((ansData) => [
            ...ansData,
            { qid: qId, ans: ansId, sId: sId },
          ]);
    }
  };

  // --------------onClick Save data   ------------------------------

  const onSavedata = (id) => {
    let ref = parseInt(id) + 1;
    let ref1 = parseInt(id);
    dispatch(SelectedAns(ansData));
    setExpanded(ref);
    setTest(ref1);
    setComment(null);
  };
  ansData.comment = comment;

  // --------------onCheng Comment data   ------------------------------

  const textareaInput = (e) => {
    setComment(e.target.value);
  };

  // -------------- static ans  data   ------------------------------

  let surveyquestionData = [
    { ans: 1 },
    { ans: 2 },
    { ans: 3 },
    { ans: 4 },
    { ans: 5 },
    { ans: 6 },
    { ans: 7 },
    { ans: 8 },
    { ans: 9 },
    { ans: 10 },
  ];

  return (
    <div className="bgd">
      <div className="contentHeader">
        <div className="contentHeaderTital">
          <h2>{month}</h2>
        </div>
        <h2>
          <button value={logId1} onClick={(e) => headlClick(e)}>
            my survey
          </button>
        </h2>
        <div>
          <select onChange={(e) => headlChenge(e)} className="contentSelect">
            <option value={null}>select from droopdown </option>
            {worker_data
              ? worker_data[0]?.id
                ? worker_data?.map((item) => {
                    return (
                      <option
                        value={item.id}
                        selected={worker_data_selected === item.id}
                      >
                        {item.name}
                      </option>
                    );
                  })
                : null
              : null}
          </select>
        </div>
      </div>

      {SurveyData.surveydata.map((item, id) => {
        return (
          <div key={id}>
            <div className="contentHeaderqns">
              <div
                className={
                  expanded - 1 >= item.survey_id
                    ? "contentHeaderqnsOneSucces"
                    : expanded >= item.survey_id
                    ? "contentHeaderqnsOne"
                    : "contentHeaderqnsOneDisable"
                }
              >
                <button
                  onClick={() => accordion(`${item.survey_id}`)}
                  disabled={
                    expanded > item.survey_id || expanded < item.survey_id
                  }
                  className={
                    expanded - 1 >= item.survey_id
                      ? "divBttnAccordionSucces"
                      : expanded >= item.survey_id
                      ? " divBttnAccordion"
                      : "divBttnAccordionDisable"
                  }
                >
                  <div>
                    <span className="headerqnsText">
                      <img
                        src={checkMark}
                        alt="checkMark"
                        style={{ height: "35px", width: "55px" }}
                      />
                      <div className="SurveyTextDiv">{item.title}</div>
                    </span>
                  </div>
                </button>
                {expanded - 1 >= item.survey_id ? (
                  <button
                    className="contentHeaderqnsBttn"
                    disabled={ansData.length < 5}
                    onClick={() => onSavedata(`${item.survey_id}`)}
                  >
                    saved
                  </button>
                ) : expanded >= item.survey_id ? (
                  <button
                    className="contentHeaderqnsBttn"
                    disabled={ansData.length < 5}
                    onClick={() => onSavedata(`${item.survey_id}`)}
                  >
                    save
                  </button>
                ) : null}
              </div>
              <div className="expandedsurvay">
                {expanded === item.survey_id ? (
                  <div>
                    <div className="surverbgd">
                      {item.question.map((element, qId) => {
                        return (
                          <div key={qId}>
                            <div>{element.question}</div>

                            <div className="inpMainDiv">
                              {surveyquestionData.map((name, ansId) => {
                                let isActive = ansData.filter(
                                  (qa) => qa.qid === element.qid
                                );

                                // eslint-disable-next-line eqeqeq
                                if (
                                  ansData.length === 5 &&
                                  // eslint-disable-next-line eqeqeq
                                  parseInt(test) == item.survey_id - 1
                                ) {
                                  setAnsData([]);
                                  setTest(null);
                                }
                                let ansactive;

                                if (element.ans) {
                                  ansactive =
                                    ansId <= element.ans - 1 ? "active" : "";
                                } else if (isActive.length > 0) {
                                  ansactive =
                                    ansId <= isActive[0].ans ? "active" : "";
                                } else {
                                  ansactive =
                                    ansId < element.ans - 1 ? "active" : "";
                                }

                                return (
                                  <label
                                    key={ansId}
                                    className={`inpDiv ${
                                      ansId <= 3
                                        ? "red"
                                        : ansId >= 4 && ansId <= 6
                                        ? "orange"
                                        : "green "
                                    } ${ansactive}`}
                                    htmlFor={`${ansId}${element.qid}${id}`}
                                  >
                                    <input
                                      id={`${ansId}${element.qid}${id}`}
                                      className="radioInput"
                                      name={element.qid}
                                      type="radio"
                                      onChange={() =>
                                        headlClickAns(
                                          ansId,
                                          element.qid,
                                          item.survey_id
                                        )
                                      }
                                      value={name.ans}
                                    />
                                    {name.ans}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                      {expanded === item.survey_id ? (
                        <div>
                          <p>Your review</p>
                          <textarea
                            key={item?.comment}
                            className="textareaInput"
                            onChange={(e) => textareaInput(e)}
                            defaultValue={item?.comment}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Survey;
