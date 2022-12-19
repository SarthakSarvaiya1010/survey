import React from "react";
import { useDispatch } from "react-redux";
import { delete_img, edit, palcesHoledr } from "../../../assets/images";
import { Delete_user } from "../../../Redux/Action/UserData";
import "./UsersShow.css";

function UsersShow(props) {
  const { item, hedalState, hedaldata } = props;

  const uditUser = (items) => {
    window.scroll(300, 300);
    hedaldata(items);
    hedalState.setShow(items.id);
  };

  let dispatch = useDispatch();

  const deleteHender = (item) => {
    var clickedOk = window.confirm(" Delete User ");
    if (clickedOk) {
      dispatch(Delete_user(item.id));
      window.location.reload();
    }
  };

  return (
    <div className="boxDivCard">
      <div className="imgDivCard">
        {item?.image_src ? (
          <img
            src={`http://localhost:4000/${item?.image_src}`}
            alt="Avatar"
            style={{ width: "100px" }}
          />
        ) : (
          <img src={palcesHoledr} alt="Avatar" style={{ width: "100px" }} />
        )}
      </div>
      <div className="nameDivCard">
        <p>
          <b>{item?.name}</b>
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {item?.reporting_person_name ? (
            <div>
              <h4>Reporting to</h4>
              <div className="textDiv">
                <h3>{item?.reporting_person_name}</h3>
              </div>
            </div>
          ) : (
            <div>
              <h2>{item?.role}</h2>
            </div>
          )}
          <div className="textDiv">
            <button
              onClick={() => uditUser(item)}
              className="textDivBntt"
              disabled={hedalState.show}
            >
              <img
                src={edit}
                alt="Avatar"
                style={{ width: "25px", margin: "20px 0 0 0" }}
              />
            </button>
            <button className="textDivBntt">
              <img
                src={delete_img}
                alt="Avatar"
                onClick={() => deleteHender(item)}
                style={{ width: "40px", margin: "20px 0 0 0" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersShow;
