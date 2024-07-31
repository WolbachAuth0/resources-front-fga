import axios from "axios";
const environ = import.meta.env;

/**
 * ENVIRON CONSTANTS
 */
export const AUDIENCE = environ.VITE_AUTH0_API_AUDIENCE
const API_BASEURL = environ.VITE_API_BASEURL

function http(accesstoken=null, timeout = 0) {
  const request = {
    baseURL: API_BASEURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (accesstoken) {
    request.headers["Authorization"] = `Bearer ${accesstoken}`;
  }
  const http = axios.create(request);
  return http;
}

async function get(auth, url) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).get(url);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function post(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).post(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function patch(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).patch(url, data);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

async function remove(auth, url) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).delete(url);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}

function httpErrorHandler (err) {
  if (err?.response?.status == 401) {
    return err.response.data;
  } else if (err?.response?.status == 429) {
    return err.response.data
  }
  console.log(err)
  return err
}

/**
 * USER PROFILE API ENDPOINTS
 */
export function user(auth) {
  return auth.user._value;
}

export async function fetchProfile (auth) {
  const userId = user(auth).sub
  return await get(auth, `/admin/profile/${userId}`)
}

export async function updateProfile (auth, body) {
  const userId = user(auth).sub
  return await patch(auth, `/admin/profile/${userId}`, body)
}

/**
 * ACCESS THE API
 */
export async function getToken ({ client_id, client_secret }) {
  try {
    const body = {
      client_id,
      client_secret,
      audience: AUDIENCE
    }
    const url = `/v1/oauth/token`
    const response = await http().post(url, body);
    return response.data;
  } catch (error) {
    return httpErrorHandler(error)
  }
}
