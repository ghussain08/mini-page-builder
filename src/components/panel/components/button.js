import React from "react";

function Button(props) {
    console.log(props);
    return (
        <button
            style={props.item.style}
            onDragStart={props.onDragStart}
            draggable
            data-id={props.item.id}
        >
            Button
        </button>
    );
}
export default Button;
