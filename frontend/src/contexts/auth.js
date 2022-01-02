import {
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';

const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const tokenKey = localStorage.getItem("@App:Token_Key");
    return tokenKey ? true : false;
  });


  const setAuth = useCallback(
    (isAuthenticated) => {
      setIsAuthenticated(isAuthenticated);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuth,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}
