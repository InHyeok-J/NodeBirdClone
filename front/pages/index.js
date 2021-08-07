import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";
const Home = () => {
    const dispatch = useDispatch();

    const { me } = useSelector((state) => state.user);
    const {
        mainPosts,
        hasMorePosts,
        loadPostLoading,
        retweetError,
    } = useSelector((state) => state.post);
    console.log(mainPosts);

    useEffect(() => {
        if (retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                const lastId = mainPosts[mainPosts.length - 1]?.id;
                if (hasMorePosts && !loadPostLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePosts, loadPostLoading]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {me &&
                mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (context) => async (test, res) => {
        const cookie = test.req ? test.req.headers.cookie : "";
        axios.defaults.headers.Cookie = "";
        if (test.req && cookie) {
            axios.defaults.headers.Cookie = cookie;
        }
        console.log("컨텍스트", context);
        context.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
        context.dispatch({
            type: LOAD_POSTS_REQUEST,
        });
        context.dispatch(END);
        await context.sagaTask.toPromise();
    }
);
export default Home;
