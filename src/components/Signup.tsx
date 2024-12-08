import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SignupValue {
  fullName: string;
  email: string;
  password: string;
}

const initialValues: SignupValue = {
  fullName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
    .required("Full name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be between 6 and 15 characters")
    .max(15, "Password must be between 6 and 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#\$%\^\&*\)\(+=._-]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const color = ["red", "orange", "green"];
const width = ["30%", "50%", "100%"];

const Signup = () => {
  const [passwordStrength, setPasswordStrength] = useState(-1);
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password: string) => {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@!#\$%\^\&*\)\(+=._-]/.test(password)
    ) {
      setPasswordStrength(2);
    } else if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      setPasswordStrength(1);
    } else {
      setPasswordStrength(0);
    }
  };

  const onSubmit = (
    values: SignupValue,
    { setSubmitting }: FormikHelpers<SignupValue>
  ) => {
    toast.success("Sign up successful!");
    setSubmitting(false);
    navigate('/login');
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form className="Form" onSubmit={handleSubmit}>
            <div>
              <h3 className="formHeading">Sign Up</h3>
              <label className="valueLabel" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="valueInput"
                type="text"
                name="fullName"
                id="fullName"
                value={values.fullName}
                onChange={handleChange}
                aria-describedby="fullName-error"
                required
              />
              {errors.fullName && touched.fullName && (
                <div className="errorMessage" id="fullName-error">
                  {errors.fullName}
                </div>
              )}
            </div>

            <div>
              <label className="valueLabel" htmlFor="email">
                Email
              </label>
              <input
                className="valueInput"
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                aria-describedby="email-error"
                required
              />
              {errors.email && touched.email && (
                <div className="errorMessage" id="email-error">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label className="valueLabel" htmlFor="password">
                Password
              </label>
              <input
                className="valueInput"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  evaluatePasswordStrength(e.target.value);
                }}
                aria-describedby="password-error password-strength"
                required
              />
              {errors.password && touched.password && (
                <div className="errorMessage" id="password-error">
                  {errors.password}
                </div>
              )}

              <div
                style={{ display: passwordStrength === -1 ? "none" : "flex" }}
                className="rangeDiv"
                id="password-strength"
              >
                <div
                  style={{
                    background: color[passwordStrength],
                    width: width[passwordStrength],
                  }}
                  className="range"
                ></div>
              </div>
            </div>
            <button className="button" type="submit">
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
