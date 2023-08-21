import React from "react";
import logo from "../../images/logo.png";
import "./services.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faClipboard,
  faCartShopping,
  faUserPen,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../redux/apiSlice";
import ServicesSkeleton from "./servicesSkeleton";
import { useDispatch } from "react-redux";
import { api } from "../../redux/apiSlice";
const Services = () => {
  const { data, isLoading, isSuccess } = useGetEmployeeQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const logoHandler = () => {
    return (
      <Link to="/services">
        <img alt="logo" className="logo" src={logo} />
      </Link>
    );
  };

  const checkOutHandler = () => {
    return (
      <button
        onClick={() => {
          updateEmployee({ active: false });
        }}
        className="check-in-out btn btn-danger"
      >
        CheckOut
      </button>
    );
  };

  const checkInHandler = () => {
    return (
      <button
        onClick={() => {
          updateEmployee({ active: true });
        }}
        className="check-in-out btn btn-success"
      >
        CheckIn
      </button>
    );
  };

  const checkInOutHandler = () => {
    if (data.active) return checkOutHandler();

    if (!data.active) return checkInHandler();
  };

  const onLogoutHandler = () => {
    dispatch(api.util.resetApiState());
    Cookies.remove("jwtToken");
    nagivate("/login");
  };

  const profileDropDownHandler = () => {
    return (
      <div className={`drop-down-container ${drop ? "active" : "inactive"}`}>
        <ul className="drop-down-ul">
          <li className="drop-down-li">
            <FontAwesomeIcon className="me-2" icon={faPenToSquare} /> My profile
          </li>
          <li className="drop-down-li">
            <FontAwesomeIcon className="me-2" icon={faUser} /> Account Settings
          </li>
          <li className="drop-down-li logout">
            <button onClick={onLogoutHandler} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const profileHandler = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            setDrop(!drop);
          }}
          className="ms-4 profile-btn"
        >
          <FontAwesomeIcon className="profile-icon" icon={faUser} />
        </button>
        {profileDropDownHandler()}
      </>
    );
  };

  const manageCardHandler = () => {
    return (
      <div className="manage-card">
        <div className="manage-icon-container">
          <FontAwesomeIcon className="manage-icon" icon={faUser} />
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Manage</p>
          <p>Practice management Software</p>
          <Link to="/Clinics">
            <button className="click-here-btn">Click Here &gt;&gt;</button>
          </Link>
        </div>
      </div>
    );
  };

  const educateCardHandler = () => {
    return (
      <div className="educate-card">
        <div className="educate-icon-container">
          <FontAwesomeIcon className="educate-icon" icon={faClipboard} />
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Educate</p>
          <p>Discover Courses, Conferences</p>
          <button className="click-here-educate-btn">
            Click Here &gt;&gt;
          </button>
        </div>
      </div>
    );
  };

  const buyCardHandler = () => {
    return (
      <div className="buy-card">
        <div className="buy-icon-container">
          <FontAwesomeIcon className="buy-icon" icon={faCartShopping} />
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Buy</p>
          <p>Dental Supplies Online</p>
          <button className="click-here-buy-btn">Click Here &gt;&gt;</button>
        </div>
      </div>
    );
  };

  const discoverCardHandler = () => {
    return (
      <div className="discover-card">
        <div className="discover-icon-container">
          <FontAwesomeIcon className="discover-icon" icon={faUserPen} />
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Discover</p>
          <p>Manage Your Profile</p>
          <button className="click-here-discover-btn">
            Click Here &gt;&gt;
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) return <ServicesSkeleton />;
  if (isSuccess)
    return (
      <div className="container-fluid p-0">
        <header className="header">
          {logoHandler()}
          <div className="d-flex align-items-center">
            {checkInOutHandler()}
            {profileHandler()}
          </div>
        </header>
        <main className="container-fluid d-flex flex-column align-items-center">
          <h1 className="services-heading">
            "Dedicated to Dentist Care - Ensuring Excellence in Every Aspect"
          </h1>
          <div className="container">
            <div className="row mt-5">
              <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
                {manageCardHandler()}
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
                {educateCardHandler()}
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
                {buyCardHandler()}
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
                {discoverCardHandler()}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};

export default Services;
