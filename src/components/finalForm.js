import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as appUtils from "../helpers/appUtils";
const initialFormData = {
  email: "",
  password: "",
  name: "",
  phone: "",
  checkbox: "",
};
const FinalForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  //ERROR-MSGS
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [checkBox, setCheckBox] = useState("");

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
      case "check":
        setCheckBox("");
        break;
      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  // HANDLE-SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    let flag = validate();

    if (!flag) {
      setLoading(false);
      return;
    }
  };

  //VALIDATE-INPUT
  const validate = () => {
    const { email, password, name, phone, check } = formData;
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

    if (check === true) {
      setCheckBox({
        field: "checkbox",
        message: "",
      });
      flag = true;
    } else {
      setCheckBox({
        field: "checkbox",
        message: "plese check term & condition",
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
    <>
      <Container>
        <Row className="mt-3">
          <Col lg={5}>
            <label>name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errorName.field === "name" && (
              <p className="errorMessage">{errorName.message}</p>
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={5}>
            <label>email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errorEmail.field === "email" && (
              <p className="errorMessage">{errorEmail.message}</p>
            )}
          </Col>
        </Row>
        {/* <Row className="mt-3">
          <Col lg={5}>
            <label>mobile number</label>
            <input className="form-control" type="number" />
            {errorPhone.field === "phone" && (
              <p className="my-1 text-center text-xs text-left text-red-500">
                {errorPhone.message}
              </p>
            )}
          </Col>
        </Row> */}
        <Row className="mt-3">
          <Col lg={5}>
            <label>password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errorPassword.field === "password" && (
              <p className="errorMessage">{errorPassword.message}</p>
            )}
          </Col>
        </Row>
        <Row>
          <label>check </label>
          <input
            name="check"
            type="checkbox"
            value={formData.checkbox}
            onChange={handleChange}
          />
          {checkBox.field === "check" && (
            <p className="errorMessage">{checkBox.message}</p>
          )}
        </Row>
        <Row>
          <Col lg={5}>
            <button className="mt-3" id="loginBtn" onClick={handleSubmit}>
              submit
            </button>
            {errorMsg && (
              <span className="absolute text-xs text-center text-red-500 -bottom-10">
                <span className="font-semibold">{formData.email}</span> is
                already taken. Please use a different email id
              </span>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FinalForm;
