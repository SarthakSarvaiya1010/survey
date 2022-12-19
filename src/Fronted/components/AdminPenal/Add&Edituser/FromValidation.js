export default function validate(values, hedaldata, UserData) {
  let errors = {};

  if (!values.name && !hedaldata?.name) {
    errors.name = "firstname is required";
  }
  if (!values.last_name && !hedaldata?.last_name) {
    errors.last_name = "lastname is required";
  }

  if (!hedaldata?.email && !values?.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email || hedaldata?.email)) {
    errors.email = "Email address is invalid";
  } else if (UserData.user_error) {
    if (UserData?.user_error?.data?.statusCode === "400") {
      errors.email = UserData?.user_error?.data?.message;
    }
  }

  if (!hedaldata?.phone && !values?.phone) {
    errors.phone = "phone number is required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      values?.phone || hedaldata?.phone
    )
  ) {
    errors.phone = "phone number is invalid";
  }
  if (!values.password && !hedaldata?.password) {
    errors.password = "Password is required";
  } else if (values?.password?.length < 6 && hedaldata?.password) {
    errors.password = "Password must be 6 or more characters";
  }
  if (!values.confirmPassword && !hedaldata?.password) {
    errors.confirmPassword = "Confirm Password is required";
  } else {
    console.log("done");
  }
  return errors;
}
