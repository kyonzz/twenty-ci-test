import * as React from "react";

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };

const AuthContext = React.createContext<any>(null);

const AuthProvider: React.FC<any> = ({ children }) => {
  return <AuthContext.Provider value={1}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
