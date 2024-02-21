import { ApiClient } from "./ApiClient";

export const responseForFormApiService = async (userId, formId) => {
    try {
      const response = await ApiClient.post(`/response/${userId}/${formId}/send-response`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const retrieveAllResponsesApiService = (userId, formId, token) => {
    return ApiClient.get(`form/${userId}/${formId}/get-responses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Responses Data--->>>", response.data);
        return response.data; 
      })
      .catch((error) => {
        console.log("Get an Error Responses--->>>", error);
        throw error;
      });
  };