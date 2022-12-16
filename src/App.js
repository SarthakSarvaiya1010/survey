import { Footer, Header } from "./Fronted/components/index";
import { Cheess, Home, Login, Adminpage ,Protected } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetRelation from "./pages/SetRelation";
import { useEffect, useState } from "react";
import CategoriePg from "./pages/CategoriePg";
import { useSelector } from "react-redux";

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("add")||"not");
  let isLoggedIn = localStorage.getItem("add") || "not";
  let login_data = JSON.parse(localStorage.getItem("login_data"));
  let admin = localStorage.getItem("admin");

  let SurveyData = useSelector((state) => state?.postsurveyData);

  const [user, setUser] = useState(localStorage.getItem("add") || "not");

  console.log("login_data", login_data, SurveyData);
  useEffect(() => {
    if (isLoggedIn) {
      setUser({
        roles: ["super"],
      });
    }
    if (admin) {
      setUser({
        roles: ["admin"],
      });
    }
  }, [admin, isLoggedIn]);
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
          {/* </Switch> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
