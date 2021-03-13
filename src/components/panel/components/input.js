import React from "react";

function Input(props) {
    return (
        <input
            onDragStart={props.onDragStart}
            style={{ top: props.item.y, left: props.item.x }}
            draggable
            data-id={props.item.id}
        />
    );
}
export default Input;
