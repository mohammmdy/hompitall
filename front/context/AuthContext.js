import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: null,
  temporaryToken: null,
  disease:"يصعب التشخيص",
  section:"خاص أو حكومي",
  setSection: ()=>{},
  setDisease: ()=>{},
  setTemporaryToken: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [temporaryToken, setTemporaryToken] = useState(null);
  const [disease , setDisease] = useState("يصعب التشخيص")
  const [section , setSection] = useState("خاص أو حكومي")

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        temporaryToken,
        setTemporaryToken,
        disease,
        setDisease,
        section,
        setSection
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
