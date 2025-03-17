import { axiosInstance } from "./interceptor";

class authServices {

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

  
}

export default new authServices();
