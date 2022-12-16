import React from "react";
import "./header.css";
import { surveyImg, loginIcon } from "../../../assets/images/index";
import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function Header() {
  // let Surveydata = useSelector((state) => state?.postsurveyData);
  let login_data = JSON.parse(localStorage.getItem("login_data"));

  const navigate = useNavigate();

  return (
    <div className="headerDiv">
      <div className="headerIcon">
        <div>
          <img
            src={surveyImg}
            alt="surveyImg"
            style={{ height: "40px", width: "65px" }}
          />
          <span>Survey</span>
        </div>
        {login_data?.role_id ? (
          <div>
            <span>hello, {login_data?.name}</span>
            <NavLink to="/">
              <img
                src={
                  login_data?.profile
                    ? `http://localhost:4000/${login_data?.profile}`
                    : loginIcon
                }
                alt="loginIcon"
                style={{ height: "40px", borderRadius: "50%", width: "65px" }}
              />
            </NavLink>
            <button
              className="logOutBttn"
              onClick={() => {
                navigate("/");
                alert("Log Out succeful");
                window.location.reload();
                localStorage.setItem("add", "not");
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
