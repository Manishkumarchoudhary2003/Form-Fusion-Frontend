import { ApiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) =>
  ApiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
