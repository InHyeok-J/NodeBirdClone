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

### 이미지 업로드 시 Html input 태그가 아닌 버튼을 눌러서 하는 법

```javascript
const imageInput = useRef();

const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

...
<input type="file" multiple hidden ref={imageInput} />
<Button onClick={onClickImageUpload}>이미지 업로드</Button>
```

input 을 hidden으로 준 다음, ref을 통해 DOM에 접근, 버튼 클릭시 ref가 가리키는 돔을 click하게 한다.

---

### 정해져있는 클래스의 스타일 변경

slick 같은 외부 라이브러리에는 이미 클래스가 적용되어있다.  
이 slick의 스타일을 변경하기 위해서는 `style-component`의 `createGobalStyle`을 사용해서 스타일을 덮어씌운다.

```javascript
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    .slick-slide{
        display:inline-block;
    }
`; // 바꾸려고 하는 클래스명에 css를 넣어준다.

return (
    <>
        <Global />
        ...
    </>
); // 이후 아무곳에나 적용시키면 스타일 적용.
```

### 폴더 구조 적용

`styled-component`로 태그에 스타일을 많이 지정한 경우 파일의 코드 줄이 길어지고 가독성이 떨어짐.

```
/ImageZoom
    Index.js
    style.js
```

이렇게 폴더로 나눈 다음에 스타일드 컴포넌트로 작성한 부분을 style.js라는 파일에 저장한후 export 해서 Index에 가져와서 스타일과 Js부분을 분리시킨다.

### 해시태그 적용

게시글에 있는 문자열 중에서 해시태그를 추출해서 링크를 달아야 한다.  
`첫 번째 게시를 #해시태그 #익스프레스`이 문자열을 추출하기 위해 정규표현식 활용.
`/#[^\s#]+/g` 을 사용하면 해시태그를 추출 가능하다.

> /#[^\s#]+/g 을 사용하면 해시태그를 추출 가능하다.

/g → global flags, 전체를 다 탐색

[ ] → 문자 set, #[abc]라고 하면 #뒤에 abc문자열을 찾음.

^ → 부정 의미 #[^abc]라고 하면 #뒤에 abc 문자열이 아닌 문자열 찾음.

\s → 공백 문자 찾기 , #[^\s]라고 하면 #뒤에 공백문자가 아닌 것을 찾음

#[^\s#] → #뒤에 공백문자와 태그가 아닌 것을 찾음.

split에서는 해시태그 부분을 괄호로 감싸줘야지 포함이 된다.

`/(#[^\s#]+)/g `

```javascript
const PostCardContent = ({ postData }) => {
    // 첫 번째 게시를 #해시태그 #익스프레스
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, index) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return (
                        <Link href={`/hashtage/${v.slice(1)}`} key={index}>
                            <a>{v}</a>
                        </Link>
                    );
                }
                return v;
            })}
        </div>
    );
};
```

---

### Immer으로 불변성 관리

리액트에서는 불변성을 관리해줘야 한다. 이 불변성의 핵심은 바뀌는 것만 새로운 객체를 만들고 나머지 객체는
참조를 유지해줘야 하는데,  
댓글을 추가하는 리듀서에서

```javascript
case ADD_COMMENT_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(
                (v) => v.id === action.data.postId
            );
            const post = { ...state.mainPosts[postIndex] };
            post.Comments = [
                dummyComment(action.data.content),
                ...post.Comments,
            ];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            };
        }
```

1. action.data.postId와 같은 post를 찾아서 Index를 찾고.
2. 그 post를 얕은 복사를 한다음,
3. 그 post의 Comments에 불변성을 유지하면서 dummyComment를 추가한다음에 그거를 mainPost에 post에 넣는다.

→ 이걸 좀더 편하게 할 수 있는 라이브러리가 immer이다.

`npm i immer`

```javascript
import produce from "immer";

return produce(state, (draft) => {
    draft;
});
```

리듀서는 불변성을 지키면서 이전 상태를 액션을 통해 다음 상태로 만드는 것인데 `immer`을 사용하면  
draft라는 state를 불변성 상관없이 바꾼 후 immer가 불변성을 지켜준다.

```javascript
case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
                (v) => v.id === action.data.postId
         );
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addPostDone = true;
        break;
 }
```

위 코드 처럼 간소화가 가능하다.
