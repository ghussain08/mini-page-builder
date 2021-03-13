import React from "react";
import BLOCK_ITEMS from "./blocks";

function BlockItems() {
    return BLOCK_ITEMS.map((block) => (
        <div className="sidebar__item" key={block.type}>
            {block.name}
        </div>
    ));
}

export default BlockItems;
