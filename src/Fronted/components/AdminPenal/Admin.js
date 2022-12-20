import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsetList } from "../../../Redux/Action/AdminData";
import { SelectedAns } from "../../../Redux/Action/SurveyData";
// import { AddUserData } from "../index";
import AddEdituserfrom from "./Add&Edituser/AddEdituserfrom";
import "./Admin.css";
import UsersShow from "./UsersShow";

function Admin() {
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  let AdminData = useSelector((state) => state?.AdminData);

  let user_data = AdminData?.user_list.filter(
    (item) => item?.role_id === 2 || item?.role_id === 3
  );

  useEffect(() => {
    dispatch(getUsetList());
    dispatch(SelectedAns(show));
  }, [dispatch, show]);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setShow(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <div className={show ? "mainDivReg" : null}>
      <div className="bttnDivMain">
        <button
          className="fromBttn"
          onClick={() => {
            (show ? setShow(false) : setShow(true))(setUserData());
          }}
        >
          Add new
        </button>
      </div>
      <div>
        <div className="showUserDiv">
          <div className="showUserDivBox">
            {show ? (
              <AddEdituserfrom
                hedalState={{ setShow, show }}
                hedaldata={userData}
              />
            ) : null}

            <div className="userDivBox">
              {user_data?.map((item, id) => {
                return (
                  <UsersShow
                    key={id}
                    item={item}
                    hedalState={{ setShow, show }}
                    hedaldata={setUserData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
