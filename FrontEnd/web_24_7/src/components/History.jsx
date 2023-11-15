import React from 'react';

const History = ({ history, memberinfo }) => {
  console.log(history, memberinfo);
  return (
    <div id='history'>
      <div className='member-info-container'>
        <div>
          <span id='member-name'>{memberinfo.name} 회원</span>
          <p id='member-info'>회원 정보</p>
        </div>
        <div id='hamburger-icon'>
          <img src='./hamburger.png' alt='' />
        </div>
      </div>
      <div className='history-container'>
        <div className='history-item'>
          <p className='history-category'>운동 종류</p>
          <p className="user-comment"></p>
          <p className='history-date'>신청 날짜</p>
        </div>
        <ul>
          {history.map((data, index) => {
            return (
              <li>
                <hr/>
                <div className='history-item'>
                  <p className='history-category'>{data.exercise}</p>
                  <p className='history-date'>{data.connection_date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default History;
