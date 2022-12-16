/* eslint-disable react/jsx-pascal-case */
import { Footer, Header } from "./Fronted/components/index";
import { Cheess, Home, Login, Adminpage, Protected } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetRelation from "./pages/SetRelation";
import { useEffect, useState } from "react";
import CategoriePg from "./pages/CategoriePg";
import { useSelector } from "react-redux";
import { Add_Edit_userfrom } from "./Fronted/components/index";

function App() {
  
  // const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("add")||"not");
  let isLoggedIn = localStorage.getItem("add");
 
  let admin = localStorage.getItem("admin") ;

  let SurveyData = useSelector((state) => state?.postsurveyData);

  const [user, setUser] = useState("not");

  let LoginData = useSelector((state) => state.LoginData);

  console.log("login_data", SurveyData);


  useEffect(() => {
    if (LoginData?.login_data?.data?.role_id === 3 ||LoginData?.login_data?.data?.role_id === 2 ||isLoggedIn ) {
      setUser({
        roles: ["super"],
      });
    }
    if (LoginData?.login_data?.data?.role_id === 1 || admin) {
      setUser({
        roles: ["admin"],
      });
    }
  }, [LoginData?.login_data?.data?.role_id, admin, isLoggedIn]);


  console.log("isLoggedIn in app js ", user);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Protected isAllowed={!!user} redirectPath="/categoriePg">
                <Login />
              </Protected>
            }
          />
          <Route
            path="/home"
            element={
              <Protected
                isAllowed={!!user && user?.roles?.includes("super")}
                redirectPath="/"
              >
                <Home />
              </Protected>
            }
          />
          <Route path="/cheess" element={<Cheess />} />

          <Route
            path="/admin"
            element={
              <Protected
                isAllowed={!!user && user?.roles?.includes("admin")}
                redirectPath="/"
              >
                <Adminpage />
              </Protected>
            }
          />
          <Route path="/setRelation" element={<SetRelation />} />
          <Route path="/categoriePg" element={<CategoriePg />} />
          <Route path="/sign_up" element={<Add_Edit_userfrom />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
