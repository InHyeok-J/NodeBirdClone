import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;
const LoginForm = () => {
    const [email, onChangeEmail] = useInput("");
    const { loginLoading, loginError } = useSelector((state) => state.user);
    const [password, onChangePassword] = useInput("");

    const dispatch = useDispatch();
    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    useEffect(() => {
        if (loginError) {
            alert(loginError);
        }
    }, [loginError]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">이메일</label>
                <br />
                <Input
                    name="user-id"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
            <ButtonWrapper style={{ marginTop: "10px" }}>
                <Button type="primary" htmlType="submit" loading={loginLoading}>
                    로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default LoginForm;
