import React from "react";
import Block from "./components/block-item";
import BLOCK_ITEMS from "./blocks";

function Sidebar(props) {
    return (
        <section className="sidebar">
            <h1 className="sidebar__heading">BLOCKS</h1>
            {BLOCK_ITEMS.map((block) => (
                <Block block={block} key={block.type} />
            ))}
        </section>
    );
}
export default Sidebar;
