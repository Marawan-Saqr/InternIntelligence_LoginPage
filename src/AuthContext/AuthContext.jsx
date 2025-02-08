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
      let userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      let keyGenerated = await user.getIdToken();
      localStorage.setItem("userToken", JSON.stringify(keyGenerated));
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
      Swal.fire("Success", "Registration complete! Redirecting to login...", "success").then(() => {
        navigate("/auth/login");
      });
  
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire("Error", "This email is already registered. Try logging in instead.", "error");
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };


  // Logout Function
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/auth/login");
        });
      }
    });
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
    <authContext.Provider value={{ handleRegister, handleLogin, handleForgotPassword, logout, rememberMe, setRememberMe }}>
      {children}
    </authContext.Provider>
  );
};


export default AuthContextProvider;