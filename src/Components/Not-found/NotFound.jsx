import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  return (
    <Container className="not-found d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <Button className="btn" size="lg">
          <Link to={"/"}>Go Home</Link>
        </Button>
      </Link>
    </Container>
  );
};


export default NotFound;