import { UserContextProvider } from "./UserContext";
import { CartContextProvider } from "./CartContext";
import { AuthorizationContextProvider } from "./AuthorizationContext";

export default function ContextManager({ children }) {
  return (
    <UserContextProvider>
      <AuthorizationContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </AuthorizationContextProvider>
    </UserContextProvider>
  );
}
