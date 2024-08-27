### 기술 선택

- React 사용 필수<br/>
- CSS Framework 사용 : Bootstrap을 사용할려 하였으나 UI상 ANTD보다 만족스럽지 못하여 ANTD를 선택하였습니다.<br/>
- 전역상태관리로 선택사항중 context API / Redux가 있어 그 중 redux toolkit을 선택하였습니다.<br/>
- 기본적인 라우팅을 위해 React Router 사용하였습니다.<br/>

### 구현

- json-server와의 api 통신을 위하여 Proxy를 사용하였습니다.<br/>
- 메인 dashbaord, user, project단위의 네비게이션을 두고 라우팅 처리하였습니다.<br/>
- page폴더에 각각의 component들을 구현하였습니다.<br/>
- hook 폴더에는 공통적으로 사용되는 redux dispatchor, selector등을 구현했습니다.<br/>
- redux 폴더에는 각각의 action, reducer등을 구현했습니다.<br/>
- common 폴더에는 공통적으로 사용되는 함수들에 대하여 구현했습니다.<br/>

### MockData 설정

json-server 사용<br/>
실행 방법 : npm run start-json-server<br/>

### React 실행

실행 방법 : npm start
