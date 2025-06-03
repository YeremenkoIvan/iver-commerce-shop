import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextManager } from "./context";
import { MainLayout } from "./layouts";
import { Home, Profile } from "./pages";
import { SignInForm } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <ContextManager>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />}></Route>
          </Route>
          <Route path="/login" element={<SignInForm />}></Route>
        </Routes>
      </ContextManager>
    </BrowserRouter>
  );
}
