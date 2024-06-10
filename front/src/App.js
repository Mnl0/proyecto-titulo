import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/home.jsx';
import CustomerLogin from './views/customer/customerLogin.jsx';
import CustomerRegister from './views/customer/customerFormRegister.jsx';
import CustomerPanel from './views/customer/customerPanel.jsx';
import NavbarGlobal from './views/partials/navbarGlobal.jsx';
import Register from './views/register/register.jsx';
import WorkerRegister from './views/worker/workerFormRegister.jsx';
import WorkerLogin from './views/worker/workerLogin.jsx';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <NavbarGlobal />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/customerpanel' element={<CustomerPanel />} />
            <Route path='/customerregister' element={<CustomerRegister />} />
            <Route path='/registerworker' element={<WorkerRegister />} />
            {/*<Route path='/customerlogin' element={<CustomerLogin />} />
            <Route path='/workerlogin' element={<WorkerLogin />} />
            <Route path='/Register' element={<Register />} />*/}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
