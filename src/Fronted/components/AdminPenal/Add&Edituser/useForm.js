import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Update_user ,Register_user } from "../../../../Redux/Action/UserData";




const useForm = (image, validate, hedaldata) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  


  let SurveyData = useSelector((state) => state?.postsurveyData);

  useEffect(() => {

     

    if (findErrors) {
      setErrors(validate(values, hedaldata, SurveyData));
    }
  }, [SurveyData, hedaldata, findErrors, validate, values]);

  function handleSubmit(event) {
    console.log("value", values);
    setFindErrors(true);

    

   



    setErrors(validate(values, hedaldata, SurveyData));

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

    formAddUserData.append("image_src", image || hedaldata?.image_src    );

    formAddUserData.append(
      "last_name",
      values?.last_name || hedaldata?.last_name
    );

    if (hedaldata?.id) {
      dispatch(Update_user(hedaldata.id, formAddUserData));
      alert("Update is sucefull");
      window.location.reload();
    } else {
      dispatch(Register_user(formAddUserData));
    }

    if (
      !values.name &&
      !values.last_name &&
      !values.email &&
      !values.phone &&
      !values.password &&
      !values
    ) {
      console.log("not done");
    } else {
      console.log("erroe", errors);
      // window.location.reload()
    }
  }

  const OnIntChange = (e) => {
    const { name, value } = e.target;
    console.log("useForm validate validate validate", e.target.value, errors);

    setValues({ ...values, [name]: value });
    if (findErrors) {
      setErrors(validate(values, hedaldata, SurveyData));
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