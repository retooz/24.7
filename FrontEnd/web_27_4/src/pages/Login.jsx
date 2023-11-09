import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
        <img src="./loginLogo.png" alt="" style={{maxHeight: '25vh'}}/>
        <form action="/trainer/login" method="POST">
            <input type="text" name="" id="" placeholder='Email'className='login-input'/>
            <input type="password" name="" id="" placeholder='Password'className='login-input'/>
            <input type="submit" value="로그인" id='login-btn' className='login-input'/>
        </form>
        <div className='user-link'>
            <Link to={'/join'}><span>회원가입</span></Link>
            <Link to={'/find_password'}><span>비밀번호 찾기</span></Link>
        </div>
    </div>
  )
}

export default Login