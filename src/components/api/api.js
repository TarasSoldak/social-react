import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6a776457-e59e-482f-ba70-10ff93f7c513",
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  following(userId) {
    return instance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  unFollowing(userId) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};
export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId).then((response) => {
      return response.data;
    });
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile);
  },
  savePhoto(filePhoto) {
    const formData = new FormData();
    formData.append("image", filePhoto);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export const authAPI = {
  getAuthData() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },
  login(email, password, rememberMe, captcha) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => {
        return response.data;
      });
  },
  logOut() {
    return instance.delete(`auth/login`).then((response) => {
      return response.data;
    });
  },
};
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`).then((response) => {
      return response.data;
    });
  },
};
