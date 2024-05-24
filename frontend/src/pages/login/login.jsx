import "./login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useLoginMutation } from "../../redux/apiSlice";
import toast, { Toaster } from "react-hot-toast";

import Cookies from "js-cookie";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginBtn, setLogin] = useState(false);
  const nagivate = useNavigate();
  const [login, { isSuccess, isError, data, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("jwtToken", data.jwtToken, { expires: 1 });
      nagivate("/services", { replace: "true" });
    }
    isError && toast.error(error.data.message);
  }, [isSuccess, isError]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    login(body);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
    e.target.value === "" ? setPasswordError(true) : setPasswordError(false);
    e.target.value !== "" && email !== "" && email.endsWith("@gmail.com")
      ? setLogin(true)
      : setLogin(false);
  };

  const passwordSectionHandler = () => {
    return (
      <section className="login-form-label-input">
        <label htmlFor="loginNameId" className="login-form-label">
          Password *
        </label>
        <input
          id="loginNameId"
          className="login-form-input"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChangePasswordHandler}
        />
        {passwordError && (
          <p className="login-form-error">Provide a valid Password*</p>
        )}
      </section>
    );
  };

  const onChangeEmailHander = (e) => {
    setEmail(e.target.value);
    e.target.value === "" || e.target.value.endsWith("@gmail.com") === false
      ? setEmailError(true)
      : setEmailError(false);
    name !== "" &&
    e.target.value !== "" &&
    e.target.value.endsWith("@gmail.com")
      ? setLogin(true)
      : setLogin(false);
  };

  const emailSectionHandler = () => {
    return (
      <section className="login-form-label-input">
        <label htmlFor="loginEmailId" className="login-form-label">
          Email *
        </label>
        <input
          id="loginEmailId"
          className="login-form-input"
          type="text"
          value={email}
          placeholder="Ex : _____@gmail.com"
          onChange={onChangeEmailHander}
        />
        {emailError && (
          <p className="login-form-error">Provide a valid Email*</p>
        )}
      </section>
    );
  };

  const loginBtnHandler = () => {
    return (
      <button
        style={{
          pointerEvents: loginBtn ? "auto" : "none",
          opacity: loginBtn ? 1 : 0.5,
        }}
        type="submit"
        className="login-btn"
      >
        Login
      </button>
    );
  };

  const registerParaHandler = () => {
    return (
      <p className="register-para">
        Not a dentee member ?{"  "}{" "}
        <Link to="/register" className="register-link">
          Register
        </Link>
      </p>
    );
  };

  // Return Statement

  return (
    <div className="login-container">
      <header className="login-header">
        <img
          src={logo}
          className="login-header-logo"
          loading="lazy"
          alt="logo-img"
        />
      </header>

      <main className="login-main-container">
        <img
          className="login-doctors-img"
          src="https://res.cloudinary.com/dcm21aeqp/image/upload/v1692043877/doctors-min_mymjjw.jpg"
          alt="doctors-img"
          loading="lazy"
        />
        <form className="login-form-container" onSubmit={onSubmitHandler}>
          <h3 className="login-form-header">Login</h3>
          {emailSectionHandler()}
          {passwordSectionHandler()}
          {loginBtnHandler()}
          {registerParaHandler()}
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    </div>
  );
};

export default Login;
