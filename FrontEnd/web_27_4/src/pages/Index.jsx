import React from 'react';


const Index = () => {

  

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
            <input type="button" id='member-search-button' value='검색'/>
          </div>
          <div id='member-list'>
            <ul>
              <li>이주리 회원</li>
              <li>이시윤 회원</li>
              <li>신범식 회원</li>
              <li>송민재 회원</li>
              <li>서주원 회원</li>

            </ul>
          </div>
        </div>
      </div>
      <div className='data-container'>
        
        <span id='before-select'>열람할 회원을 클릭하세요.</span>
      </div>
    </div>
  );
};

export default Index;
