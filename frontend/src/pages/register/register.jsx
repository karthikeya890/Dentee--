import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import doctors from "../../images/dentee.jpg";
import "./register.css";
import { useRegisterMutation } from "../../redux/apiSlice";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [registerBtn, setRegister] = useState(false);

  // register api related

  const [register, { isSuccess, data, isError, error }] = useRegisterMutation();

  useEffect(() => {
    isSuccess && toast.success(data.message);
    isError && toast.error(error.data.message);
  }, [isSuccess, isError]);

  // Doctors Image code

  const doctorsImageHandler = () => {
    return <img className="signUp-doctors-img" src={doctors} />;
  };

  // Form Related code

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    const createdAt = new Date();

    const body = {
      name,
      email,
      createdAt,
    };

    register(body);

    setName("");
    setEmail("");
  };

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
    e.target.value === "" ? setNameError(true) : setNameError(false);
    e.target.value !== "" && email !== "" && email.endsWith("@gmail.com")
      ? setRegister(true)
      : setRegister(false);
  };

  const nameSectionHandler = () => {
    return (
      <section className="signUp-form-label-input">
        <label htmlFor="signUpNameId" className="signUp-form-label">
          Name *
        </label>
        <input
          id="signUpNameId"
          className="signUp-form-input"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={onChangeNameHandler}
        />
        {nameError && (
          <p className="signUp-form-error">Provide a valid Name*</p>
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
      ? setRegister(true)
      : setRegister(false);
  };

  const emailSectionHandler = () => {
    return (
      <section className="signUp-form-label-input">
        <label htmlFor="signUpEmailId" className="signUp-form-label">
          Email *
        </label>
        <input
          id="signUpEmailId"
          className="signUp-form-input"
          type="text"
          value={email}
          placeholder="Ex : _____@gmail.com"
          onChange={onChangeEmailHander}
        />
        {emailError && (
          <p className="signUp-form-error">Provide a valid Email*</p>
        )}
      </section>
    );
  };

  const registerBtnHandler = () => {
    return (
      <button
        style={{
          pointerEvents: registerBtn ? "auto" : "none",
          opacity: registerBtn ? 1 : 0.5,
        }}
        type="submit"
        className="Register-btn"
      >
        Register
      </button>
    );
  };

  const loginParaHandler = () => {
    return (
      <p className="login-para">
        Already a dentee member ?{"  "}{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    );
  };

  const formHandler = () => {
    return (
      <form className="signUp-form-container" onSubmit={onSubmitFormHandler}>
        <h3 className="signUp-form-header">Registration</h3>
        {nameSectionHandler()}
        {emailSectionHandler()}
        {registerBtnHandler()}
        {loginParaHandler()}
      </form>
    );
  };

  // Return Statement

  return (
    <div className="signUp-container">
      <header className="signUp-header">
        <img src={logo} className="signUp-header-logo" loading="lazy" />
      </header>
      <main className="signUp-main-container">
        {doctorsImageHandler()}
        {formHandler()}
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </div>
  );
};

export default Register;
