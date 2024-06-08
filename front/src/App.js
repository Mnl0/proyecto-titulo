import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/home.jsx';
import CustomerPanel from './views/customer/customerPanel.jsx';
import NavbarGlobal from './views/partials/navbarGlobal.jsx';
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import CustomerRegister from './views/customer/customerFormRegister.jsx';
import WorkerRegister from './views/worker/workerFormRegister.jsx';

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
            <Route path='/registercustomer' element={<CustomerRegister />} />
            <Route path='/registerworker' element={<WorkerRegister />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
