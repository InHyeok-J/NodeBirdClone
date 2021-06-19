import React, { useCallback, useState } from "react";
import { Card, Popover, Button, Avatar } from "antd";
import PropTypes from "prop-types";
import {
    EllipsisOutlined,
    HeartOutlined,
    MessageOutlined,
    RetweetOutlined,
    HeartTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";

const PostCard = ({ post }) => {
    const [linked, setLinked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { me } = useSelector((state) => state.user);
    const onToggleLike = useCallback(() => {
        setLinked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const id = me && me.id;

    return (
        <div style={{ marginBottom: 20 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    linked ? (
                        <HeartTwoTone
                            key="heart"
                            twoToneColor="#eb2f96"
                            onClick={onToggleLike}
                        />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),

                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover
                        key="more"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger">삭제</Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </Button.Group>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && <div>댓글 부분</div>}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }),
};
export default PostCard;
