import React from "react";

function Button(props) {
    return (
        <button
            onKeyUp={props.onKeyUp}
            style={props.block.style}
            onDragStart={props.onDragStart}
            draggable
            data-id={props.block.id}
        >
            {props.block.text}
        </button>
    );
}
export default Button;
