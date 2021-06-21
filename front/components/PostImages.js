import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
const PostImages = ({ images }) => {
    const [showImageZoom, setShowImageZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImageZoom(true);
    }, []);

    if (images.length === 1) {
        return (
            <>
                <img
                    role="presentation"
                    src={images[0].src}
                    alt={images[0].src}
                    onClcik={onZoom}
                />
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline" }}
                    src={images[0].src}
                    alt={images[0].src}
                    onClcik={onZoom}
                />
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline" }}
                    src={images[1].src}
                    alt={images[1].src}
                    onClcik={onZoom}
                />
            </>
        );
    }
    return (
        <div>
            <img
                role="presentation"
                style={{ display: "inline", width: "50%" }}
                src={images[0].src}
                alt={images[0].src}
                onClcik={onZoom}
            />
            <div
                role="presentation"
                style={{
                    display: "inline-block",
                    width: "50%",
                    textAlign: "center",
                    verticalAlign: "middle",
                }}
                onClcik={onZoom}
            >
                <PlusOutlined />
                <br />
                {images.length - 1}
                개의 사진 더 보기
            </div>
        </div>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
