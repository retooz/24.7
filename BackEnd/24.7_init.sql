use Insa4_JSB_final_4;

DROP SEQUENCE user_code;
DROP SEQUENCE trainer_code;
DROP SEQUENCE connection_code;
DROP TABLE feedback_list_user;
DROP TABLE connection;
DROP TABLE trainer;
DROP TABLE user;
DROP TABLE reference_video;


CREATE SEQUENCE user_code START WITH 10000001 INCREMENT BY 1 MAXVALUE 19999999;
CREATE SEQUENCE trainer_code START WITH 20000001 INCREMENT BY 1 MAXVALUE 29999999;
CREATE SEQUENCE connection_code START WITH 30000001 INCREMENT BY 1 MAXVALUE 49999999;

CREATE TABLE user(
    email VARCHAR(50) NOT NULL COMMENT '회원 이메일',
    pw VARCHAR(100) NOT NULL COMMENT '회원 비밀번호',
    nickname VARCHAR(20) NOT NULL COMMENT '회원 별명',
    user_code INT NOT NULL DEFAULT NEXTVAL(user_code) COMMENT '회원 번호',
    join_date TIMESTAMP NOT NULL COMMENT '회원 가입일자',
    PRIMARY KEY (user_code)
);

CREATE INDEX user_index on user (user_code);

CREATE TABLE trainer(
    email VARCHAR(50) NOT NULL COMMENT '트레이너 이메일',
    pw VARCHAR(100) NOT NULL COMMENT '트레이너 비밀번호',
    trainer_name VARCHAR(20) NOT NULL COMMENT '트레이너 이름',
    profile_pic VARCHAR(512) COMMENT '프로필 사진',
    career VARCHAR(512) COMMENT '경력사항',
    trainer_code INT NOT NULL DEFAULT NEXTVAL(trainer_code) COMMENT '트레이너 번호',
    join_date TIMESTAMP NOT NULL COMMENT '트레이너 가입일자',
    PRIMARY KEY (trainer_code)
);

CREATE INDEX trainer_index on trainer (trainer_code);

CREATE TABLE connection (
    user_code INT NOT NULL COMMENT '회원 번호',
    trainer_code INT NOT NULL COMMENT '트레이너 번호',
    connection_code INT NOT NULL PRIMARY KEY COMMENT '연결 번호',
    exercise_category VARCHAR(20) NOT NULL COMMENT '운동 종류',
    user_comment VARCHAR(1024) COMMENT '회원 요청내용',
    accuracy FLOAT COMMENT '평균 정확도',
    accuracy_list VARCHAR(512) COMMENT '운동 회차별 정확도',
    user_video_url VARCHAR(512) NOT NULL COMMENT '회원 영상 URL',
    connection_date TIMESTAMP NOT NULL COMMENT '연결일자',
    confirm_trainer BOOLEAN NOT NULL DEFAULT false COMMENT '트레이너 확인 여부',
    CONSTRAINT FK_user_connection FOREIGN KEY(user_code) REFERENCES user(user_code),
    CONSTRAINT FK_trainer_connection FOREIGN KEY(trainer_code) REFERENCES trainer(trainer_code)
);

create index connection_index on connection (connection_code);

CREATE TABLE feedback_list_user (
    connection_code INT NOT NULL COMMENT '연결 번호',
    feedback_content VARCHAR(1024) NOT NULL COMMENT '피드백 내용',
    attachment VARCHAR(512) COMMENT '첨부 링크',
    base_url VARCHAR(512) COMMENT '잘라낸 회원 영상 URL',
    memo VARCHAR(100) COMMENT '회원 메모',
    feedback_date TIMESTAMP NOT NULL COMMENT '피드백 전송일자',
    confirm_user BOOLEAN NOT NULL DEFAULT false COMMENT '회원 확인여부',
    CONSTRAINT FK_connection_feedback_user FOREIGN KEY(connection_code) REFERENCES connection(connection_code)
);

CREATE INDEX feedback_index on feedback_list_user (connection_code);

CREATE TABLE reference_video(
    exercise_category VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '운동 종류',
    video_url VARCHAR(512) NOT NULL COMMENT '운동 영상 URL'
);