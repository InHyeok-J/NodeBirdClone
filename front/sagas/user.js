import { all, fork, put, delay, takeLatest, call } from "redux-saga/effects";
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_FAILURE,
    FOLLOW_SUCCESS,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
} from "../reducers/user";
import * as userApi from "../api/userApi";

// function loginAPI() {
//     return axios.post(`/api/login`);
// }

function* login(action) {
    try {
        const result = yield call(userApi.LoginApi, action.data);
        console.log(result);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}
function* logOut() {
    try {
        const result = yield call(userApi.LogOutApi);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}
function* signUp(action) {
    try {
        const result = yield call(userApi.SignUpApi, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function* follow(action) {
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* unFollow(action) {
    try {
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function* loadMyInfo(action) {
    try {
        const result = yield call(userApi.LoadMyInfoApi);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFllow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFllow),
        fork(watchUnFollow),
        fork(watchLoadMyInfo),
    ]);
}
