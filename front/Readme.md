## 정리하고싶은 내용들

### Next.js 기본

-   노드버드 강좌 시간에 배우는 Next.js
-   Next js의 가장 큰 특징은 서버사이드 렌더링(SSR, Sever Side Rendering) 이다.
-   전통적 방법(SSR) 서버 사이드 렌더링

```
브라우저 -> 프론트 서버 -> 백엔드 서버 -> 데이터베이스 -> 백엔드 서버 -> 프론트 서버 -> 브라우저
로딩 속도가 느리지만 검색엔진 최적화를 할 수 있다.
```

-   SPA 방법(CSR) 클라이언트 사이드 렌더링

```
로딩창을 먼저 보여주고 이후 백엔드 서버에서 데이터를 받아서 보여줌.
검색 엔진에서 순위가 떨어질 수 있다(js,html을 프론트 서버에서 브라우저에게 주고, 실제 data는 백엔드
 서버에서 따로 주기때문에 로딩창이 발생하며 검색 순위가 떨어진다)
```

-   Next.js의 라우팅  
    Next.js에서 pages라는 폴더를 인식을 해서 각 페이지를 라우팅을 할때에는 pages 폴더 안에 컴포넌트를 만들어주면 자동으로 라우팅이 된다.
-   Next.js에서 Link  
    기존 react에서는 페이지를 이동할 때 `react-router-dom` 의 `<Link>` 을 사용해서 SPA 방식으로 페이지를 이동했지만 next에서는 `<Link>` 를 `next/link`에서 가져와서 쓴다.

```javascript
<Link href="/">
<a>노드버드</a>
 </Link>
 <Link href="/profile">
       <a>프로필</a>
 </Link>
 <Link href="/signup">
       <a>회원가입</a>
 </Link>
```

---

### ESLint

ESLint는 ES + Lint이다. ES는 EcmaScript, 즉 자바스크립트를 의미하며 Lint는 보푸라기라는 뜻인데 프로그래밍 쪽에서는 에러가 있는 코드에 표시를 달아놓는것을 의미한다. 즉 ESLint는 자바스크립트 문법 중 에러가 있는 곳에 표시를 달아놓는 도구를 의미한다.  
ESLint는 사용자가 정의한대로 코드를 점검하고 에러를 표시해주는데 문법 뿐만 아니라 코딩 스타일도 지정할 수 있어서 협업할때 좋다. 하나의 코딩 스타일을 적용하고 ESLint에 설정해두면 한 사람이 코딩한 것 같은 결과를 얻을 수 있다.

-   설치

```
npm i eslint -D
npm i eslint-plugin-import -D
npm i eslint-plugin-react-hooks -D
npm i eslint-plugin-react -D
```

<br />

이후 `.eslintrc` 파일을 프로젝트 폴더 루트쪽에 추가  
<br />

```json
{
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": ["import", "react-hooks"]
}
```

> 추가 공부 내용 ✔️  
> parserOptions : 자바스크립트 버전, 모듈 사용 여부 설정  
> extends : 확장 설정  
> env : 프로젝트 사용 환경  
> plugins : 플러그인 적용

<br />

---

### \_app.js 로 공통 레이아웃 분리와 Head

`_app.js` 는 어플리케이션이 시작되는 초기 페이지라고 볼 수 있으며 라우팅을 통해 컴포넌트를 props로 전달받기 때문에 공통 레이아웃을 작성하여 모든 화면에 같은 레이아웃이 나올 수 있도록 작업할 수 있다.  
`/pages/_app.js` 파일을 생성한다

```javascript
import React from "react";
import PropTpyes from "prop-types";
import "antd/dist/antd.css";

const NodeBird = ({ Component }) => {
    return <Component />;
};

NodeBird.propTypes = {
    Component: PropTpyes.elementType.isRequired,
};
export default NodeBird;
```

위 예제에서는 `antd` 라이브러리의 css을 import해오는 것을 모든 컴포넌트에서 처리하면 중복되는 코드가 발생하기 떄문에 `_app.js`에서 import 해왔다.

-   Head
    next에서는 `<Head>`라는 컴포넌트를 제공하는데 react의 `Helmet`의 기능과 유사하다.

```javascript
import React from "react";
import PropTpyes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBirdClone</title>
            </Head>
            <Component />;
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTpyes.elementType.isRequired,
};
export default NodeBird;
```

Head 컴포넌트 안에 title 태그와 meta 태그를 설정해 줄 수 있다.  
<br />

---

### 리렌더링 관련 주의해야할 점.

javascript 에서의 Object 객체는 참조형 변수이기 때문에 주소값이 저장된다 즉 `{} === {} -> false`이다.  
하지만 리엑트에서는 매번 버츄얼 돔으로 검사를 하면서 이전 버전과 검사를 하는데 객체가 다르기 때문에 리런데링을 하는데 아래는 예시이다.

```javascript
<div style={{ marginTop: "10px" }}>
    <Button type="primary" htmlType="submit" loading={false}>
        로그인
    </Button>
    <Link href="/singup">
        <a>
            <Button>회원가입</Button>
        </a>
    </Link>
</div>
```

style이 div태그 안에 인라인 스타일 객체로 선언되어있고 이것이 리렌더링을하게 만들어 성능을 낮추는 요소중 하나이다(무조건적으로 성능이 낮아진다는 뜻은 아니다.)  
따라서 위 인라인 객체로 선언된 스타일을 styled components나 따로 css 설정을 해줘야 한다.

-   useMemo를 사용해 최적화 하는법

```javascript
const style = useMemo(() => ({ marginTop: 10 }), []);
```

useMemo -> 값을 저장하는데 useMemo를 사용해 리렌더링을 방지할 수 있다.

-   styled components로 설절한 스타일이 적용 안되는 문제.

styled components로 설절한 스타일이 적용 안되는 문제가 발생하는데 서버사이드 렌더링 설정을 안해줘서 생기는 문제이다.

---
