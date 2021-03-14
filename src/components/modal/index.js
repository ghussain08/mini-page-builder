import React from "react";
import ReactDOM from "react-dom";
function Modal(props) {
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__body">
                <header className="modal__body--header">
                    <h4>{props.title || "Modal title"}</h4>
                    <button>X</button>
                </header>
                {props.divider ? <hr /> : null}
            </div>
        </div>,
        document.getElementById("root")
    );
}

export default Modal;
