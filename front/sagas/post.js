import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import shortId from "shortid";
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function* addPost(action) {
    try {
        // const result = yield call(loginAPI);
        yield delay(1000);
        const id = shortId.generate();
        console.log("addPost");
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}
function* addComment(action) {
    try {
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

function* removePost(action) {
    try {
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    console.log("watch 포스트 추가");
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
    ]);
}
