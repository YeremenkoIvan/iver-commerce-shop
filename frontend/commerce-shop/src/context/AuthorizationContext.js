import { createContext, useState } from "react";
import { AuthorizationModal } from "../components";

const AuthorizationContext = createContext();

const AuthorizationContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const showAuthModal = () => setShow(true);

  return (
    <AuthorizationContext.Provider value={{ showAuthModal }}>
      {children}

      <AuthorizationModal show={show} setShow={setShow} />
    </AuthorizationContext.Provider>
  );
};

export { AuthorizationContext, AuthorizationContextProvider };
