import React from 'react';

const Join = () => {
  return (
    <div className='join'>
      <img src='./joinLogo.png' alt='' id='join-logo' />
      <form action='' method='post'>
        <div className='join-form'>
          <p>이메일</p>
          <div id='join-email-form'>
            <input type='text' name='' id='' className='join-input' />
            <input type='button' value='중복확인' id='dup-check-btn' />
          </div>
          <p>비밀번호</p>
          <input type="password" name="" id="" className='join-input'/>
          <p>비밀번호 확인</p>
          <input type="password" name="" id="" className='join-input'/>
          <p>이름</p>
          <input type="text" name="" id="" className='join-input'/>
          <p>프로필 사진</p>
          <input type="file" name="" id="" />
          <p>경력사항</p>
          <textarea name="" id="join-career"></textarea>
          <input type="submit" value="가입하기" id='join-btn' className='join-input'/>
        </div>
      </form>
    </div>
  );
};

export default Join;
