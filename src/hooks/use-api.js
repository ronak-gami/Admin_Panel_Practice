const apiClient = (apiFunc) => {
  const callApi = async (...args) => {
    try {
      const response = await apiFunc(...args);
      return { data: response, error: null };
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || err?.message || "Something went wrong";

      console.error(
        "++++++++++++++++++ERROR_IN_API_CALLING++++++++++++++++++",
        err
      );
      return { data: null, error: errorMessage };
    }
  };

  return callApi;
};
export default apiClient;
