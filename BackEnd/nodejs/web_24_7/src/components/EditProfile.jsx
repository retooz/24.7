import React, { useContext, useEffect } from 'react'
import { Data } from '../App';
import './EditProfile.css'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const {
    trainerInfo,
    reset,
  } = useContext(Data)

  const navigate = useNavigate();
  if (!trainerInfo.email) {
    navigate('/')
  }



  useEffect(() => {
    reset()
    // eslint-disable-next-line
  }, [])

  return (
    <div id='edit-profile'>
      <p id='edit-profile-heading'>회원정보 수정</p>
      <div id='edit-profile-form'>
        <div className="edit-profile-form-left">
          <p>이메일</p>
        </div>
        <div className="edit-profile-form-right">
          <input type="text" value={trainerInfo.email} disabled/>
        </div>
        <div className="edit-profile-form-left">
          <p>사진</p>
        </div>
        <div className="edit-profile-form-right">
          <input type="file" id="update-file" />
          <input type="text" id="update-file-name" disabled/>
          <label for="update-file">업로드</label>
        </div>
        <div className="edit-profile-form-left form-large">
          <p>경력</p>
        </div>
        <div className="edit-profile-form-right form-large">
          <textarea id="career-area" value={trainerInfo.career}></textarea>
        </div>
      </div>
      <div id='submit-button-section'>
        <input type="button" value="수정" id='submit-button'/>

      </div>
    </div>
  )
}

export default EditProfile