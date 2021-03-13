import React from "react";

function Label(props) {
    return (
        <label
            tabIndex
            onDragStart={props.onDragStart}
            style={{ top: props.item.y, left: props.item.x }}
            draggable
            data-id={props.item.id}
        >
            {props.item.text}
        </label>
    );
}
export default Label;
