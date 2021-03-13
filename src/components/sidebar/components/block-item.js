import React from "react";
import { getMousePosition } from "../../../util";

function BlockItem(props) {
    const { block } = props;

    function onDragStart(e) {
        const { x, y } = getMousePosition(e);
        e.dataTransfer.setData(
            "data",
            JSON.stringify({ ...block, offsetX: x, offsetY: y })
        );
    }

    return (
        <div
            onDragStart={onDragStart}
            draggable="true"
            className="sidebar__item"
            key={block.type}
        >
            {block.text}
        </div>
    );
}

export default BlockItem;
