import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
const PostCardContent = ({ postData }) => {
    // 첫 번째 게시를 #해시태그 #익스프레스
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, index) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return (
                        <Link href={`/hashtage/${v.slice(1)}`} key={index}>
                            <a>{v}</a>
                        </Link>
                    );
                }
                return v;
            })}
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};
export default PostCardContent;
