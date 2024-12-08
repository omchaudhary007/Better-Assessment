import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginValue {
  email: string;
  password: string;
}
interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const initialValues: LoginValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
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

const Login = ({setIsLoggedIn}:LoginProps) => {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (
    values: LoginValue,
    { setSubmitting }: FormikHelpers<LoginValue>
  ) => {
    if (remember) {
      const token = btoa(
        JSON.stringify({
          email: values.email,
          timestamp: Date.now(),
        })
      );
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
    }
    toast.success("Login successful!");
    setSubmitting(false);
    navigate("/");
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
            <h3 className="formHeading">Sign In</h3>
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
                autoComplete="true"
                value={values.password}
                onChange={handleChange}
                aria-describedby="password-error"
                required
              />
              {errors.password && touched.password && (
                <div className="errorMessage" id="password-error">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="rememberBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                onChange={() => setRemember(!remember)}
                aria-checked={remember ? "true" : "false"}
                aria-label="Remember me"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
