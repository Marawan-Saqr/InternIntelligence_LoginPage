import AuthContextProvider from "./AuthContext/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Protected-route/ProtectedRoute.jsx";
import Home from "./Components/Home/Home.jsx";
import LoginPage from "./Components/Auth/Auth.jsx";
import Login from "./Components/Auth/Login/Login.jsx";
import Register from "./Components/Auth/Register/Register.jsx";
import NotFound from "./Components/Not-found/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="auth" element={<LoginPage />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;