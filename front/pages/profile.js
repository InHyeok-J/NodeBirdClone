import React, { useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowerList from "../components/FollowerList";
import FollowingList from "../components/FollowingList";
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";
const profile = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push("/");
        }
    }, [me && me.id]);
    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        });
    }, []);
    if (!me) return null;

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | NodeBirdClone</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉" data={me.Followings} />
                <FollowerList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export default profile;
