import { ApiClient } from "./ApiClient";

export const welcomeApi = () => ApiClient.get(`/auth/welcome`);

export const retrieveAllUsersApiService = (token) => {
  return ApiClient.get("/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Get Users Data--->>>", response.data);
      return response.data; 
    })
    .catch((error) => {
      console.log("Get an Error--->>>", error);
      throw error;
    });
};


export const retrieveUserApiService = (userId,token) => {
  return ApiClient.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Get User Data--->>>", response.data);
      return response.data; 
    })
    .catch((error) => {
      console.log("Get an Error--->>>", error);
      throw error;
    });
};

export const delteUserApiService = (userId,token) => {
  return ApiClient.delete(`/user/${userId}/delete-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Delete User Data--->>>", response.data);
      return response.data; 
    })
    .catch((error) => {
      console.log("Delete an Error--->>>", error);
      throw error;
    });
};

export const retrieveUserByEmailApiService = (email, token) => {
  return ApiClient.get(`/user/email/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Get User by Email Data--->>>", response.data);
      return response.data; 
    })
    .catch((error) => {
      console.log("Get an Error--->>>", error);
      throw error;
    });
};

