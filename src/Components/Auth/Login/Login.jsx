import "./Login.css";
import { useContext, useEffect } from 'react';
import  { authContext } from '../../../AuthContext/AuthContext.jsx';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from 'sweetalert2';


const Login = () => {

  // Component States
  const { handleLogin, rememberMe, setRememberMe, handleForgotPassword } = useContext(authContext);


  // Zod schema for validation
  const loginSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues } = useForm({ resolver: zodResolver(loginSchema) });


  // Get Retrieve saved credentials Function
    const retrieveDataFromLocalStorage = () => {
      const savedEmail = localStorage.getItem("email");
      const savedPassword = localStorage.getItem("password");
      if (savedEmail && savedPassword) {
        setValue("email", savedEmail);
        setValue("password", savedPassword);
        setRememberMe(true);
      }
    }


    const handleResetPassword = () => {
      const email = getValues("email");
      if (!email) {
        Swal.fire({
          title: "Error",
          text: "Please enter your email first!",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        handleForgotPassword(email);
      }
    };


    // UseEffect
  useEffect(() => {
    retrieveDataFromLocalStorage();
  }, []);


  return (
    <div className="login">
      <Container>
        <div className="card border-0">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="left">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img src="https://i.imgur.com/uNGdWHi.png" className="img-fluid" alt="Illustration" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="right card border-0 px-4 py-5">
                <div className="row mb-4 px-3">
                  <h1>LOGIN</h1>
                </div>


                {/* Email Address */}
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="row ps-3 mb-4">
                    <label>
                      <h6>Email Address</h6>
                    </label>
                    <input
                      className={`${errors.email ? "is-invalid" : ""}`}
                      type="email"
                      placeholder="Enter a valid email address"
                      {...register("email")}
                    />
                    {errors.email && <p style={{padding: '0px'}} className="text-danger">{errors.email.message}</p>}
                  </div>


                  {/* Password */}
                  <div className="row ps-3 mb-4">
                    <label>
                      <h6>Password</h6>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className={`${errors.password ? "is-invalid" : ""}`}
                      {...register("password")}
                    />
                    {errors.password && <p style={{padding: '0px'}} className="text-danger">{errors.password.message}</p>}
                  </div>


                  {/* Remmber Me */}
                  <div className="actions d-flex justify-content-between align-items-center mb-4">
                    <div className="left-action">
                      <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="me-2" />
                      <span>Remember me</span>
                    </div>
                    <div className="right-action">
                      <button type="button" className="btn" onClick={handleResetPassword}>Forgot password?</button>
                    </div>
                  </div>


                  {/* Login Button */}
                  <div className="row mb-3 px-3">
                    <button type="submit" className="btn" disabled={isSubmitting}>
                      {isSubmitting ? "Logging in..." : "LOGIN"}
                    </button>
                  </div>
                </form>


                <div className="row mb-4 px-3">
                  <h6 className="font-weight-bold">
                    Don't have an account? <Link to="/auth/register" className="text-danger">Register</Link>
                  </h6>
                </div>
              </div>
            </Col>
          </Row>

          <div className="footer py-2">
            <div className="container">
              <h5>&copy; 2025. ALL RIGHTS RESERVED.</h5>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};



export default Login;