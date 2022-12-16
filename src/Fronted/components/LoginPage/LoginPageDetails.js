import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginPageDetails.css";
import { preview } from "../../../assets/images/index";
import { postLoginData } from "../../../Redux/Action/LoginData";
import { useNavigate } from "react-router-dom";
import validate from "../AdminPenal/Add&Edituser/FromValidation";
import useForm from "../AdminPenal/Add&Edituser/useForm";

function LoginPageDetails() {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, OnIntChange, errors } = useForm(null, validate);

  // let SurveyData = useSelector((state) => state.postsurveyData);
  let LoginData = useSelector((state) => state.LoginData);

  const submit = () => {
    dispatch(postLoginData({ email: values.email, password: values.password }));
    localStorage.setItem("add", "success");

    hedalToastButton();
  };

  let add = localStorage.getItem("add");
  let admin = localStorage.getItem("admin");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    add = localStorage.getItem("add");

    if (add !== "success") {
      localStorage.clear();
    }
    if (add === "success") {
      navigate("/home");
    }
    if (admin === "admin") {
      navigate("/admin");
    }

    if (LoginData?.login_data?.data?.status) {
      localStorage.setItem(
        "login_data",
        JSON.stringify(LoginData?.login_data.data)
      );
      alert("done");
      if (LoginData?.login_data?.data?.role_id === 1) {
        localStorage.setItem("admin", "admin");
      }
    }
  }, [LoginData, add, dispatch, navigate]);

  const toast = document.querySelector(".toast");
  const progress = document.querySelector(".progress");

  let timer1, timer2;

  const hedalToastButton = () => {
    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
      toast.classList.remove("active");
    }, 5000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
      progress.classList.remove("active");
    }, 5300);
  };

  const henadCloseIcon = () => {
    toast.classList.remove("active");

    setTimeout(() => {
      progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
  };

  return (
    <div>
      <div>
        <div class="toast ">
          <div class="toast-content">
            <i class="fas fa-solid fa-check check"></i>

            <div class="message">
              <span class="text text-1">Success</span>
              <span class="text text-2">Your changes has been saved</span>
            </div>
          </div>
          <i class="fa-solid fa-xmark close" onClick={() => henadCloseIcon()}>
            +*+
          </i>

          <div class="progress "></div>
        </div>

        <button onClick={() => hedalToastButton()}>Show Toast</button>
      </div>

      <div className="LoginPageBody">
        <div className="box">
          <div className="formLogin">
            <h2>Login</h2>
            <div className="inputBox">
              <span>Email</span>
            </div>
            <form>
              <input
                type="email"
                className="inputBoxDiv"
                name="email"
                onChange={(e) => OnIntChange(e)}
              />
              {errors?.email ? (
                <span className="danger ">{errors.email}</span>
              ) : null}
              <div className="inputBox">
                <span>Password</span>
              </div>
              <input
                type="password"
                className="inputBoxDiv"
                name="password"
                onChange={(e) => OnIntChange(e)}
              />
            </form>
            <div className="linksLog">
              <a href="Reset password">Reset password?</a>
            </div>
            <button
              value="Login"
              className="loginBttn"
              onClick={(e) => submit(e)}
            >
              Login
            </button>
          </div>
        </div>

        <img
          src={preview}
          alt="preview"
          style={{ width: "50%", marginTop: "100px" }}
        ></img>
      </div>
    </div>
  );
}

export default LoginPageDetails;
