import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Update_user, Register_user } from "../../../../Redux/Action/UserData";

const useForm = (image, validate, hedaldata, hedalState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);

  let UserData = useSelector((state) => state?.UserData);

  useEffect(() => {
    if (findErrors) {
      setErrors(validate(values, hedaldata, UserData));
    }

    console.log('"UserData?.user_error?.data?.message' , !Object.keys(errors).length  , findErrors  );
  
    console.log("UserData?.user_error?.data?.message", UserData?.user_error?.data?.message);
    if(!Object.keys(errors).length &&findErrors ){
        
      console.log("Object.keys(errors).length",Object.keys(errors).length);
    }    

  }, [UserData, hedaldata, findErrors, validate, values ]);



  function handleSubmit(event) {
    console.log("value", values);
    setFindErrors(true);

    setErrors(validate(values, hedaldata, UserData));

    const formAddUserData = new FormData();

    formAddUserData.append("name", values?.name || hedaldata?.name);

    formAddUserData.append("email", values?.email || hedaldata?.email);

    formAddUserData.append("role_id", values?.role_id || hedaldata?.role_id);

    formAddUserData.append("password", values?.password || hedaldata?.password);

    formAddUserData.append("phone", values?.phone || hedaldata?.phone);

    formAddUserData.append(
      "reporting_person_id",
      values?.reporting_person_id || hedaldata?.reporting_person_id || 0
    );

    formAddUserData.append(
      "confirmPassword",
      values?.confirmPassword || hedaldata?.confirmPassword
    );

    formAddUserData.append("image_src", image || hedaldata?.image_src);

    formAddUserData.append(
      "last_name",
      values?.last_name || hedaldata?.last_name
    );

    if (hedaldata?.id) {
      alert("Update is sucefull");
      if (!Object.keys(errors).length) {
        window.location.reload();
        dispatch(Update_user(hedaldata.id, formAddUserData));
      }
      window.location.reload();
    } else {
      dispatch(Register_user(formAddUserData));
      if (!!!hedalState?.setShow) {
        if (!Object.keys(errors).length){
          alert("Register sucefull");
          // navigate("/");
        }
      }
    }
  }

  const OnIntChange = (e) => {
    const { name, value } = e.target;
    console.log("useForm validate validate validate", e.target.value, errors);

    setValues({ ...values, [name]: value });
    if (findErrors) {
      setErrors(validate(values, hedaldata, UserData));
    }
  };

  return {
    OnIntChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
