import React from "react";
import "./styles/bundle.sass";
import Panel from "./components/panel";
import Sidebar from "./components/sidebar";
function App() {
    return (
        <div className="container">
            <Panel />
            <Sidebar />
        </div>
    );
}

export default App;
