import axios from "axios";

import * as c from "./constant";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3001");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "OPTIONS");

//CUSTOMER API's
export async function login_customer(data) {
  try {
    let url = c.LOGIN_CUSTOMER;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function register_customer(data) {
  try {
    let url = c.REGISTER_CUSTOMER;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function customer_email_verification(data) {
  try {
    let url = c.CUSTOMER_EMAIL_VERIFICATION;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function resend_verification_code(data) {
  try {
    let url = c.RESEND_VERIFICATION_CODE;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function customer_forgot_password(data) {
  try {
    let url = c.FORGOT_PASSWORD;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function customer_confirm_forgot_password(data) {
  try {
    let url = c.FORGOT_PASSWORD;
    let res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

export async function check_password_verified_code(data) {
  try {
    let url = c.CHECK_PASSWORD_VERIFIED_CODE;
    let res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
}

//CATEGORY API's

export async function category() {
  try {
    const options = {
      headers: {
        headers,
      },
    };
    let url = c.CATEGORY;
    let res = await axios.get(url, options);
    return res;
  } catch (e) {
    return e.response;
  }
}
