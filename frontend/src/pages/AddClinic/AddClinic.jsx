import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./AddClinic.css";
import { useState, useRef, useEffect } from "react";
import {
  useGetEmployeeQuery,
  usePostClinicMutation,
} from "../../redux/apiSlice";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { api } from "../../redux/apiSlice";
import Cookies from "js-cookie";
import { addDays } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { Country, State, City } from "country-state-city";

const AddClinic = () => {
  const { data: profile, isLoading, isSuccess } = useGetEmployeeQuery();
  const [
    postClinic,
    {
      isLoading: isLoading1,
      isSuccess: isSuccess1,
      isError: isError1,
      data: data1,
    },
  ] = usePostClinicMutation();

  useEffect(() => {
    isSuccess1 && toast.success(data1.message);
    isError1 && toast.error(error.data.message);
  }, [isSuccess1, isError1]);

  console.log(isSuccess1, isLoading1);

  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const [selectedCountry, setCountry] = useState("");
  const [selectedState, setState] = useState("");
  const [selectedCity, setCity] = useState("");

  console.log(profile);

  const countryOptions = Country.getAllCountries().map((item) => {
    return {
      value: item.isoCode,
      label: item.name,
    };
  });
  const stateOptions = State.getStatesOfCountry(selectedCountry.value).map(
    (item) => {
      return {
        value: item.isoCode,
        label: item.name,
      };
    }
  );

  const cityOptions = City.getCitiesOfState(
    selectedCountry.value,
    selectedState.value
  ).map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

  const details = useRef({});

  const [errors, setErrors] = useState({});

  // headers

  const headerHandler = () => {
    const logoHandler = () => {
      return <Link to="/services">{<img className="logo" src={logo} />}</Link>;
    };

    const addClinicHandler = () => {
      return (
        <Link to="/clinics">
          <button type="button" className="btn btn-danger">
            Back to Clinics
          </button>
        </Link>
      );
    };

    const profileHandler = () => {
      const toogleDropDown = () => {
        setDrop(!drop);
      };

      const profileDropDownHandler = () => {
        const onLogoutHandler = () => {
          dispatch(api.util.resetApiState());
          Cookies.remove("jwtToken");
          nagivate("/login");
        };
        return (
          <div
            className={`drop-down-container ${drop ? "active" : "inactive"}`}
          >
            <ul className="drop-down-ul">
              <li className="drop-down-li">
                <FontAwesomeIcon className="me-2" icon={faPenToSquare} />
                My profile
              </li>
              <li className="drop-down-li">
                <FontAwesomeIcon className="me-2" icon={faUser} /> Account
                Settings
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

      return (
        <>
          <button
            type="button"
            onClick={toogleDropDown}
            className="profile-btn"
          >
            <FontAwesomeIcon className="profile-icon" icon={faUser} />
          </button>
          {profileDropDownHandler()}
        </>
      );
    };

    // return of header Handler

    return (
      <>
        {logoHandler()}
        <div className="d-flex align-items-center ">
          {addClinicHandler()}
          {profileHandler()}
        </div>
      </>
    );
  };

  const FormHandler = () => {
    const clinicNameHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>
            Clinic Name <span className="text-danger">*</span>
          </label>
          <input
            className="input-field"
            type="text"
            onChange={(e) => {
              details.current.name = e.target.value;
            }}
          />
          <p className="error-msg">{errors.name}</p>
        </div>
      );
    };

    const doctorNameHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Doctor Name :</label>
          <input
            className="input-field"
            type="text"
            readOnly
            value={profile.name}
          />
        </div>
      );
    };

    const address1Handler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Address 1 :</label>
          <input
            className="input-field"
            type="text"
            onChange={(e) => {
              details.current.address1 = e.target.value;
            }}
          />
          <p className="error-msg">{errors.address1}</p>
        </div>
      );
    };

    const address2Handler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Address 2 :</label>
          <input
            className="input-field"
            type="text"
            onChange={(e) => {
              details.current.address2 = e.target.value;
            }}
          />
          <p className="error-msg">{errors.address2}</p>
        </div>
      );
    };

    const countryHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Country:</label>
          <Select
            value={{ label: selectedCountry.label }}
            onChange={(e) => {
              setCountry({ label: e.label, value: e.value });
              details.current.country = e.value;
              details.current.timeZone = Country.getCountryByCode(
                e.value
              )?.timezones[0].zoneName;
            }}
            options={countryOptions}
          />
          <p className="error-msg">{errors.country}</p>
        </div>
      );
    };

    const stateHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>State:</label>

          <Select
            value={{ label: selectedState.label }}
            onChange={(e) => {
              setState({ label: e.label, value: e.value });
              details.current.state = e.value;
            }}
            options={stateOptions}
          />

          <p className="error-msg">{errors.state}</p>
        </div>
      );
    };

    const cityHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>City:</label>
          <Select
            value={{ label: selectedCity.label }}
            onChange={(e) => {
              setCity({ label: e.label, value: e.value });
              details.current.city = e.value;
            }}
            options={cityOptions}
          />
          <p className="error-msg">{errors.city}</p>
        </div>
      );
    };

    const zipCodeHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Zip Code :</label>
          <input
            className="input-field"
            type="text"
            onChange={(e) => {
              details.current.zipcode = e.target.value;
            }}
          />
          <p className="error-msg">{errors.zipCode}</p>
        </div>
      );
    };

    const emailHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Email :</label>
          <input
            className="input-field"
            type="text"
            readOnly
            value={profile.email}
          />
          <p className="error-msg">{errors.email}</p>
        </div>
      );
    };

    const timeZoneHandler = () => {
      return (
        <div className="col-12 col-sm-6 col-lg-4 p-2">
          <label>Time Zone :</label>
          <input
            className="input-field"
            type="text"
            readOnly
            defaultValue={
              Country.getCountryByCode(selectedCountry.value)?.timezones[0]
                .zoneName
            }
            onChange={(e) => {
              details.timeZone = e.target.value;
            }}
          />
          <p className="error-msg">{errors.timeZone}</p>
        </div>
      );
    };

    const onSubmitFormHandler = (e) => {
      e.preventDefault();

      const allErrors = {};

      if (!details.current.name) {
        allErrors.name = "Provide a Valid Clinic Name*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.address1) {
        allErrors.address1 = "Provide a Valid Clinic Address 1*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.address2) {
        allErrors.address2 = "Provide a Valid Clinic Address 2*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.country) {
        allErrors.country = "Provide a Valid Country*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.state) {
        allErrors.state = "Provide a Valid State*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.city) {
        allErrors.city = "Provide a Valid City*";
        setErrors(allErrors);
        return;
      }
      if (!details.current.zipcode) {
        allErrors.zipCode = "Provide a Valid Zip Code*";
        setErrors(allErrors);
        return;
      }

      const currentDate = new Date();

      const modifiedDate = addDays(currentDate, 15);

      details.current.validTill = modifiedDate;
      details.current.employeesId = profile.id;
      details.current.createdAt = currentDate;

      postClinic(details.current);
      nagivate("/clinics");
    };

    return (
      <form
        onSubmit={onSubmitFormHandler}
        className="row border form-container"
      >
        {clinicNameHandler()}
        {doctorNameHandler()}
        {address1Handler()}
        {address2Handler()}
        {countryHandler()}
        {stateHandler()}
        {cityHandler()}
        {zipCodeHandler()}
        {emailHandler()}
        {timeZoneHandler()}
        <div className="col-12">
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  };

  if (isLoading) return <p>Loading....</p>;

  if (isSuccess)
    return (
      <div className="container-fluid p-0 add-clinic-container">
        <header className="header">{headerHandler()}</header>
        <main className="add-clinic-main-container">
          {FormHandler()}
          <Toaster position="bottom-right" reverseOrder={false} />
        </main>
      </div>
    );
};

export default AddClinic;
