import React, { createContext, useState } from 'react';

const ModalContext = createContext({ visible: false, setVisible: () => {} });

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </ModalContext.Provider> 
  );
};

export default ModalContext;