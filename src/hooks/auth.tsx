import * as React from "react";

export const useProvideAuth = () => {
  const [user, setUser] = React.useState<string | null>(null);

  const signin = (username: string, password: string) => {
    return new Promise((res, rej) => {
      if (username === "demo" && password === "demo") {
        setUser(username);
        res("Success");
      }
      rej("Wrong username or password");
    });
  };

  const signout = (cb: any) => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
};

const AuthContext = React.createContext<any>(null);

const AuthProvider: React.FC<any> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
