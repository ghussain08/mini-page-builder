import React from "react";

function BlockItem(props) {
    const { block } = props;
    function onDragStart(ev) {
        ev.dataTransfer.setData("data", JSON.stringify({ ...block }));
    }
    return (
        <div
            onDragStart={onDragStart}
            draggable="true"
            className="sidebar__item"
            key={block.type}
        >
            {block.name}
        </div>
    );
}

export default BlockItem;
