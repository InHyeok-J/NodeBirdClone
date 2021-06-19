import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowerList from "../components/FollowerList";
import FollowingList from "../components/FollowingList";
const profile = () => {
    const followerList = [
        { nickname: "제로초" },
        { nickname: "바보" },
        { nickname: "노드버드 오피셜" },
    ];
    const followingList = [
        { nickname: "제로초" },
        { nickname: "바보" },
        { nickname: "노드버드 오피셜" },
    ];
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>내 프로필 | NodeBirdClone</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={followingList} />
                <FollowerList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    );
};

export default profile;
