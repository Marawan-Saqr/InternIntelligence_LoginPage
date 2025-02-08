import './Home.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../AuthContext/AuthContext.jsx';

const Home = () => {

  const { logout } = useContext(authContext);


  return (
    <div className='home'>
      <h1>Welcome To Home Page</h1>
      <div className='buttons'>
        <button className='btn btn-warning'><Link to={"/auth/register"}>Register</Link></button>
        <button className='btn btn-success'><Link to={"/auth/login"}>Login</Link></button>
        <button className='btn btn-danger' onClick={ logout }>logout</button>
      </div>
    </div>
  )
}


export default Home;