# 티캐치
티캐치란 ticket + catch 의 합성어로 모든 티켓을 잡는다는 뜻을 내포하고 있다.
티캐치에서는 많은 문화시설 체험 및 관람 공연의 티켓들을 예매할 수 있고 유저는 쉽게 예매한 티캣의 정보를 조회할 수 있다. (날짜, 인원수, 장소 등)

## 프로젝트 소개
티켓 예매 사이트.
예술 작품 위주의 문화시설 체험을 예매하는 사이트.
고객은 원하는 작품을 찾아 원하는 날짜를 선택하여 로그인 이후 예매 날짜를 다시한번 체크 후 관람을 원하는 인원수를 선택하여 티켓을 예매할 수 있다.
예매 하면 로그인된 고객의 마이페이지의 영수증이 생기고 예매한 티켓의 정보도 조회할 수 있다. (날짜, 인원수, 장소 등)

(추후 개발) 
(예매 하면 고객의 캘린더의 고객이 예매한 날짜랑 장소를 조회 할 수 있다) 
(관리자 페이지가 따로 있으며 여기서는 모든 회원들의 정보 및 예매한 티켓의 로그(누가 무엇을 언제 예매하였고 그 티캣의 날짜 장소 등) 를 조회 할 수 있다)
()

## 타켓사이트 
인터파크, 티켓링크, 서울문화포털 (api)

## 개발 기간
- 24.11.04 ~ 24.12.26
  
- 1주일 주제 선정 11.04 ~ 11.08
- 약 1주일 설계 11.11 ~ 11.20
- 약 4주 개발 11.20 ~ 12.18
- 2일 통합 및 버그 수정 12.18 ~ 12.20
- 1일 문서 작업 12.23
- 발표 12.24
- 약 2달

## 맴버 구성
- 조장 : 김민성 - 예매페이지 / 결제 / DB / ERD /  플로우 차트 / 시퀀스 다이어그램 / 메인페이지 / 마이페이지 / 로그인 및 회원가입 / 공연정보 불러오기 API
- 팀원 : 박성우 - DB / ERD / 공연정보 불러오기 API / Git 설정 / 스프링 & 리액트 통합
- 팀원 : 이혜원 - 상세페이지 / 후기 / 찜 / DB / ERD / 플로우 차트 / 유스케이스 / 메인페이지 / 마이페이지 
- 팀원 : 손홍석 - 와이어프레임 
- 팀원 : 신윤창 - 

(나중에 문서 작업 및 발표 적기)

