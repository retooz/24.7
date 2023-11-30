import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Index from './pages/Index';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import axios from './axios';

export const Data = createContext();

function App() {
  const [trainerInfo, setTrainerInfo] = useState({});
  const [memberList, setMemberList] = useState([]);
  const [filteredMemberList, setFilteredMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [memberHistory, setMemberHistory] = useState([]);
  const [selectedConnCode, setSelectedConnCode] = useState(0);
  const [detailData, setDetailData] = useState({});

  const getMemberList = () => {
    axios
      .post('/getMemberList', {
        trainer_code: trainerInfo.trainer_code,
      })
      .then((res) => {
        setMemberList(res.data.list);
        setFilteredMemberList(res.data.list);
      });
  };

  const getHistory = () => {
    axios
      .post(`/getHistory`, {
        trainer_code: trainerInfo.trainer_code,
        user_code: selectedMember,
      })
      .then((res) => {
        setMemberHistory(res.data.history);
      });
  };

  const getMemberInfo = () => {
    axios
      .post('/getMemberInfo', {
        user_code: selectedMember,
      })
      .then((res) => {
        setSelectedMemberData(res.data.info);
      });
  };

  const getDetail = () => {
    axios
      .post('/getDetail', {
        connection_code: selectedConnCode,
      })
      .then((res) => {
        setDetailData(res.data.detail);
      });
  };

  const reset = () => {
    setSelectedMember(0);
    setSelectedConnCode(0);
    setDetailData({});
  };

  return (
    <div className='wrap'>
      <Data.Provider
        value={{
          trainerInfo,
          setTrainerInfo,
          memberList,
          setMemberList,
          filteredMemberList,
          setFilteredMemberList,
          selectedMember,
          setSelectedMember,
          selectedMemberData,
          setSelectedMemberData,
          memberHistory,
          setMemberHistory,
          selectedConnCode,
          setSelectedConnCode,
          detailData,
          setDetailData,
          getMemberList,
          getHistory,
          getMemberInfo,
          getDetail,
          reset,
        }}
      >
        <Routes>
          {!trainerInfo.email ? (
            <Route path='/' element={<Login />} />
          ) : (
            <Route path='/' element={<Index />} />
          )}
          <Route path='/editProfile' element={<Index edit={1}/> } />
          <Route path='/join' element={<Join />} />
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
