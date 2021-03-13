import React from "react";

function Button(props) {
    return (
        <button
            onDragStart={props.onDragStart}
            style={{ top: props.item.y, left: props.item.x }}
            draggable
            data-id={props.item.id}
        >
            Button
        </button>
    );
}
export default Button;
