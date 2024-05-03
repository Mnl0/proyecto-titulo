import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login.jsx'
import Home from './views/Home.jsx';
import GlobalNavbar from './components/GlobalNavbar.jsx'
import Register from './views/Register.jsx';
function App() {
  return (
    <BrowserRouter>
      <GlobalNavbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
