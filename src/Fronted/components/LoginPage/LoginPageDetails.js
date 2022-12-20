import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginPageDetails.css";
import { preview } from "../../../assets/images/index";
import { postLoginData } from "../../../Redux/Action/LoginData";
import { NavLink, useNavigate } from "react-router-dom";
import validate from "../AdminPenal/Add&Edituser/FromValidation";
import useForm from "../AdminPenal/Add&Edituser/useForm";

function LoginPageDetails() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let LoginData = useSelector((state) => state.LoginData);
  const { values, OnIntChange, errors } = useForm(null, validate);

  //-------------- on submit click------------------------------

  const submit = () => {
    dispatch(postLoginData({ email: values.email, password: values.password }));
  };

  //-------------- for localStorage grtItem------------------------------

  let add;
  add = localStorage.getItem("add");
  let admin;
  admin = localStorage.getItem("admin");

  //--------------  useEffect ------------------------------

  useEffect(() => {
    if (admin === "notns" || add === "notns") {
      localStorage.clear();
    }
    //-------------- for localStorage setItem------------------------------

    if (LoginData?.login_data?.data?.status) {
      if (
        LoginData?.login_data?.data?.role_id === 3 ||
        LoginData?.login_data?.data?.role_id === 2
      ) {
        localStorage.setItem("add", "success");
        navigate("/home");
      }
      if (LoginData?.login_data?.data?.role_id === 1) {
        localStorage.setItem("admin", "admin");
        navigate("/admin");
      }

      localStorage.setItem(
        "login_data",
        JSON.stringify(LoginData?.login_data.data)
      );
    }
    //-------------- for navigtion ------------------------------
    else {
      if (add === "success") {
        navigate("/home");
      }
      if (admin === "admin") {
        navigate("/admin");
      }
    }
  }, [LoginData?.login_data.data, add, admin, dispatch, navigate]);

  return (
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
            <NavLink to="/sign_up">Sign up</NavLink>
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
  );
}

export default LoginPageDetails;
