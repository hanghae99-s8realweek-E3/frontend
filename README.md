# GitHub ReadMe

---

# 항해 99 8기 3조 실전 프로젝트 - MIMIC!

![mimic.png](https://raw.githubusercontent.com/hanghae99-s8realweek-E3/frontend/main/public/images/ogimage.png)

---

### 📖 프로젝트 소개

> 미믹(MIMIC)이란, ‘흉내쟁이’ 또는 ‘따라쟁이’라는 의미를 가진 단어입니다.
>
> 요즘 뜨는 MBTI에서 영감을 얻어서 나와 다른 성향을 가진 사람들의 일상을 살아보면 어떨까?
> 또, 나의 일상이 다른 사람들의 일상이 된다면 어떨까? 라는 취지로 제작된,
> 타인과 나의 일상을 체험해보도록 하는 조금 특이한 SNS입니다.

### 🗓️ 프로젝트 운영 기간

- 개발 기간: 2022년 8월 26일 ~ 2022년 10월 7일
- 운영 기간: 2022년 9월 27일 ~ 2022년 10월 7일
- 런칭: 2022년 9월 27일 (Ver.1.0.0)
- 추가 업데이트: 2022년 10월 3일 (Ver.1.1.0)

### 👥 프론트엔드 팀원 소개

👨🏻‍💻 [리더] 신도윤: [https://github.com/DrunkenNeoguri](https://github.com/DrunkenNeoguri)

👨🏻‍💻 [프론트엔드 팀장] 이호진: [https://github.com/hojncode](https://github.com/hojncode)

👨🏻‍💻 [기술 고문] 김대연: [https://github.com/rlaedous](https://github.com/rlaedous)

👩🏻‍🎨 [아트 디렉터] 이예진

### ⛑️ **담당 작업**

👷🏻‍♂️ 신도윤

- 페이지 구현: 비밀번호 변경, 내 활동, 고객센터, 메인 화면, 프로필 수정, 마이 페이지(로그인 시), MBTI 선택 피드, 미믹, 회원 탈퇴, 온보딩
- 컴포넌트 구현: interface 폴더 내 Common 컴포넌트, 페이지별 피드 카드
- 프로젝트 관리: JIRA 스프린트 및 Github Project 관리
- 페이지 배포: AWS를 이용한 https 웹 페이지 배포

👷🏻‍♂️ 이호진

- 페이지 구현: 상세 피드, 회원가입, MBTI 선택, 팔로잉/팔로우, 유형 테스트, 가입 환영 팝업
- 기능 구현: 유형 테스트 외부 공유

👷🏼 김대연

- 페이지 구현: 에러, 로그인, 피드 목록, 마이 페이지(미로그인 시), 타인 프로필, 미믹 제안
- 컴포넌트 구현: 프로필 카드
- 기능 구현: 카카오 로그인 연동

### 🏗️ 기술 스택

- **React**
- **Redux / Toolkit, thunk**
- **Axios**
- **AWS (S3, CloudFront, IAM, Route 53, Certificate**
- FontAwesome
- styled-components
- swiper
- react-calendar

### 📂 파일 구조

- 파일 구조도 (긴 관계로 토글로 처리했습니다.)
  ```jsx
  src
  ├─ app
  │  ├─ modules
  │  │  ├─ accountsSlice.jsx
  │  │  ├─ detailSlice.jsx
  │  │  ├─ followSlice.jsx
  │  │  ├─ instance.jsx
  │  │  ├─ kakaoOauth.jsx
  │  │  ├─ kakaoSlice.jsx
  │  │  ├─ mainSlice.jsx
  │  │  ├─ mytodosSlice.jsx
  │  │  ├─ setUpTodoSlice.jsx
  │  │  └─ todolistsSlice.jsx
  │  └─ store.js
  ├─ App.css
  ├─ App.js
  ├─ App.test.js
  ├─ components
  │  ├─ common
  │  │  ├─ ChallengeCard.jsx
  │  │  ├─ footer.jsx
  │  │  ├─ Grade.jsx
  │  │  ├─ header.jsx
  │  │  ├─ InputCard.jsx
  │  │  └─ ProfileCard.jsx
  │  ├─ features
  │  │  ├─ activity
  │  │  │  └─ ActivityContainer.jsx
  │  │  ├─ changePW
  │  │  │  └─ ChangePWContainer.jsx
  │  │  ├─ error
  │  │  │  └─ ErrorPageContainer.jsx
  │  │  ├─ feed
  │  │  │  └─ FeedPageContainer.jsx
  │  │  ├─ feedDetail
  │  │  │  ├─ DetailCard.jsx
  │  │  │  └─ FeedDetailContainer.jsx
  │  │  ├─ follow
  │  │  │  └─ MyPageFollow.jsx
  │  │  ├─ helpdesk
  │  │  │  ├─ FQAAccordionCard.jsx
  │  │  │  ├─ HelpDeskContainer.jsx
  │  │  │  └─ NoticeAccordionCard.jsx
  │  │  ├─ login
  │  │  │  └─ LoginForm.jsx
  │  │  ├─ main
  │  │  │  ├─ MainContainer.jsx
  │  │  │  └─ WelcomeForm.jsx
  │  │  ├─ mbti
  │  │  │  └─ MbtiForm.jsx
  │  │  ├─ modifyProfile
  │  │  │  └─ ProfileModifyForm.jsx
  │  │  ├─ myPage
  │  │  │  ├─ LoginSelect.jsx
  │  │  │  └─ MyPageContainer.jsx
  │  │  ├─ ohterPage
  │  │  │  ├─ OthersCard.jsx
  │  │  │  └─ UserProfileContainer.jsx
  │  │  ├─ selectMBTIFeed
  │  │  │  └─ SelectMBTIFeedContainer.jsx
  │  │  ├─ setToDo
  │  │  │  ├─ SetToDoContainer.jsx
  │  │  │  └─ SetUpToDoCard.jsx
  │  │  ├─ signUp
  │  │  │  └─ SignUpForm.jsx
  │  │  ├─ test
  │  │  │  └─ TestForm.jsx
  │  │  ├─ todo
  │  │  │  └─ WriteTodoForm.jsx
  │  │  ├─ welcomePage
  │  │  │  └─ StartContainer.jsx
  │  │  └─ withdraw
  │  │     └─ WithdrawContainer.jsx
  │  └─ interface
  │     └─ styledCommon.jsx
  ├─ images
  │  ├─ background1.png
  │  ├─ background2.png
  │  └─ background3.png
  ├─ index.css
  ├─ index.js
  ├─ layout
  │  └─ layout.jsx
  ├─ logo.svg
  ├─ pages
  │  ├─ activity.jsx
  │  ├─ changePW.jsx
  │  ├─ errorPage.jsx
  │  ├─ feed.jsx
  │  ├─ feedDetail.jsx
  │  ├─ follow.jsx
  │  ├─ helpDesk.jsx
  │  ├─ login.jsx
  │  ├─ main.jsx
  │  ├─ mbti.jsx
  │  ├─ modifyProfile.jsx
  │  ├─ myPage.jsx
  │  ├─ othersPage.jsx
  │  ├─ selectMBTIFeed.jsx
  │  ├─ setUpTodo.jsx
  │  ├─ signUp.jsx
  │  ├─ teaser.jsx
  │  ├─ testPage.jsx
  │  ├─ welcomePage.jsx
  │  ├─ withdraw.jsx
  │  └─ writeTodo.jsx
  ├─ router
  │  └─ router.jsx
  ├─ setupTests.js
  └─ utils
     ├─ commonFunc.jsx
     ├─ cookie.jsx
     ├─ helpList.jsx
     ├─ loadingState.jsx
     ├─ reqList.jsx
     └─ token.jsx
  ```

❗ **폴더별 설명**

📂 **Pages**

- 사이트의 각 화면을 구성하고 있는 웹페이지들을 관리하는 폴더입니다.

📂 **Pages**

- 컴포넌트가 아니지만, 웹페이지 내에서 공용적으로 쓰일 수 있는 요소들을 관리하는 폴더입니다.

📂 Router

- 페이지 간의 경로(path)를 관리하기 위한 router 파일이 배치된 폴더입니다.

📂 Layout

- 페이지의 뼈대가 되는 layout 파일이 배치된 폴더입니다.

📂 images

- public 폴더에서 관리되기 어려운 이미지 파일들을 저장한 폴더입니다.

📂 components

- 각 페이지의 화면을 구성하는 컴포넌트들을 관리하기 위한 폴더입니다.
  - common: 화면에 공통적으로 쓰이는 기능적인 UI(헤더, 풋터 등) 컴포넌트들을 관리합니다.
  - featrues: 각 페이지별 화면에서만 쓰이게 되는 기능적인 컴포넌트들을 관리합니다.
    - 해당 컴포넌트들은 연관될 사항을 찾기 쉽도록 각 페이지의 이름을 딴 폴더에서 관리하도록 했습니다.
  - interface: 화면에 공통적으로 쓰이는 UI로서만 쓰이는 컴포넌트들을 관리합니다.

📂 app

- React 외의 핵심 라이브러리를 관리하는 폴더입니다.
  Redux와 관련한 사항들이 해당 폴더에서 관리되고 있습니다.
- store.js: Redux의 전역 상태 관리를 담당하는 store가 담겨 있습니다.
- modules: Redux에서 쓰이는 Slice들을 관리하기 위한 폴더입니다.
