import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Register from './views/register/register.jsx';
import Home from './views/home/home.jsx';
import NavbarGlobal from './views/partials/navbarGlobal.jsx';
import CustomerRegister from './views/customer/customerFormRegister.jsx';
import CustomerPanel from './views/customer/customerPanel.jsx';
import WorkerRegister from './views/worker/workerFormRegister.jsx';
import WorkerPanel from './views/worker/workerPanel.jsx';
import LandingPage from './views/home/LandingPage.jsx';
import About from './views/about/about.jsx';
import Chat from './views/components/chat/chat2.jsx';
import Modal from './views/components/modals/commonModal/CommonModal.jsx';


function App() {
  const [formToShow, setFormToShow] = useState(null);

  const handleNavClick = () => {
      setFormToShow(null); // Oculta los formularios al hacer clic en un enlace del navbar
  }

  return (
    <div className="App">
        <BrowserRouter>
          <NavbarGlobal onNavClick={handleNavClick} className="navbarGlobal" />
          <Routes>
            <Route path='/' element={<Home formToShow={formToShow} setFormToShow={setFormToShow} className="home" />} />
            <Route path='/registercustomer' element={<CustomerRegister />} />
            <Route path='/customerpanel' element={<CustomerPanel />} />
            <Route path='/registerworker' element={<WorkerRegister />} />
            <Route path='/workerpanel' element={<WorkerPanel />} />
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/modal' element={<Modal />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