## 설계도
[플로우 차트 / ERD / 와이어프레임 유스케이스 등](https://drive.google.com/file/d/1rJ98jUYeRiusLpkJjoduckJKTypFYKiF/view?usp=sharing)

## 개발 환경
(노트북에서 작동하려고 해서 버전은 검수 필요함)
### Front-End
- React (18.3.1)
### Back-End
- Java 17 <- 21 << 노트북으로 옮길때 21로 됨 (Reservation 및 newDetail 은 21로 작동함)
- IDE : Spring Tools 4.25.0
- Framewordk : Springboot (3.3.5)
- Server : Apache / Tomcat
- Database : Oracle DB (11.2.0.2.0) (DBeaber 24.1.3)
- ORM : Hibernate (JPA)

## 주요 기능
### API 사용
- 공공데이터 포탈 등
- [공연정보 불러오기 API](https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074)
- 결제 (토스페이 API)
  
### DB 
-- 초기 데이터 테이블
CREATE TABLE PFJoin (
    seq_pfjoin_id NUMBER PRIMARY KEY, -- PK로 사용하는 시퀀스
    p_id VARCHAR2(255), -- 공연 아이디
    p_title VARCHAR2(255), -- 제목
    p_poster VARCHAR2(255), -- 공연 포스터
    p_start_date VARCHAR2(255), -- 공연 시작일
    p_end_date VARCHAR2(255), -- 공연 종료일
    pd_location VARCHAR2(255), -- 공연 위치
    pd_hall_name VARCHAR2(255), -- 공연장 이름
    pd_cast VARCHAR2(255), -- 출연진
    pd_runtime VARCHAR2(255), -- 상영시간
    pd_seatprice VARCHAR2(255), -- 좌석가격
    p_genre VARCHAR2(255), -- 공연 장르
    pd_child VARCHAR2(255), -- 어린이 시청 여부
    pd_img VARCHAR2(255), -- 상세 이미지
    pd_time VARCHAR2(255), -- 공연 일정
    pl_location_sido VARCHAR2(255), -- 공연 지역, 시도
    pl_location_gun VARCHAR2(255), -- 공연 지역, 구군
    fd_phone VARCHAR2(255), -- 시설 전화번호
    fd_addr VARCHAR2(255), -- 시설 주소
    fd_latitude VARCHAR2(255), -- 시설 위도
    fd_longitude VARCHAR2(255) -- 시설 경도
);

--    pd_visit VARCHAR2(255), -- 현장 구매 여부

CREATE SEQUENCE seq_pfjoin_id
START WITH 1
INCREMENT BY 1
NOCACHE;

SELECT * FROM PFJoin;

-- 구매내역 테이블
CREATE TABLE Orders (
    SEQ_order_id NUMBER PRIMARY KEY, -- 기본 키 (주문 ID 시퀀스)
    user_id VARCHAR2(30), -- 외래 키 (사용자 ID)
    cancel_status VARCHAR2(255), -- 취소 상태
    cancel_date VARCHAR2(255), -- 취소일
    buy_date VARCHAR2(255), -- 결제일
    total_sum VARCHAR2(255), -- 결제 금액
    total_ticket VARCHAR2(255), -- 구매한 티켓 개수
    seq_pfjoin_id VARCHAR2(255), -- 외래 키 (공연 시퀀스 아이디)
    view_date VARCHAR2(255), -- 관람일
    view_time VARCHAR2(255), -- 관람 회차
    seat_num VARCHAR2(255), -- 좌석 번호
    place VARCHAR2(255) -- 관람장소 이름
--    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Users 테이블 참조
--    CONSTRAINT fk_seq_pfjoin_id FOREIGN KEY (seq_pfjoin_id) REFERENCES Performances(seq_pfjoin_id) -- Performances 테이블 참조
);

CREATE SEQUENCE orders_seq
START WITH 1
INCREMENT BY 1;

SELECT * FROM ORDERS o ;

TRUNCATE TABLE ORDERS;

-- 좌석 개수 및 판매좌석 조회 테이블 
CREATE TABLE Seat (
    seq_pfjoin_id NUMBER NOT NULL, -- 공연 시퀀스 아이디 (PK/FK)
    select_date VARCHAR2(255) NOT NULL, -- 날짜 (PK)
    select_time VARCHAR2(255) NOT NULL, -- 회차 (PK)
    total NUMBER DEFAULT 160, -- 총 잔여 좌석 수 (초기값 160)
    sold_seat VARCHAR2(255), -- 판매된 좌석 이름
    PRIMARY KEY (seq_pfjoin_id, select_date, select_time) -- 복합 PK 설정
);

SELECT * FROM SEAT s ;

TRUNCATE TABLE SEAT ;

-- 유저 테이블
CREATE TABLE Users (
    seq_user_id NUMBER PRIMARY KEY, -- PK
    user_id VARCHAR2(30) NOT NULL, -- FK
    user_pw VARCHAR2(30) NOT NULL,
    user_name VARCHAR2(10) NOT NULL,
    user_phone VARCHAR2(15),
    user_email VARCHAR2(50),
    login_type VARCHAR2(50),
    u_create_date DATE DEFAULT SYSDATE, -- 회원가입일
    u_update_date DATE                 -- 정보 수정일
);

CREATE SEQUENCE seq_user_id_seq
START WITH 1
INCREMENT BY 1;

SELECT * FROM USERS u ;

TRUNCATE TABLE USERS ;

-- 회원 더미 데이
INSERT INTO Users (seq_user_id, user_id, user_pw, user_name, user_phone, user_email, login_type, u_create_date, u_update_date)
VALUES (seq_user_id_seq.NEXTVAL, 'user01', 'password123', '홍길동', '010-1234-5678', 'user01@example.com', '일반', SYSDATE, NULL);

INSERT INTO Users (seq_user_id, user_id, user_pw, user_name, user_phone, user_email, login_type, u_create_date, u_update_date)
VALUES (seq_user_id_seq.NEXTVAL, 'user02', 'mypassword', '김철수', '010-2345-6789', 'user02@example.com', '구글', SYSDATE, NULL);

-- 찜하기 테이블
CREATE TABLE Save(
   seq_save_id NUMBER PRIMARY KEY,
   user_id varchar2(30),
   seq_pfjoin_id number,
   CONSTRAINT fk_seq_pfjoin_id FOREIGN KEY (seq_pfjoin_id) REFERENCES PFJoin(seq_pfjoin_id)
);

CREATE SEQUENCE SEQ_SAVE_ID
START WITH 1
INCREMENT BY 1;

-- save 테이블에 p_poster 컬럼 추가
ALTER TABLE save
ADD p_poster VARCHAR2(500);


SELECT * FROM SAVE s ;

TRUNCATE TABLE SAVE ;

상세페이지에서 쓴거 말고는 다 있는듯

### 예매 및 결제
- 
### 마이페이지
-
### 상세페이지
- 
### 메인페이지
-
### 로그인 및 회원가입 
-

### 버그
- alter table 문 있으니 그거 해야됨
- 처음 create 문으로 스프링을 돌리면 테이블들이 생성되는데 Seat 테이블은 삭제 후 위에 있는 create 문으로 다시 만들어주어야됨
- 상세페이지 "~" 를 처리못함 그래서 예매 페이지랑 상세페이지 달력에서 예매할수 있는 날짜가 다름
- 예매페이지에서 회차 변경시 날짜 변경되면 달력에서의 날짜는 변경이 안됨
- 상세페이지 작은 화면에서 켜면 오른쪽으로 더 길어서 화면이 이상하게 출력이됨
- 환불 기능 없음
- 회원 탈퇴 기능 없음
- 


