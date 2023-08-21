import "./clinics.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

import {
  useGetClinicsQuery,
  usePostClinicMutation,
} from "../../redux/apiSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { api } from "../../redux/apiSlice";
import { differenceInDays, parseISO, format } from "date-fns";

const Clinics = () => {
  const { data, isSuccess, isLoading, isError } = useGetClinicsQuery();
  const [{ isLoading: hey, isSuccess: hey2 }] = usePostClinicMutation();
  const [drop, setDrop] = useState(false);
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) return <div>meow....</div>;

  if (isSuccess)
    return (
      <div className="container-fluid p-0  clinics-container">
        <header className="header">
          <Link to="/services">
            <img className="logo" src={logo} />
          </Link>
          <div className="d-flex align-items-center ">
            <Link to="/addClinic">
              <button type="button" className="btn btn-danger">
                + Add Clinic
              </button>
            </Link>
            <button
              type="button"
              onClick={() => {
                setDrop(!drop);
              }}
              className="profile-btn"
            >
              <i className="fa-solid fa-user profile-icon"></i>
            </button>
            <div
              className={`drop-down-container ${drop ? "active" : "inactive"}`}
            >
              <ul className="drop-down-ul">
                <li className="drop-down-li">
                  <i className="fa-solid fa-pen-to-square me-2"></i> My profile
                </li>
                <li className="drop-down-li">
                  <i className="fa-solid fa-user me-2"></i> Account Settings
                </li>
                <li className="drop-down-li logout">
                  <button
                    onClick={() => {
                      dispatch(api.util.resetApiState());
                      Cookies.remove("jwtToken");
                      nagivate("/login");
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="main-container">
          <h5 className="clinics-h5 row">SELECTION OF CLINIC</h5>
          <div className="clinics-ul  row m-0 ">
            {data.map((item) => {
              const targetDate = parseISO(item.validTill);
              const currentDate = new Date();

              const differenceDays = differenceInDays(targetDate, currentDate);

              return (
                <div
                  key={item.id}
                  className="clinics-li p-0  col-12  col-md-6 col-xl-4"
                >
                  <div
                    className={`clinic-card ${
                      differenceDays < 0 && "clinic-card-expired"
                    }`}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="me-4">
                        <h6 className="m-0 mb-2">{item.name}</h6>

                        {differenceDays >= 0 ? (
                          differenceDays > 0 ? (
                            <p className="m-0">
                              {" "}
                              License will{" "}
                              <span className="fw-bold text-danger">
                                Expire
                              </span>{" "}
                              within{" "}
                              <span className="fw-bold text-danger">
                                {differenceDays}
                              </span>{" "}
                              days
                            </p>
                          ) : (
                            <p className="m-0">
                              {" "}
                              License will{" "}
                              <span className="fw-bold text-danger">
                                Expire Today
                              </span>{" "}
                            </p>
                          )
                        ) : (
                          <p className="m-0">
                            {" "}
                            License{" "}
                            <span className="fw-bold text-danger">
                              Expired
                            </span>{" "}
                          </p>
                        )}
                      </div>
                      <div>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>

                    <p className="p-0">{item.address2}</p>
                    <p>
                      Your{" "}
                      <span className="fw-bold">{item.employees.role}</span> of
                      this clinic
                    </p>

                    {differenceDays < 0 ? (
                      <p className="text-danger fw-bold m-0">InActive</p>
                    ) : (
                      <p className="text-success fw-bold m-0">Active</p>
                    )}
                    <p className="text-primary fw-bold m-0 mt-1">
                      ValidTill : {format(targetDate, "dd-MMM-yyyy")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
};

export default Clinics;
