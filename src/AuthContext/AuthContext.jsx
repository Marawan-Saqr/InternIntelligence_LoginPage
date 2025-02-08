import { createContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


export const authContext = createContext();
const AuthContextProvider = ({ children }) => {

  // Component States
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);


  // Login Function
  const handleLogin = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      if (rememberMe) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      Swal.fire({
        title: "Login Successful",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  // Register Function
  const handleRegister = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (rememberMe) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      Swal.fire({
        title: "Register Successful",
        text: "You Will Be Direct To Login",
        icon: "success",
        confirmButtonText: "OK",
        draggable: true,
      }).then(() => {
        navigate("/auth/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Register Failed",
        text: "Something Wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: "Check Your Email",
        text: "A password reset link has been sent to your email.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Reset Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  return (
    <authContext.Provider value={{ handleRegister, handleLogin, handleForgotPassword, rememberMe, setRememberMe }}>
      {children}
    </authContext.Provider>
  );
};


export default AuthContextProvider;