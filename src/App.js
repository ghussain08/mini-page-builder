import React from "react";
import "./styles/bundle.sass";
import Panel from "./components/panel";
import Sidebar from "./components/sidebar";

/**
 * @author Gulam Hussain 14 March 2021
 * @description App UI entrypoint
 */
function App() {
    return (
        <div className="container">
            {/* Drop zone */}
            <Panel />
            {/* Drag Zone */}
            <Sidebar />
        </div>
    );
}

export default App;
