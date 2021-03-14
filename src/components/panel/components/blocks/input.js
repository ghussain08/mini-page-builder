import React from "react";

function Input(props) {
    return (
        <input
            onKeyUp={props.onKeyUp}
            onDragStart={props.onDragStart}
            style={props.block.style}
            draggable
            data-id={props.block.id}
        />
    );
}
export default Input;
