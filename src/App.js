import { Footer, Header } from "./Fronted/components/index";
import { Home, Login, Adminpage, Protected } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEdituserfrom } from "./Fronted/components/index";

function App() {
  let isLoggedIn = localStorage.getItem("add");

  let admin = localStorage.getItem("admin");

  const [user, setUser] = useState("not");

  let LoginData = useSelector((state) => state.LoginData);

  useEffect(() => {
    if (
      LoginData?.login_data?.data?.role_id === 3 ||
      LoginData?.login_data?.data?.role_id === 2 ||
      isLoggedIn
    ) {
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

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="/sign_up" element={<AddEdituserfrom />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
