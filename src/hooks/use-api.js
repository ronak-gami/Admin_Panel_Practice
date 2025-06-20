import { useState, useCallback } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        const response = await apiFunc(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(
          err?.response?.data?.error || err?.message || "Something went wrong"
        );
        setData(null);
        console.error(
          "++++++++++++++++++ERROR_IN_API_CALLING++++++++++++++++++",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, error]
  );
  return { data, error, loading, callApi };
};
export default useApi;
