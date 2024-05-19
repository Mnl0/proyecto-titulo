import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/home.jsx';
import CustomerPanel from './views/customerPanel/customerPanel.jsx';
import NavbarGlobal from './views/partials/navbarGlobal.jsx';
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <NavbarGlobal />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/panel' element={<CustomerPanel />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
