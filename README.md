# 항해 99 8기 3조 실전 프로젝트 - MIMIC!

![ogimage.png](https://github.com/hanghae99-s8realweek-E3/frontend/blob/develop/public/images/ogimage.png?raw=true)
  
  
---

### 📖 프로젝트 소개

> 미믹(MIMIC)이란, ‘흉내쟁이’ 또는 ‘따라쟁이’라는 의미를 가진 단어입니다.
>
> 요즘 뜨는 MBTI에서 영감을 얻어서 나와 다른 성향을 가진 사람들의 일상을 살아보면 어떨까?
> 또, 나의 일상이 다른 사람들의 일상이 된다면 어떨까? 라는 취지로 제작된,
> 타인과 나의 일상을 체험해보도록 하는 조금 특이한 SNS입니다.

### 👥 프론트엔드 팀원 소개

👨🏻‍💻 [리더] 신도윤: [https://github.com/DrunkenNeoguri](https://github.com/DrunkenNeoguri)  
👨🏻‍💻 [프론트엔드 팀장] 이호진: [https://github.com/hojncode](https://github.com/hojncode)  
👨🏻‍💻 [기술 고문] 김대연: [https://github.com/rlaedous](https://github.com/rlaedous)  
  
  
### **🔧 담당 작업**

👷🏻‍♂️ 신도윤:  
👷🏻‍♂️ 이호진:  
👷🏼 김대연:  
  
  
### 💿 기술 스택

- **React**
- **Redux / Toolkit, thunk**
- **Axios**
- **AWS (S3, CloudFront, IAM, Route 53, Certificate**
- FontAwesome
- styled-components
- swiper
- react-calendar
  
  
### 📂 파일 구조

```
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
