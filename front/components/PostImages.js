import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";
const PostImages = ({ images }) => {
    const [showImageZoom, setShowImageZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImageZoom(true);
        console.log("test");
    }, []);
    const onClose = useCallback(() => {
        setShowImageZoom(false);
    }, []);

    if (images.length === 1) {
        return (
            <>
                <img
                    role="presentation"
                    src={`http://localhost:3065/${images[0].src}`}
                    alt={`http://localhost:3065/${images[0].src}`}
                    onClick={onZoom}
                />
                {showImageZoom && (
                    <ImagesZoom images={images} onClose={onClose} />
                )}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline" }}
                    src={`http://localhost:3065/${images[0].src}`}
                    alt={`http://localhost:3065/${images[0].src}`}
                    onClick={onZoom}
                />
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline" }}
                    src={`http://localhost:3065/${images[1].src}`}
                    alt={`http://localhost:3065/${images[1].src}`}
                    onClick={onZoom}
                />
                {showImageZoom && (
                    <ImagesZoom images={images} onClose={onClose} />
                )}
            </>
        );
    }
    return (
        <div>
            <img
                role="presentation"
                style={{ display: "inline", width: "50%" }}
                src={`http://localhost:3065/${images[0].src}`}
                alt={`http://localhost:3065/${images[0].src}`}
                onClick={onZoom}
            />
            <div
                role="presentation"
                style={{
                    display: "inline-block",
                    width: "50%",
                    textAlign: "center",
                    verticalAlign: "middle",
                }}
                onClick={onZoom}
            >
                <PlusOutlined />
                <br />
                {images.length - 1}
                개의 사진 더 보기
            </div>
            {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
        </div>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
