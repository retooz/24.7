import React, { useEffect, useState } from 'react';
import History from '../components/History';
import axios from '../axios';

const Index = () => {
  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [memberHistory, setMemberHistory] = useState([]);

  const trainerCode = 20000002;

  const getMemberList = () => {
    axios
      .post('/trainer/getMemberList', {
        trainer_code: trainerCode,
      })
      .then((res) => {
        console.log(res);
        setMemberList(res.data.list);
      });
  };

  const getHistory = () => {
    axios
      .post(`/trainer/getHistory`, {
        trainer_code: trainerCode,
        user_code: selectedMember,
      })
      .then((res) => {
        setMemberHistory(res.data.history);
      });
  };

  const getMemberInfo = () => {
    axios
      .post('/trainer/getMemberInfo', {
        user_code: selectedMember,
      })
      .then((res) => {
        setSelectedMemberData(res.data.info[0])
      })
  }

  useEffect(() => {
    getMemberList();
  }, []);

  useEffect(() => {
    console.log('History Length',memberHistory.length);
    console.log('Selected Member',selectedMember);
  }, [selectedMember, memberHistory]);

  // Dummy Function
  useEffect(() => {
    if (selectedMember !== 0 && selectedMember !== undefined) {
      getHistory(selectedMember)
      getMemberInfo(selectedMember)
      // setSelectedMemberData({
      //   name: '이주리',
      // });
      // setMemberHistory([
      //   {
      //     exercise: 'squat',
      //     connection_code: '40000005',
      //     connection_date: '2023-11-09',
      //     comment: 'asdasd',
      //   },
      //   {
      //     exercise: 'push-up',
      //     connection_code: '40000001',
      //     connection_date: '2023-11-02',
      //     comment: 'asdasd',
      //   },
      // ]);
    }
  }, [selectedMember]);

  return (
    <div className='main'>
      <div className='menu-list'>
        <img src='./pageLogo.png' alt='' id='main-logo' />
        <div id='trainer-info'>
          <div id='profile-img' />
          <p>김형진 트레이너님</p>
          <div id='hamburger-icon'>
            <img src='./hamburger.png' alt='' />
          </div>
        </div>
        <div id='member-list-container'>
          <p>가입 회원 리스트</p>
          <div id='member-search-form'>
            <input type='text' name='' id='member-search-input' />
            <input type='button' id='member-search-button' value='검색' />
          </div>
          <div id='member-list'>
            <ul>
              {memberList.map((item, index) => {
                return (
                  <li>
                    <div
                      onClick={() => setSelectedMember(item.user_code)}
                      className='member-li'
                    >
                      {item.nickname} 회원
                    </div>
                    <div className='red-dot' />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className='data-container'>
        {memberHistory.length > 0 ? (
          <History history={memberHistory} memberinfo={selectedMemberData} />
        ) : (
          <div id='before-select'>
            <span>열람할 회원을 클릭하세요.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
