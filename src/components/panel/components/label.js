import React from "react";

function Label(props) {
    console.log(props);
    return (
        <label
            onDragStart={props.onDragStart}
            style={props.item.style}
            draggable
            data-id={props.item.id}
        >
            {props.item.text}
        </label>
    );
}
export default Label;
