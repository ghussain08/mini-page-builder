import React from "react";

function Label(props) {
    return <label {...props}>{props.item.data.name}</label>;
}
export default Label;
