import { ApiClient } from "./ApiClient";

export const submitAnswerForQuestionForFormApiService = (
  userId,
  formId,
  questionId,
  answer
) => {
  return ApiClient.post(
    `/answer/${userId}/${formId}/${questionId}/submit-answer`,
    answer
  )
    .then((response) => {
      console.log("Answer successfully submitted", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Answer Error--->>>", error);
      throw error;
    });
};

export const retrieveAnswersForQuestionForFormApiService = (
  userId,
  formId,
  questionId
) => {
  return ApiClient.get(`/answer/${userId}/${formId}/${questionId}/get-answers`)
    .then((response) => {
      console.log("Answer successfully fetched", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Answer fetching Error--->>>", error);
      throw error;
    });
};


// npm i react-scripts@latest
// export NODE_OPTIONS=--openssl-legacy-provider