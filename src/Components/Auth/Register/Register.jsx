import "./Register.css";
import { useEffect, useContext } from 'react';
import { authContext } from '../../../AuthContext/AuthContext.jsx';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const Register = () => {

  // Component States
  const { handleRegister, rememberMe, setRememberMe } = useContext(authContext);


  // Zod schema for validation
  const registerSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({ resolver: zodResolver(registerSchema) });


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


  // UseEffect
useEffect(() => {
  retrieveDataFromLocalStorage();
}, []);


  return (
    <div className="register">
      <Container>
        <div className="card border-0">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="left">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img src="/register.png" className="img-fluid animated-img" alt="Illustration" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="right card border-0 px-4 py-5">
                <div className="row mb-4 px-3">
                  <h1>REGISTER</h1>
                </div>


                {/* Email Address */}
                <form onSubmit={handleSubmit(handleRegister)}>
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
                  </div>


                  {/* Login Button */}
                  <div className="row mb-3 px-3">
                    <button type="submit" className="btn" disabled={ isSubmitting }>
                      {isSubmitting ? "Register..." : "REGISTER"}
                    </button>
                  </div>
                </form>


                <div className="row mb-4 px-3">
                  <h6 className="font-weight-bold">
                    Already Have An Account? <Link to="/auth/login" className="text-danger">Login</Link>
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



export default Register;