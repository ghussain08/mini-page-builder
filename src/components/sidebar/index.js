import React from "react";
import Blocks from "./components/block-items";

function Sidebar(props) {
    return (
        <section className="sidebar">
            <h1 className="sidebar__heading">BLOCKS</h1>
            <Blocks />
        </section>
    );
}
export default Sidebar;
