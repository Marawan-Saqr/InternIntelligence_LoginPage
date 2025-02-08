import "./Login.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Login = () => {
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

              {/* Login */}
              <div className="row px-3">
                <label>
                  <h6>Email Address</h6>
                </label>
                <input className="mb-4" type="text" placeholder="Enter a valid email address" />
              </div>

              {/* Register */}
              <div className="row px-3">
                <label>
                  <h6>Password</h6>
                </label>
                <input type="password" placeholder="Enter password" />
              </div>

              {/* Actions */}
              <div className="actions d-flex justify-content-between align-items-center mb-4">
                <div className="left-action">
                  <input type="checkbox" className="me-2" />
                  <span>Remember me</span>
                </div>
                  <div className="right-action">
                  <button className="btn ">Forgot password?</button>
                </div>
              </div>

              {/* Login Button */}
              <div className="row mb-3 px-3">
                <button type="submit" className="btn">LOGIN</button>
              </div>
              <div className="row mb-4 px-3">
                <h6 className="font-weight-bold">
                  Don't have an account? <Link to={"/register"} className="text-danger">Register</Link>
                </h6>
              </div>
            </div>
          </Col>
        </Row>


        {/* Footer */}
        <div className="footer py-2">
          <div className="container">
            <h5>&copy; 2025. ALL RIGHTS RESERVED.</h5>
          </div>
        </div>
        {/* Footer */}


      </div>
    </Container>
    </div>
  );
};

export default Login;
