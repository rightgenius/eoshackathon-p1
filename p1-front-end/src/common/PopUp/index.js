import React from "react";
import ReactDOM from "react-dom";
import Container from './Container'

export const ModalCover = (content, callBack,style) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    ReactDOM.render(
        <Container
            style={style}
            onClose={() => {
                if (callBack) {
                    callBack()
                }
                div.parentNode.removeChild(div)
            }}
            content={content}/>, div)
};
