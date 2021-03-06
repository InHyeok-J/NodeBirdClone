import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector(
        (state) => state.user
    );

    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onFollow = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);
    console.log("isFollowing", isFollowing);
    if (post.User.id === me.id) {
        return null;
    }
    return (
        <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
            {isFollowing ? "언팔로우" : "팔로우"}
        </Button>
    );
};

FollowButton.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }),
};
export default FollowButton;
