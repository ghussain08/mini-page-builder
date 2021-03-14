import React from "react";

function Input(props) {
    return (
        <input
            onDragStart={props.onDragStart}
            style={props.item.style}
            draggable
            data-id={props.item.id}
        />
    );
}
export default Input;
