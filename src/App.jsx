import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Components/Login-page/LoginPage.jsx';
import Login from './Components/Login-page/Login/Login.jsx';
import NotFound from './Components/Not-found/NotFound.jsx';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;