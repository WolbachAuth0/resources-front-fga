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

async function put(auth, url, data) {
  try {
    const accesstoken = await auth.getAccessTokenSilently();
    const response = await http(accesstoken).put(url, data);
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
  return await get(auth, `/profile/${userId}`)
}

export async function updateProfile (auth, body) {
  const userId = user(auth).sub
  return await patch(auth, `/profile/${userId}`, body)
}

export async function listResources (auth) {
  const url = `/resources`
  try {
    const response = await get(auth, url)
    return response
  } catch (error) {
    return httpErrorHandler(error)
  }
}

export async function getResourceById (auth, id) {
  const url = `/resources/${id}`
  try {
    const response = await get(auth, url)
    return response
  } catch (error) {
    return httpErrorHandler(error)
  }
}

export async function createResource (auth, body) {
  const url = `/resources`
  try {
    const response = await post(auth, url, body)
    return response
  } catch (error) {
    return httpErrorHandler(error)
  }
}

export async function updateResource (auth, id, body) {
  const url = `/resources/${id}`
  try {
    const response = await put(auth, url, body)
    return response
  } catch (error) {
    return httpErrorHandler(error)
  }
}

export async function removeResource (auth, id) {
  const url = `/resources/${id}`
  try {
    const response = await remove(auth, url)
    return response
  } catch (error) {
    return httpErrorHandler(error)
  }
}
