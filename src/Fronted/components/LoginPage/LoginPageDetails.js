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

  const { values, OnIntChange, errors } = useForm(null, validate);

  // let SurveyData = useSelector((state) => state.postsurveyData);
  let LoginData = useSelector((state) => state.LoginData);

  const submit = () => {
    dispatch(postLoginData({ email: values.email, password: values.password }));

    hedalToastButton();
  };

  
  let add ;
  add = localStorage.getItem("add");
  let admin ; 
  admin=localStorage.getItem("admin");


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    if (add !== "success" && admin !== "admin") {
      localStorage.clear();
    }else{console.log("done");}
    
    
    
    if (LoginData?.login_data?.data?.status) {
    
      
         if (LoginData?.login_data?.data?.role_id === 3 ||LoginData?.login_data?.data?.role_id === 2) {
          
          localStorage.setItem("add", "success");
          navigate("/home");



          console.log("LoginData?.login_data?.data?.role_id === 3 ||LoginData?.login_data?.data?.role_id === 2>>>>home");  
          
          

          }
           else if(LoginData?.login_data?.data?.role_id === 1 ){
          navigate("/admin")

          localStorage.setItem("admin", "admin");
          
          
          console.log("LoginData?.login_data?.data?.role_id === 1 ============================>>>>admin");
          
          
        }
        
       localStorage.setItem(
        "login_data",
        JSON.stringify(LoginData?.login_data.data)
        );
      
        
    

    }else {
      
      if (add ==="success") {
  
          navigate("/home");
        console.log("navigate  =====>>>>home");
        }
      else if(admin === "admin") {
        console.log("navigate  =====>>>>admin");
          navigate("/admin");
      }

    }
  }, [LoginData?.login_data?.data , add, admin, dispatch, navigate]);

  
  
  
  const toast = document.querySelector(".toast");
  const progress = document.querySelector(".progress");

  let timer1, timer2;

  const hedalToastButton = () => {
    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
      toast.classList.remove("active");
    }, 2000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
      progress.classList.remove("active");
    }, 2100);
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
    </div>
  );
}

export default LoginPageDetails;
