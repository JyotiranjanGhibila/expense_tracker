import { axiosInstance } from "./interceptor";

class AuthServices {

  verifyingToken = () => {
    return axiosInstance
      .get(`/auth/me`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  logging = (payload) => {
    return axiosInstance
      .post(
        `/auth/login`, payload
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  registering = (payload) => {
    return axiosInstance
    .post(
      `/auth/register`, payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  }

  getProfile = (id) => {
    return axiosInstance
      .get(`/profile/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  logOut = () => {
    return axiosInstance
      .post(`/auth/logout`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };
  
}

const authServices = new AuthServices();
export default authServices;