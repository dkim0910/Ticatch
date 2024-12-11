# 티캐치
티캐치란 ticket + catch 의 합성어로 모든 티캣을 잡는다는 뜻을 내포하고 있다.
티캐치에서는 많은 문화시설 체험 및 관람 공연의 티캣들을 예매할 수 있고 유저는 쉽게 예매한 티캣의 정보를 조회할 수 있다. (날짜, 인원수, 장소 등)

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
- 약 3주 개발 11.20 ~ 12.11
- 약 1주 통합 및 버그 수정 12.11 ~ 12.20
- 2일 문서 작업 12.23 ~ 12.24
- 12.25 크리스마스
- 발표 12.26
- 약 2달

## 맴버 구성
- 조장 : 김민성 - 예매페이지 / 결제 / DB / ERD /  플로우 차트 / 시퀀스 다이어그램
- 팀원 : 박성우 - 마이페이지 / DB / ERD / 공연정보 불러오기 / Git 설정 / 스프링 & 리액트 통합
- 팀원 : 이혜원 - 상세페이지 / 후기 / 찜 / DB / ERD / 플로우 차트 / 유스케이스
- 팀원 : 손홍석 - 로그인 및 회원 가입 / 와이어프레임 
- 팀원 : 신윤창 - 메인페이지 / 헤더 및 푸터

(나중에 문서 작업 및 발표 적기)

## 설계도
[플로우 차트 / ERD / 와이어프레임 유스케이스 등](https://drive.google.com/file/d/1rJ98jUYeRiusLpkJjoduckJKTypFYKiF/view?usp=sharing)

## 개발 환경
### Front-End
- React (18.3.1) << 검수 필요
### Back-End
- Java 17
- IDE : Spring Tools 4.25.0
- Framewordk : Springboot (3.3.5)
- Server : Apache / Tomcat
- Database : Oracle DB (11.2.0.2.0) (DBeaber 24.1.3)
- ORM : Hibernate (JPA) << 검수 필요

## 주요 기능
### API 사용
- 공공데이터 포탈 등
- [공연정보 불러오기 API](https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074)
- 로그인 (카카오, 네이버 등)
- 결제 (토스페이 API)
  
### DB
- 
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



