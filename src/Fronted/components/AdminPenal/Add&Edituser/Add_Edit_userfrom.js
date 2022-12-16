import React, { useState } from "react";
import { useSelector } from "react-redux";
import useForm from "./useForm"
import validate from "./FromValidation";
import { palcesHoledr } from "../../../../assets/images";
import "./Add_Edit_userfrom.css";

function Add_Edit_userfrom(props) {
  const { hedalState, hedaldata } = props;
  const [image, setImage] = useState(null);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  let AdminData = useSelector((state) => state?.AdminData);


  const { values, OnIntChange, handleSubmit, errors } = useForm(
    image,
    validate,
    hedaldata
  );

  // ---------- hedalImgChage----------
  const hedalImgChage = (event) => {
    const [file] = event.target.files;

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;

      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setImage(file);
  };

  return (
    <div>
      <div className="addUserDataMain">
        <div className="boxAddUserMain">
          <div className="addUserMainLimit">
            {/* -----  Add New Use -------- */}
            <div className="textAddDiv">
              {hedaldata ? <h1>Edit User</h1> : <h1>Add New User</h1>}
            </div>
            {/*  From start */}
            <div className="mainIptDiv">
              <div className="f_l_IptDiv_img">
                <div className="">
                  <label className="imgSelectDiv" htmlFor="img">
                    <input
                      type="file"
                      accept="image/*"
                      id="img"
                      ref={imageUploader}
                      onChange={hedalImgChage}
                      className="filetype"
                      style={{ display: "none" }}
                      name="image_src"
                    />
                    <img
                      alt=""
                      ref={uploadedImage}
                      style={{ height: "120px", width: "120px" }}
                      src={
                        hedaldata?.image_src
                          ? `http://localhost:4000/${hedaldata?.image_src}`
                          : palcesHoledr
                      }
                    />
                  </label>
                </div>
                <div>
                  <h4>select display image to Show</h4>
                </div>
              </div>
              {/* enter  First Name */}
              <div className="f_l_IptDiv">
                <div className="f_l_IptDivMain">
                  First Name
                  <input
                    defaultValue={hedaldata ? hedaldata.name : null}
                    value={values.name}
                    type="text"
                    className="iptDiv"
                    name="name"
                    onChange={(e) => OnIntChange(e)}
                  />
                  <div style={{ position: "revert" }}>
                    {errors?.name ? (
                      <p className="danger ">{errors.name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="f_l_IptDivMain">
                  Last Name
                  <br />
                  <input
                    type="text"
                    defaultValue={hedaldata ? hedaldata.last_name : null}
                    className="iptDiv"
                    name="last_name"
                    onChange={(e) => OnIntChange(e)}
                  />
                  {errors?.last_name ? (
                    <p className="danger ">{errors.last_name}</p>
                  ) : null}
                </div>
              </div>
              <div>Email address</div>
              <input
                type="text"
                defaultValue={hedaldata ? hedaldata.email : null}
                className="iptDiv"
                name="email"
                onChange={(e) => OnIntChange(e)}
              />
              {errors?.email ? <p className="danger ">{errors.email}</p> : null}

              <div>Phone Number</div>
              <input
                type="number"
                className="iptDiv"
                defaultValue={hedaldata ? hedaldata.phone : null}
                name="phone"
                onChange={(e) => OnIntChange(e)}
              />
              {errors?.phone ? <p className="danger ">{errors.phone}</p> : null}

              <div>Designation</div>
              <select
                type="select "
                name="role_id"
                onChange={(e) => OnIntChange(e)}
                className="iptDiv"
                defaultValue={hedaldata?.role_id || ""}
              >
                <option> select form droopdown</option>
                <option value={parseInt(3)}>Worker</option>
                <option value={"2"}>supervisior</option>
              </select>
              {errors?.reporting_person_id && (
                <p className="danger ">{errors.reporting_person_id}</p>
              )}

              <div>Reporting to</div>
              <select
                type="select "
                className="iptDiv"
                onChange={(e) => OnIntChange(e)}
                name="reporting_person_id"
                defaultValue={hedaldata?.reporting_person_id || ""}
              >
                {/* <option> select form droopdown</option> */}
                {values.role_id === "3" ? (
                  // eslint-disable-next-line array-callback-return
                  AdminData.user_list.map ((item) => {
                    // console.log("hedaldata.role_id" ,hedaldata.reporting_person_name ,"item.role_id",item.name);
                    if (item.role_id === 2) {
                      return <option value={item.id}>{item.name}</option>;
                    }
                  })
                ) : (
                  <option value={0}>dsvd</option>
                )}
                <option value={0}>dsvddsvsd</option>
              </select>
              {errors?.role_id && <p className="danger ">{errors.role_id}</p>}

              <div className="f_l_IptDiv">
                <div className="f_l_IptDivMain">
                  Password
                  <input
                    type="password"
                    className="iptDiv"
                    name="password"
                    defaultValue={hedaldata ? hedaldata.password : null}
                    onChange={(e) => OnIntChange(e)}
                  />
                  {errors?.password ? (
                    <p className="danger ">{errors.password}</p>
                  ) : null}
                </div>
                <div className="f_l_IptDivMain">
                  Confirm Password
                  <br />
                  <input
                    type="password"
                    className="iptDiv"
                    name="confirmPassword"
                    onChange={(e) => OnIntChange(e)}
                    defaultValue={hedaldata ? hedaldata.password : null}
                  />
                  {errors?.confirmPassword ? (
                    <p className="danger">{errors.confirmPassword}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="bttnDivCrt">
              <button
                className="bttnCnl"
                onClick={() => hedalState.setShow(false)}
              >
                Cancel
              </button>
              <button className="bttnCat" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Edit_userfrom;
