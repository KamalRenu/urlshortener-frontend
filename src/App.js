import './App.css';
import UrlShort from './UrlShort';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className='text-center'>Url Shortener</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/urlshort" element={<UrlShort />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
