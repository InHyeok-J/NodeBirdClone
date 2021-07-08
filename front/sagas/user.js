import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
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
} from "../reducers/user";
// function loginAPI() {
//     return axios.post(`/api/login`);
// }

function* login(action) {
    try {
        // const result = yield call(loginAPI);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}
function* logOut() {
    try {
        // const result = yield call(loginAPI);
        yield delay(1000);
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
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
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
export default function* userSaga() {
    yield all([fork(watchLogin), fork(watchLogOut)], fork(watchSignUp));
}
