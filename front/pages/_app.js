import React from "react";
import PropTpyes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBirdClone</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTpyes.elementType.isRequired,
};
export default NodeBird;
