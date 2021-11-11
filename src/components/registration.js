import React, { useState } from "react";
//import Button from "../components/button";
//import NumberFormat from "react-number-format";
//import { useHistory } from "react-router";
import * as API from "../helpers/api";
import * as appUtils from "../helpers/appUtils";
//import { Link } from "react-router-dom";
//import Input from "../components/input";
//import { ArrowDownward, PersonOutline } from "@material-ui/icons";
//import CountryData from "../data/country.json";
//import { useDispatch } from "react-redux";
const initialFormData = {
  email: "",
  password: "",
  name: "",
  phone: "",
};
const MytestForm = () => {
  // const dispatch = useDispatch();
  //const history = useHistory();
  //LOADER
  const [loading, setLoading] = useState(false);

  //FORM-DATA
  const [formData, setFormData] = useState(initialFormData);
  const [dialCode, setDialCode] = useState(+1);

  //ERROR-MSGS
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  // HANDLE-CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setErrorEmail("");
        setErrorMsg(false);
        break;
      case "name":
        setErrorName("");
        break;
      case "password":
        setErrorPassword("");
        break;
      case "phone":
        setErrorPhone("");
        break;
      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCountrySelect = (e) => {
    setDialCode(e.target.value);
  };

  // HANDLE-SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    let flag = validate();

    if (!flag) {
      setLoading(false);
      return;
    }

    // try {
    //   const requestObj = {
    //     emailId: formData.email,
    //     password: formData.password,
    //     customerName: formData.name,
    //     mobileNo: formData.phone,
    //   };

    //   const response = await API.register_customer(requestObj);

    //   if (response.status === 200) {
    //     setLoading(false);
    //     dispatch({
    //       type: "LOGIN",
    //       payload: {
    //         isAuthenticated: true,
    //         // user: response.data.data,
    //         // token: response.data.token,
    //       },
    //     });

    //     history.push({
    //       pathname: "/email_verification",
    //       state: { email: formData.email },
    //     });

    //     localStorage.setItem("token", response.data.token);
    //   }

    //   if (response.status === 409) {
    //     setLoading(false);
    //     setErrorMsg(true);
    //   }
    // } catch (e) {}
  };

  //VALIDATE-INPUT
  const validate = () => {
    const { email, password, name, phone } = formData;
    let flag = true;

    let validatePhone = appUtils.validatePhoneNumber(phone);
    if (validatePhone === 1) {
      setErrorPhone({
        field: "phone",
        message: "",
      });
    }
    console.log(validatePhone);
    if (!(validatePhone === 1)) {
      let msg = "";
      if (validatePhone === 0) {
        msg = "You missed a bit! Don't forget to add your phone number.";
      }
      setErrorPhone({
        field: "phone",
        message: msg,
      });
      flag = false;
    }

    let validateEmail = appUtils.validateEmail(email);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "email",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "You missed a bit! Don't forget to add your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "email",
        message: msg,
      });
      flag = false;
    }

    let validateName = appUtils.validateName(name);
    if (validateName === 1) {
      setErrorName({
        field: "name",
        message: "",
      });
    }
    if (!(validateName === 1)) {
      let msg = "";
      if (validateName === 0) {
        msg = "You missed a bit! Don't forget to add your name.";
      } else {
        msg = "That doesn't look like a name.";
      }
      setErrorName({
        field: "name",
        message: msg,
      });
      flag = false;
    }

    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "You missed a bit! Don't forget to add your password.",
      });
      flag = false;
    }

    return flag;
  };
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12 bg-cover bg-center bg-no-repeat">
      <div className=" absolute text-7xl font-bold capitalize text-white top-24 w-2/5 left-24">
        Sign Up to start shopping test
      </div>
      <div className=" mr-24 xs:p-0 ml-auto md:w-full md:max-w-md">
        <div className="bg-white p-10 shadow-lg w-full rounded-2xl">
          <div className="flex justify-center py-5">
            <img src="" alt="logo" />
          </div>
          <h1 className="font-bold text-center text-2xl mb-5">
            Welcome to Market Place
          </h1>
          <div className="px-5 py-7">
            {/* NAME */}
            <div className="relative mb-4">
              <input
                placeholder="Name"
                className=""
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errorName.field === "name" && (
                <p className="my-1 text-center text-xs text-left text-red-500">
                  {errorName.message}
                </p>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div className="relative mb-4">
              <div className="flex">
                {/* <select
                  name="category"
                  id="category"
                  className="focus:outline-none bg-gray-200 rounded-l"
                  style={{ padding: "14px 12px", width: "60px" }}
                  onChange={handleCountrySelect}
                >
                  {CountryData.map((item) => {
                    return (
                      <option
                        value={item.dialCode}
                        className="w-12 capitalize"
                        defaultValue={item.dialCode === "+1"}
                        key={item.unicode}
                      >
                        {item.emoji + item.name}
                      </option>
                    );
                  })}
                </select> */}

                {/* <NumberFormat
                  format={`${dialCode} ##########`}
                  name="phone"
                  id="phoneNumber"
                  placeholder="Phone"
                  className="h-12 -ml-1 px-4 bg-gray-200 w-full h-12 placeholder-gray-500 border border-transparent rounded outline-none transition duration-200 text-gray-900 bg-gray-f7 focus:placeholder-gray-900"
                  onChange={handleChange}
                  // autoComplete="off"
                /> */}
              </div>
              {errorPhone.field === "phone" && (
                <p className="my-1 text-center text-xs text-left text-red-500">
                  {errorPhone.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="relative mb-4">
              <input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errorEmail.field === "email" && (
                <p className="my-1 text-center text-xs text-left text-red-500">
                  {errorEmail.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative mb-4">
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errorPassword.field === "password" && (
                <p className="my-1 text-center text-xs text-left text-red-500">
                  {errorPassword.message}
                </p>
              )}
            </div>

            <div className="relative">
              <button
                size={"big"}
                className="w-full relative"
                variant={"primary"}
                id="loginBtn"
                onClick={handleSubmit}
                // loading={loading}
              >
                Register
                <div className="transform -rotate-90 ml-2 loginArrow ">
                  {/* <ArrowDownward
                    className="animate-bounce"
                    fontSize={"small"}
                  /> */}
                </div>
              </button>
              {errorMsg && (
                <span className="absolute text-xs text-center text-red-500 -bottom-10">
                  <span className="font-semibold">{formData.email}</span> is
                  already taken. Please use a different email id
                </span>
              )}
            </div>
          </div>
          <div className="py-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                {/* <Link to="/login">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <PersonOutline style={{ fontSize: "20px" }} />
                    <span className="inline-block ml-1">Login</span>
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className="grid grid-cols-2 gap-1">
              {/* <Link to="/">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="inline-block ml-1">Back to Home</span>
                  </button>
                </div>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MytestForm;
