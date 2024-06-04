import React, { createContext, useState } from 'react';

const TemporaryToken = createContext({ temporaryToken: false, setTemporaryToken: () => {} });

export const TokenProvider = ({ children }) => {
  const [temporaryToken, setTemporaryToken] = useState(false);

  return (
    <TemporaryToken.Provider value={{ temporaryToken, setTemporaryToken }}>
      {children}
    </TemporaryToken.Provider> 
  );
};

export default TemporaryToken;