import { useState } from "react";

// Custom hook for fetching data
// This hook can be used to fetch data from an API or perform any asynchronous operation.
const useFetch = (cb, options = {}) => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
