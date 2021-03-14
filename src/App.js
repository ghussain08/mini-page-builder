import React from "react";
import "./styles/bundle.sass";
import Panel from "./components/panel";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
function App() {
    return (
        <div className="container">
            {/* <Modal divider /> */}

            <Panel />
            <Sidebar />
        </div>
    );
}

export default App;
