import React, { useEffect } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import Router from "next/router";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowerList from "../components/FollowerList";
import FollowingList from "../components/FollowingList";
const profile = () => {
    const { me } = useSelector((state) => state.user);
    console.log(me);
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push("/");
        }
    }, [me && me.id]);
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
