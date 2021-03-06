import React from "react";

function Label(props) {
    return (
        <p
            tabIndex="0" // make p tag focusable
            onKeyUp={props.onKeyUp}
            onDragStart={props.onDragStart}
            style={props.block.style}
            draggable
            data-id={props.block.id}
        >
            {props.block.text}
        </p>
    );
}
export default Label;
