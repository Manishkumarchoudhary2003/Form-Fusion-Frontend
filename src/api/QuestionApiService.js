import { ApiClient } from "./ApiClient";

export const createQuestionForFormApiService = (
  userId,
  formId,
  question,
  token
) => {
  return ApiClient.post(
    `/question/${userId}/${formId}/create-question`,
    question,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Question successfully created", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Question Error--->>>", error);
      throw error;
    });
};

export const retrieveAllQuestionsForFormApiService = (
  userId,
  formId
) => {
  return ApiClient.get(`/response/${userId}/${formId}/all-questions`,)
    .then((response) => {
      console.log("Get Question Data--->>>", response.data);
      if (response.data.length > 0) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.log("Get an Error Fetching Question Data--->>>", error);
      throw error;
    });
};

export const retrieveQuestionForFormApiService = (
  userId,
  formId,
  questionId,
  token
) => {
  return ApiClient.get(
    `/question/${userId}/${formId}/${questionId}/get-question`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Get Question Data--->>>", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Get an Error Fetching Question Data--->>>", error);
      throw error;
    });
};

export const updateQuestionForFormApiService = (
  userId,
  formId,
  questionId,
  token,
  updatedQuestion
) => {
  return ApiClient.put(
    `/question/${userId}/${formId}/${questionId}/update-question`,
    updatedQuestion,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Question Updated--->>>", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Question updating Error--->>>", error);
      throw error;
    });
};

export const deleteQuestionForFormApiService = (
  userId,
  formId,
  questionId,
  token
) => {
  return ApiClient.delete(
    `/question/${userId}/${formId}/${questionId}/delete-question`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Question Deleted--->>>", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Question deleting Error--->>>", error);
      throw error;
    });
};
