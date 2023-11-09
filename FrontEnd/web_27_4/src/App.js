import './reset.css';
import './App.css';
import Login from './pages/Login';
import Index from './pages/Index';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='wrap'>
      <Routes>
        <Route path='/' element={<Index/>} />
      </Routes>
    </div>
  );
}

export default App;
