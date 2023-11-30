import React, { useContext, useRef } from 'react';
import axios from '../axios';
import { Data } from '../App';
import './Detail.css';

const Detail = () => {
  const { selectedMemberData, detailData, reset } = useContext(Data);
  console.log(selectedMemberData)
  const accuracy_list = detailData.accuracy_list
    .replace('[', '')
    .replace(']', '')
    .split(',');
  const score = detailData.accuracy;
  const blank_width = 100 - score;
  const feedbackContentRef = useRef();
  const alertMessage = useRef();
  const linkRef = useRef();

  const getColor = (score) => {
    if (score >= 85) {
      return '#969AFF';
    } else if (score >= 70) {
      return '#97E79A';
    } else if (score >= 55) {
      return '#FFE86D';
    } else if (score >= 40) {
      return '#FFC692';
    } else {
      return '#FF939C';
    }
  };

  const submit = () => {
    const connectionCode = detailData.connection_code;
    const feedbackContent = feedbackContentRef.current.value;
    const link = linkRef.current.value;
    const base = detailData.user_video_url.split('.')[0];

    if (!feedbackContent) {
      alertMessage.current.style.display = 'block';
    } else {
      axios
        .post('/sendFeedback', {
          connection_code: connectionCode,
          feedbackContent: feedbackContent,
          link: link,
          base: base,
        })
        .then((res) => {
          if (res.data.result === 'success') {
            reset();
          }
        });
    }
  };

  return (
    <div id='detail-container'>
      <div id='detail-left'>
        <div id='member-info-detail'>
          <div>
            <span className='member-name'>
              {selectedMemberData.nickname} 회원
            </span>
            <p className='member-info'>가입 일자: {selectedMemberData.join_date}</p>
            <p className="member-info">운동한 횟수: {selectedMemberData.cnt}</p>
          </div>
          <div id='hamburger-icon'>
            <img src='./hamburger.png' alt='' />
          </div>
        </div>
        <div id='user-video-with-comment'>
          <div>
            <p className='detail-heading'>스쿼트</p>
            <hr />
            <div id='video-section'>
              <video muted>
                {/* <source src={detail.user_video_url} type='video/mp4'/> */}
                <source src='./squat.mp4' type='video/mp4' />
              </video>
            </div>
            <hr />
            <div id='user-comment'>
              <p>{selectedMemberData.user_comment}</p>
            </div>
          </div>
        </div>
      </div>
      <div id='detail-right'>
        <div id='analysis-result'>
          <p className='detail-heading'>AI 분석 결과</p>
          <div>
            <p id='score-heading'>평균 점수</p>
            <div id='score-bar-section'>
              <p>{score}점</p>
              <div id='score-bar'>
                <div
                  id='blank-section'
                  style={{ width: `${blank_width}%`, marginLeft: `${score}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div id='score-list'>
            {accuracy_list.map((score, index) => {
              return (
                <div className='per-score' key={index}>
                  {index + 1}회 점수: {score}점
                  <div
                    className='score-dot'
                    style={{ backgroundColor: getColor(score) }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div id='comment-write-form'>
          <textarea
            name=''
            id='comment-area'
            placeholder='내용 입력'
            ref={feedbackContentRef}
          ></textarea>
        </div>
        <div id='attachment-input-form'>
          <div id='attachment-input-section'>
            <input type='text' placeholder='첨부링크' ref={linkRef} />
          </div>
          <div id='attachment-button-section'>
            <input
              type='button'
              value=''
              id='submit'
              onClick={() => submit()}
            />
            <label for='submit'>저장</label>
          </div>
        </div>
      </div>
      <p id='alret-message' ref={alertMessage}>
        피드백 내용을 입력해주세요.
      </p>
    </div>
  );
};

export default Detail;
