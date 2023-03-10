import { toast } from "@/client/helpers";
import axios from "axios";

const api = axios.create({
  baseURL: "api/",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // we don't want to show anything when request is cancelled
    if (axios.isCancel(error)) {
      return error;
    }

    let message = "Something went wrong";

    if (error.response) {
      message = error.message;
    }

    toast({
      isClosable: true,
      status: "error",
      description: message,
    });

    throw error;
  },
);

export { api };
