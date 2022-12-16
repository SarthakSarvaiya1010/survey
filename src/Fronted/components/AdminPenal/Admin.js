import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsetList } from "../../../Redux/Action/AdminData";
// import { AddUserData } from "../index";
import Add_Edit_userfrom from "./Add&Edituser/Add_Edit_userfrom";
import "./Admin.css";
import UsersShow from "./UsersShow";

function Admin() {
 
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);

  let AdminData = useSelector((state) => state?.AdminData);




  useEffect(() => {
    dispatch(getUsetList());
  }, [dispatch]);

  let user_data = AdminData?.user_list.filter(
    (item) => item?.role_id === 2 || item?.role_id === 3
  );
  console.log(
    "user_datauser_datauser_datauser_datauser_datauser_data",
    user_data
  );
 
  console.log("userDatauserData", userData);

  return (
    <div className={show ? "mainDivReg" : null}>
      <div className="bttnDivMain">
        <button
          className="bttn"
          onClick={() => {
            (show ? setShow(false) : setShow(true))(setUserData());
          }}
        >
          Add new
        </button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", width: "75%" }}>
            {show ? (
              // eslint-disable-next-line react/jsx-pascal-case
              <Add_Edit_userfrom hedalState={{ setShow, show }}  hedaldata={userData}               />
            ) : null}

            {user_data?.map((item, id) => {
              return (
                <div
                  key={id}
                  style={{
                    marginTop: "25px",
                    width: "258px",
                    marginBottom: "25px",
                  }}
                >
                  <UsersShow
                    item={item}
                    hedalState={{ setShow, show }}
                    hedaldata={setUserData}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;