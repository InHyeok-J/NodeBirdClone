import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
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
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

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
                if (hasMorePosts && !loadPostLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
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
export default Home;
