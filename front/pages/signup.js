import React, { useCallback, useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const ErrorMessage = styled.div`
    color: red;
`;

const signup = () => {
    const [id, onChangeId] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");
    const [term, setTerm] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState("");

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password]
    );

    const onSumit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordCheck(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(id, nickname, password);
    }, [password, passwordCheck, term]);
    return (
        <AppLayout>
            <Head>
                <meta charSet="utf-8" />
                <title>회원가입 | NodeBirdClone</title>
            </Head>
            <Form onFinish={onSumit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input
                        name="user-id"
                        value={id}
                        required
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input
                        name="user-nickname"
                        value={nickname}
                        required
                        onChange={onChangeNickname}
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
                <div>
                    <label htmlFor="user-password">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password"
                        type="password"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && (
                        <ErrorMessage>
                            비밀번호가 일치하지 않습니다.
                        </ErrorMessage>
                    )}
                </div>
                <div>
                    <Checkbox
                        name="user-term"
                        checked={term}
                        onChange={onChangeTerm}
                    >
                        킹로초 말 잘듣겠습니다.
                    </Checkbox>
                    {termError && (
                        <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
                    )}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit">
                        가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default signup;
