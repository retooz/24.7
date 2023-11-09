import logo from './logo.svg';
import './reset.css';
import './App.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='wrap'>
      <Routes>
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
