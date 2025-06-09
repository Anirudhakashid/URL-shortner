import { createContext, useEffect, useContext } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentUser } from "./utils/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    error,
    fn: fetchUser,
    setData: setUser,
  } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider
      value={{ user, loading, fetchUser, isAuthenticated, setUser }}
    >
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook to use the UrlContext
// This allows us to access the context in any component that needs it
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
